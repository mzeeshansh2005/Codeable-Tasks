"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/LoginForm"
import { SignUpForm } from "@/components/SignUpForm"
import { useAuth } from "@/lib/auth/AuthProvider"
import { ModeToggle } from "@/components/ThemeToggle"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <ModeToggle />
        </div>
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return null
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-gray-50 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <ModeToggle />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-primary text-3xl font-bold tracking-tight">
            Codeable Tasks
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "Welcome back! Please log in to your account." : "Create a new account to get started."}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6 flex rounded-lg bg-gray-100 p-1 dark:bg-gray-700">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                isLogin
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-gray-100"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                !isLogin
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-gray-100"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  )
}

