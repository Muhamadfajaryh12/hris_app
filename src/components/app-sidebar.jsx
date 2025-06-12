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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  FaAngleDown,
  FaAngleLeft,
  FaBook,
  FaCalendar,
  FaDashcube,
  FaRegCalendar,
  FaUser,
} from "react-icons/fa6";
import Link from "next/link";

const AppSidebar = () => {
  const dataSidebar = {
    dashboard: {
      dashboard: [
        {
          link: "/",
          name: "Master Employee",
          icon: <FaDashcube />,
        },
      ],
    },
    management_system: {
      master_data: [
        {
          link: "/master/master_section",
          name: "Master Section",
          icon: <FaUser />,
        },
        {
          link: "/master/master_level",
          name: "Master Level",
          icon: <FaUser />,
        },
        {
          link: "/master/master_employee",
          name: "Master Employee",
          icon: <FaUser />,
        },
        {
          link: "/master/master_shift",
          name: "Master Shift",
          icon: <FaUser />,
        },
      ],
      attendence_and_time: [
        {
          link: "/attendence",
          name: "Attendence",
          icon: <FaRegCalendar />,
        },
        {
          link: "/overtime",
          name: "Overtime",
          icon: <FaRegCalendar />,
        },
        {
          link: "/request_leave",
          name: "Request Leave",
          icon: <FaRegCalendar />,
        },
      ],
      training_and_development: [
        {
          link: "/",
          name: "Master Training ",
          icon: <FaBook />,
        },
      ],
    },
  };

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        {Object.entries(dataSidebar).map(([primaryKey, primaryValue]) => (
          <Collapsible
            defaultOpen
            className="group/collapsible"
            key={primaryKey}
          >
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {primaryKey
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}{" "}
                  <FaAngleDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  {Object.entries(primaryValue).map(([secondaryKey, items]) => (
                    <Collapsible
                      className="group/collapsible"
                      key={secondaryKey}
                    >
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              {items[0].icon}
                              <span>
                                {secondaryKey
                                  .split("_")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" ")}
                              </span>
                              <FaAngleDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {items.map((item, index) => (
                                <SidebarMenuSubItem key={index}>
                                  <Link href={item.link}>
                                    <span>{item.name}</span>
                                  </Link>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </Collapsible>
                  ))}
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
