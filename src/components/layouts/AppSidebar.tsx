"use client";

import * as React from "react";
import { Users, FileText } from "lucide-react";

import { NavMain } from "@/components/layouts/nav-main";
import { NavUser } from "@/components/layouts/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Usuarios",
      url: "/usuarios",
      icon: Users,
      isActive: false,
    },
    {
      title: "Reportes",
      url: "/reportes",
      icon: FileText,
      isActive: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex h-8 items-center justify-center">
                <img
                  src="./images/logo-emcali.webp"
                  alt="EMCALI Logo"
                  className="h-auto w-38 dark:hidden"
                />
                <img
                  src="./images/logo-emcali-clear.webp"
                  alt="EMCALI Logo"
                  className="hidden h-auto w-42 dark:block"
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
