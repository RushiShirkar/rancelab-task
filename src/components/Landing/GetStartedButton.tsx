'use client';

import { useRouter } from "next/navigation";
import Button from "@components/UI/Button";

const GetStartedButton = () => {
    const router = useRouter();

    return (
        <Button
            variant="rounded"
            className="w-full sm:w-auto px-6 py-4 text-base"
            aria-label="Get started with digital menu management"
            onClick={() => router.push("/sign-up")}
        >
            Get Started
        </Button>
    );
};

export default GetStartedButton;
