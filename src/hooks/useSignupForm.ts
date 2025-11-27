import { useState, useMemo, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { isEmailValid } from "@/lib/utils";
import { signupAndSendOtp, verifyOtp, checkUserAndSendOtp } from "@/server/auth";
import { SignupField, SignupStep, FieldErrors } from "@/types";

export const useSignupForm = () => {
    const router = useRouter();
    const [step, setStep] = useState<SignupStep>("details");
    const [formValues, setFormValues] = useState<Record<SignupField, string>>({
        email: "",
        fullName: "",
        country: "",
    });
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [code, setCode] = useState("");
    const [isRequestingCode, setIsRequestingCode] = useState(false);
    const [isVerifyingCode, setIsVerifyingCode] = useState(false);
    const [isResendingCode, setIsResendingCode] = useState(false);

    const emailIsValid = useMemo(
        () => isEmailValid(formValues.email),
        [formValues.email]
    );
    const fullNameIsValid = useMemo(() => {
        const trimmed = formValues.fullName.trim();
        const nameParts = trimmed.split(/\s+/).filter(Boolean);
        return trimmed.length >= 3 && nameParts.length >= 2;
    }, [formValues.fullName]);
    const countryIsValid = Boolean(formValues.country);

    const handleFieldChange =
        (field: SignupField) =>
            (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                const { value } = event.target;
                setFormValues((prev) => ({ ...prev, [field]: value }));
                setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
            };

    const handleSelectChange = (field: SignupField) => (value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validateDetails = () => {
        const nextErrors: FieldErrors = {};
        if (!emailIsValid) {
            nextErrors.email = "Enter a valid email address.";
        }
        if (!fullNameIsValid) {
            nextErrors.fullName =
                formValues.fullName.trim().length === 0
                    ? "Enter your full name."
                    : "Include both first and last name.";
        }
        if (!countryIsValid) {
            nextErrors.country = "Select a country.";
        }
        return nextErrors;
    };

    const handleDetailsSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = validateDetails();
        setFieldErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsRequestingCode(true);
        try {
            const result = await signupAndSendOtp(
                formValues.email,
                formValues.fullName,
                formValues.country
            );

            if (result.success) {
                setStep("verification");
            } else {
                setFieldErrors((prev) => ({ ...prev, email: result.message }));
            }
        } catch (error) {
            setFieldErrors((prev) => ({
                ...prev,
                email: "An unexpected error occurred.",
            }));
        } finally {
            setIsRequestingCode(false);
        }
    };

    const handleVerificationSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (code.length !== 6) {
            return;
        }
        setIsVerifyingCode(true);
        try {
            const result = await verifyOtp(formValues.email, code);
            if (result.success) {
                router.push("/dashboard");
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setIsVerifyingCode(false);
        }
    };

    const handleResendCode = async () => {
        setIsResendingCode(true);
        try {
            await checkUserAndSendOtp(formValues.email);
        } finally {
            setIsResendingCode(false);
        }
    };

    const handleEditDetails = () => {
        setStep("details");
        setCode("");
    };

    return {
        step,
        formValues,
        fieldErrors,
        code,
        setCode,
        isRequestingCode,
        isVerifyingCode,
        isResendingCode,
        handleFieldChange,
        handleSelectChange,
        handleDetailsSubmit,
        handleVerificationSubmit,
        handleResendCode,
        handleEditDetails,
    };
};
