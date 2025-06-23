import RequestLeaveComponent from "@/components/request_leave/RequestLeaveComponent";
import AnnualLeaveAPI from "@/data/AnnualLeaveAPI";
import MainLayout from "@/layouts/MainLayout";
import { cookies } from "next/headers";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
const page = async () => {
  const storeCookies = await cookies();
  const userId = storeCookies.get("user_id")?.value;
  const data = await AnnualLeaveAPI.GetAnnualLeave({ id: userId });
  return (
    <MainLayout
      title={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Request Leave</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <RequestLeaveComponent data={data} />
    </MainLayout>
  );
};

export default page;
