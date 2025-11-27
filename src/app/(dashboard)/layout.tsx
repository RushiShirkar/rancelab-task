import SidebarLayout from "@components/Layout/SidebarLayout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return <SidebarLayout>{children}</SidebarLayout>
}

export default DashboardLayout;