import { ChangeEvent, FormEvent } from "react";
import { Input } from "@components/UI/Input";
import { Button } from "@components/UI/Button";
import LoadingSpinner from "@components/UI/LoadingSpinner";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@components/UI/Select";
import { COUNTRIES } from "@/content";
import { SignupField, FieldErrors } from "@/types";

type SignupDetailsFormProps = {
    formValues: Record<SignupField, string>;
    fieldErrors: FieldErrors;
    onFieldChange: (
        field: SignupField
    ) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSelectChange: (field: SignupField) => (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
};

const SignupDetailsForm = ({
    formValues,
    fieldErrors,
    onFieldChange,
    onSelectChange,
    onSubmit,
    isLoading,
}: SignupDetailsFormProps) => {
    return (
        <article className="flex flex-col gap-5 bg-white p-5">
            <form onSubmit={onSubmit} className="space-y-4">
                <Input
                    id="signup-email"
                    type="email"
                    label="Work email"
                    placeholder="Enter your email address"
                    autoComplete="email"
                    value={formValues.email}
                    onChange={onFieldChange("email")}
                    error={fieldErrors.email}
                    aria-required
                    aria-label="Email address"
                />
                <Input
                    id="signup-full-name"
                    type="text"
                    label="Full name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    value={formValues.fullName}
                    onChange={onFieldChange("fullName")}
                    error={fieldErrors.fullName}
                    aria-required
                    aria-label="Full name"
                />

                <Select
                    label="Country"
                    value={formValues.country}
                    onValueChange={onSelectChange("country")}
                    error={fieldErrors.country}
                    aria-required
                    aria-label="Country"
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Country</SelectLabel>
                            {COUNTRIES.map((country) => (
                                <SelectItem key={country} value={country}>
                                    {country}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button
                    type="submit"
                    className="w-full rounded-full px-6 py-3 mt-4 text-base md:px-8"
                    disabled={isLoading}
                >
                    {isLoading && <LoadingSpinner className="mr-2" />}
                    {isLoading ? "Sending code..." : "Send verification code"}
                </Button>
            </form>
        </article>
    );
};

export default SignupDetailsForm;
