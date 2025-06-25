import AppSidebar from "@/components/app-sidebar";
import SiteHeader from "@/components/SiteHeader";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

const MainLayout = ({ children, title }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader title={title} />
        <main className="w-full p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
