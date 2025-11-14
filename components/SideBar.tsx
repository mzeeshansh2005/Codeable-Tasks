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
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
// Menu items.
const items = [
  {
    title: "For You",
    url: "/",
    icon: User,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Folder,
  },
  {
    title: "Teams",
    url: "/teams",
    icon: Users,
  },
  {
    title: "More",
    url: "/more",
    icon: MoreHorizontal,
  }
]

export function SideBar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  
  return (
    <Sidebar>
      <SidebarHeader className="border-b h-14 flex items-center">
        <div 
          className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${
            state === "collapsed" ? "opacity-0 scale-90" : "opacity-100 scale-100"
          }`}
        >
          <div className="flex items-center justify-center size-8 rounded-md bg-primary text-primary-foreground font-bold text-sm">
            CT
          </div>
          <span className="font-semibold text-lg">
            Codeable Tasks
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm sm:text-base font-medium text-muted-foreground dark:text-primary-foreground my-2">Quick Access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild isActive={item.url==pathname}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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