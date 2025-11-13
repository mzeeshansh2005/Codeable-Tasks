"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/Header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SideBar } from "@/components/SideBar"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/auth"

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SideBar />
        <div className="flex flex-1 flex-col w-full">
          <Header />
          <SidebarInset className="flex-1">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}

