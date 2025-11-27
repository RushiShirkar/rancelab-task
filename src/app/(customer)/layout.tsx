import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Menu",
    description: "View our digital menu",
};

const CustomerLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-[480px] min-h-screen shadow-2xl">
                {children}
            </div>
        </div>
    )
}

export default CustomerLayout;