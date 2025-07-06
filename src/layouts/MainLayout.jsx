import AppSidebar from "@/components/app-sidebar";
import SiteHeader from "@/components/SiteHeader";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import React from "react";

const MainLayout = async ({ children, title }) => {
  const cookieStore = await cookies();
  const section = cookieStore.get("section_id")?.value;

  return (
    <SidebarProvider>
      <AppSidebar section={section} />
      <SidebarInset>
        <SiteHeader title={title} />
        <main className="w-full p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
