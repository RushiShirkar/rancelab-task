import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
    className?: string;
};

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => (
    <span
        aria-hidden="true"
        className={cn(
            "inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent",
            className
        )}
    />
);

export default LoadingSpinner;