import DashboardSidebar from "@/components/layout/partials/dashboard/Sidebar";
import DashboardTopBar from "@/components/layout/partials/dashboard/TopBar";
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <DashboardSidebar />
            <div className="relative flex h-full grow flex-col overflow-y-auto bg-white">
                <DashboardTopBar />
                {children}
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}