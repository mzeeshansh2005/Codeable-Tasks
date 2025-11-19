"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthProvider"
import { AuthPageSpinner } from "./AuthPageSpinner"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, authOperationInProgress } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user && !authOperationInProgress) {
      router.push("/auth")
    }
  }, [user, loading, authOperationInProgress, router])

  if (loading || authOperationInProgress) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {authOperationInProgress ? <AuthPageSpinner /> : "Loading..."}
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

