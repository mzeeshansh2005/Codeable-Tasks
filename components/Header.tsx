"use client"

import { useRouter } from "next/navigation"
import { LogOut, UserCircle, Moon, Sun, Monitor } from "lucide-react"
import { useAuth } from "@/lib/auth/AuthProvider"
import { useTheme } from "next-themes"
import { logout } from "@/lib/firebase/logout"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const auth = useAuth()
  const user = auth?.user
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/auth")
    } catch (error) {
      console.error("Failed to logout:", error)
    }
  }

  const getInitials = (email: string | null | undefined) => {
    if (!email) return "U"
    const parts = email.split("@")[0]
    return parts.charAt(0).toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        {/* Sidebar Toggle */}
        <SidebarTrigger className="cursor-pointer"/>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-md bg-primary text-primary-foreground font-bold text-sm">
            CT
          </div>
          <span className="font-semibold text-lg hidden sm:inline-block">
            Codeable Tasks
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer"
            >
              <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {getInitials(user?.email || undefined)}
              </div>
              <span className="sr-only">Account menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <UserCircle className="mr-2 size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value)}>
              <DropdownMenuRadioItem value="light">
                <Sun className="mr-2 size-4" />
                <span>Light</span>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">
                <Moon className="mr-2 size-4" />
                <span>Dark</span>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system">
                <Monitor className="mr-2 size-4" />
                <span>System</span>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} variant="destructive">
              <LogOut className="mr-2 size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

