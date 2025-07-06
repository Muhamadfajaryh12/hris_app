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
import { TbMoneybag } from "react-icons/tb";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { IoMdTime } from "react-icons/io";
import { usePathname } from "next/navigation";
import { FaChartLine, FaRegFile } from "react-icons/fa6";

const AppSidebar = ({ section }) => {
  const path = usePathname();
  const pathName = path.split("/").filter((segment) => segment != "");
  const filterMenu = (items) => {
    if (section == 6) return items;
    return items.filter(
      (item) => !item.protected || item.protected == "public"
    );
  };
  const dataSidebar = {
    dashboard: [
      {
        link: "/admin/dashboard",
        name: "Dashboard",
        icon: <LuLayoutDashboard />,
        protected: "admin",
      },
      {
        link: "/admin/analytic",
        name: "Analytic",
        icon: <FaChartLine />,
        protected: "admin",
      },
    ],
    employeer: [
      {
        link: "/admin/master_employee",
        name: "Employee",
        icon: <LuUsers />,
        protected: "admin",
      },
      {
        link: "/admin/salary",
        name: "Salary",
        icon: <LuDollarSign />,
        protected: "admin",
      },
      {
        link: "/admin/payroll",
        name: "Payroll",
        icon: <TbMoneybag />,
        protected: "admin",
      },
      {
        link: "/admin/contract",
        name: "Contract",
        icon: <FaRegFile />,
        protected: "admin",
      },
    ],
    master_data: [
      {
        link: "/admin/master_section",
        name: "Master Section",
        icon: <GoDatabase />,
        protected: "admin",
      },
      {
        link: "/admin/master_level",
        name: "Master Level",
        icon: <GoDatabase />,
        protected: "admin",
      },
      {
        link: "/admin/master_position",
        name: "Master Position",
        icon: <GoDatabase />,
        protected: "admin",
      },
      {
        link: "/admin/master_shift",
        name: "Master Shift",
        icon: <GoDatabase />,
        protected: "admin",
      },
    ],
    attendence_and_time: [
      {
        link: "/attendence",
        name: "Attendence",
        icon: <IoMdTime />,
        protected: "public",
      },
      {
        link: "/overtime",
        name: "Overtime",
        icon: <IoMdTime />,
        protected: "public",
      },
      {
        link: "/request_leave",
        name: "Request Leave",
        icon: <IoMdTime />,
        protected: "public",
      },
    ],
    training_and_development: [
      {
        link: "/training",
        name: "Training ",
        icon: <FiBook />,
        protected: "public",
      },
    ],
    Schedule_and_Event: [
      {
        link: "/admin/schedule",
        name: "Schedule",
        icon: <AiOutlineSchedule />,
        protected: "admin",
      },
    ],
  };

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        {Object.entries(dataSidebar).map(([primary, items]) => {
          const filteredItems = filterMenu(items);
          if (filteredItems.length === 0) return null;
          return (
            <Collapsible
              defaultOpen
              className="group/collapsible"
              key={primary}
            >
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger>
                    {primary
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {filteredItems.map((item, index) => (
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
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
