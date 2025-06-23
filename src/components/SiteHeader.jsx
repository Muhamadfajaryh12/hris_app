import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SiteHeader = ({ title }) => {
  const Logout = async () => {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("user_id");
    cookieStore.delete("token");
    redirect("/");
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {title}
        <div className="ml-auto flex items-center gap-2 p-2">
          <Button size="sm" variant="" onClick={Logout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
