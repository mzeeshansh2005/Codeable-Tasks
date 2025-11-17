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
import { useAuth } from "@/lib/auth/AuthProvider"
import { useEffect, useState } from "react"
import { Recents } from "@/types/recents"
import Image from "next/image"
import { motion } from "framer-motion"
// Menu items.
const items = [
  {
    title: "For You",
    url: "/",
    icon: User,
  },
  {
    title: "Teams",
    url: "/teams",
    icon: Users,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Folder,
  },
]

export function SideBar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const { user } = useAuth()
  const [recentProjects, setRecentProjects] = useState<Recents[]>([])
  const fetchRecentProjects = async (): Promise<Recents[]> => {
    try {
      if (!user) {
        return [];
      }
      const idToken = await user.getIdToken();

      const response = await fetch("/api/recents?type=projects", {
        headers: {
          "Authorization": `Bearer ${idToken}`
        },
        method: "GET"
      })
      const data = await response.json()
      console.log(data)
      if (Array.isArray(data)) {
        return data;
      } else {
        console.error("Invalid data received:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching recents:", error);
      return [];
    }
  }

  useEffect(() => {
    fetchRecentProjects().then((data) => setRecentProjects(data))
  }, [user])
  return (
    <Sidebar>
      <SidebarHeader className="border-b h-14 flex items-center">
        <div
          className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${state === "collapsed" ? "opacity-0 scale-90" : "opacity-100 scale-100"
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
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <SidebarMenu className="gap-2">
                {/* Quick Access */}
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} >
                    <SidebarMenuButton asChild isActive={item.url == pathname}>
                      <Link href={item.url}>
                        <item.icon />
                        <span className="truncate text-xs sm:text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {/* Recents */}
                {recentProjects && recentProjects.length > 0 &&
                  recentProjects.map((project,i) => (
                    <motion.div key={project.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 * i }}>
                    <SidebarMenuButton asChild key={project.id} isActive={`/project/${project.id}` == pathname}>
                      <Link href={`/project/${project.id}`} key={project.id} className="flex items-center gap-2">
                        <Image src={project.icon} alt={project.title} width={24} height={24} />
                        <span className="truncate text-xs sm:text-sm">{project.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    </motion.div>
                  ))}
                {/* More */}
                <SidebarMenuButton asChild>
                  <Link href="/more">
                    <MoreHorizontal />
                    <span>More</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenu>
            </motion.div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}