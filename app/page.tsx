"use client"

import { GreetUser } from "@/components/GreetUser";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/AuthProvider";

export default function Home() {
  const user = useAuth()
  if (!user) {
    return <div>Loading...</div>
  }
  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen bg-background font-sans">
        <main className="w-full flex min-h-screen flex-col items-center justify-start py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
          <GreetUser />
        </main>
      </div>
    </ProtectedRoute>
  )
}
