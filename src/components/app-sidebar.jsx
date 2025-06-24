"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { LuDollarSign, LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { GoDatabase } from "react-icons/go";
import { FiBook } from "react-icons/fi";
import { AiOutlineSchedule } from "react-icons/ai";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { IoMdTime } from "react-icons/io";
import { usePathname } from "next/navigation";
import { FaChartLine } from "react-icons/fa6";

const AppSidebar = () => {
  const path = usePathname();
  const pathName = path.split("/").filter((segment) => segment != "");

  const dataSidebar = {
    dashboard: [
      {
        link: "/dashboard",
        name: "Dashboard",
        icon: <LuLayoutDashboard />,
      },
      {
        link: "/analytic",
        name: "Analytic",
        icon: <FaChartLine />,
      },
    ],
    employeer: [
      {
        link: "/employee",
        name: "Employee",
        icon: <LuUsers />,
      },
      {
        link: "/salary",
        name: "Salary",
        icon: <LuDollarSign />,
      },
      {
        link: "/payroll",
        name: "Payroll",
        icon: <LuDollarSign />,
      },
    ],
    master_data: [
      {
        link: "/master/master_section",
        name: "Master Section",
        icon: <GoDatabase />,
      },
      {
        link: "/master/master_level",
        name: "Master Level",
        icon: <GoDatabase />,
      },
      {
        link: "/master/master_position",
        name: "Master Position",
        icon: <GoDatabase />,
      },
      {
        link: "/master/master_shift",
        name: "Master Shift",
        icon: <GoDatabase />,
      },
    ],
    attendence_and_time: [
      {
        link: "/attendence",
        name: "Attendence",
        icon: <IoMdTime />,
      },
      {
        link: "/overtime",
        name: "Overtime",
        icon: <IoMdTime />,
      },
      {
        link: "/request_leave",
        name: "Request Leave",
        icon: <IoMdTime />,
      },
    ],
    training_and_development: [
      {
        link: "/training",
        name: "Training ",
        icon: <FiBook />,
      },
    ],
    Schedule_and_Event: [
      {
        link: "/schedule",
        name: "Schedule",
        icon: <AiOutlineSchedule />,
      },
    ],
  };

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        {Object.entries(dataSidebar).map(([primary, items]) => (
          <Collapsible defaultOpen className="group/collapsible" key={primary}>
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {primary
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton
                          asChild
                          isActive={
                            pathName.includes(item.link.replace("/", ""))
                              ? true
                              : false
                          }
                        >
                          <Link href={item.link}>
                            {item.icon}
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
