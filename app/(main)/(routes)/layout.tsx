import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import React from "react";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[72px] flex-col inset-y-0 z-30 fixed">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[72px] h-full">{children}</main>
        </div>
    );
};

export default MainLayout;
