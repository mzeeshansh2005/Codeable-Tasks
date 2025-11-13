"use client"

import { ProtectedRoute } from "@/components/ProtectedRoute"
import { useAuth } from "@/lib/auth/AuthProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function ProfilePage() {
  const auth = useAuth()
  const user = auth?.user
  const router = useRouter()

  if (!user) {
    return (
      <ProtectedRoute>
        <div>Loading...</div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <div className="container mx-auto py-8 px-4 max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Your account information and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <p className="text-sm font-medium">{user.email || "Not available"}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  User ID
                </label>
                <p className="text-sm font-mono text-xs break-all">{user.uid}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Email Verified
                </label>
                <p className="text-sm">
                  {user.emailVerified ? (
                    <span className="text-green-600 dark:text-green-400">Verified</span>
                  ) : (
                    <span className="text-yellow-600 dark:text-yellow-400">Not verified</span>
                  )}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Account Created
                </label>
                <p className="text-sm">
                  {user.metadata.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Not available"}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Last Sign In
                </label>
                <p className="text-sm">
                  {user.metadata.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Not available"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}

