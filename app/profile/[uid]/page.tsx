"use client";

import { useAuth } from "@/lib/auth/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Mail,
  EditIcon,
  Loader2,
  User as UserIcon,
  Pencil,
  Dot,
} from "lucide-react";
import { useEffect, use, useState, useRef } from "react";
import { User as UserType } from "@/types/user";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfileCard from "@/components/ProfileCard";

// Default avatar image path
const DEFAULT_AVATAR = "/user.jpg";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { user } = useAuth();
  const { uid } = use(params);
  const router = useRouter();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const idToken = await user?.getIdToken();
      const response = await fetch(`/api/user?uid=${uid}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        method: "GET",
        next: {
          revalidate: 60,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error);
      }
      setUserData(data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [uid]);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        bio: userData.bio || "",
        avatar: userData.avatar || "",
      });
    }
  }, [userData]);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("Image size should be less than 10MB");
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, avatar: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setIsSaving(true);
      const idToken = await user?.getIdToken();
      const response = await fetch(`/api/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio,
          avatar: formData.avatar,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      if (data.success) {
        setUserData(data.data);
        setIsSheetOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | undefined, includeTime = false) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="h-full w-full bg-linear-to-b from-background to-muted/20 grid grid-cols-1 md:grid-cols-2">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 hover:bg-muted/50 cursor-pointer"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back
        </Button>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {userData && (
            <Card className="mb-6 border-2 shadow-lg pt-1">
              <CardContent className="">
                <div className="flex items-center justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleOpenSheet}
                    className="rounded-full cursor-pointer shrink-0 hover:bg-muted/50 hover:text-primary"
                  >
                    <EditIcon className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <div className="h-24 w-24 rounded-full bg-linear-to-br from-primary/80 to-primary flex items-center justify-center text-4xl font-bold text-primary-foreground shadow-xl ring-4 ring-background overflow-hidden">
                      <Image
                        src={userData?.avatar || DEFAULT_AVATAR}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                      {userData.name || "User"}
                    </h1>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-3">
                      <Mail className="h-4 w-4" />
                      <p className="text-base">{userData.email || "No email"}</p>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start text-green-400 dark:text-green-600">
                      <Dot className="h-8 w-8" />
                      <p className="text-xs font-semibold">
                        {formatDistanceToNow(
                          new Date(userData?.updatedAt as string)
                        )} ago
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-end">
                  <p className="text-sm font-medium text-muted-foreground">
                    Joined {formatDate(userData?.createdAt, true)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            {userData?.bio || "No bio"}
          </p>
        </motion.div>
      </div>
      <div className="container mx-auto w-full flex items-center justify-center">
        <ProfileCard
          name={userData?.name || ""}
          title={userData?.bio || ""}
          avatarUrl={DEFAULT_AVATAR}
          showUserInfo={false}
          enableTilt={true}
          enableMobileTilt={false}
        />
      </div>

      {/* Edit Profile Side Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto p-2 sm:p-4">
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Update your profile information. Changes will be saved to your
              account.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-6 py-6">
            {/* Avatar Preview */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div
                  onClick={handleAvatarClick}
                  className="h-32 w-32 rounded-full bg-linear-to-br from-primary/80 to-primary flex items-center justify-center text-4xl font-bold text-primary-foreground shadow-xl ring-4 ring-background cursor-pointer transition-all hover:ring-primary/50 overflow-hidden"
                >
                  <Image
                    src={formData.avatar || DEFAULT_AVATAR}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                {/* Pencil Icon Overlay */}
                <div
                  onClick={handleAvatarClick}
                  className="absolute bottom-1 right-1 h-10 w-10 rounded-full bg-primary flex items-center justify-center cursor-pointer shadow-lg hover:bg-primary/90 transition-colors"
                >
                  <Pencil className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Click to upload a new avatar
              </p>
              {/* Hidden File Input */}
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Bio Field */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>
          </div>

          <SheetFooter>
            <Button
              variant="outline"
              onClick={() => setIsSheetOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateProfile} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
