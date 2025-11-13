import { User, Folder, Users, MoreHorizontal } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "For You",
    url: "#",
    icon: User,
  },
  {
    title: "Projects",
    url: "#",
    icon: Folder,
  },
  {
    title: "Teams",
    url: "#",
    icon: Users,
  },
  {
    title: "More",
    url: "#",
    icon: MoreHorizontal,
  }
]

export function SideBar() {
  return (
    <Sidebar>
      <SidebarContent className="pt-14">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm sm:text-base font-medium text-muted-foreground dark:text-primary-foreground my-2">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}