"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/auth/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import z from "zod";

const projectSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  img: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  members: z.string().min(1, "At least one member is required"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function CreateProjectPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      img: "",
      members: "",
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // TODO: Implement API call to create project
      console.log("Creating project with data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      form.reset();

      // Redirect to projects page after success
      setTimeout(() => {
        router.push("/projects");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full min-w-0 bg-background font-sans bg-linear-to-t from-primary/10 to-white dark:from-primary/10 dark:to-background">
      <main className="w-full mx-auto flex flex-col items-start justify-start gap-y-8 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto max-w-2xl">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Create New Project
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Start a new project and collaborate with your team
              </p>
            </div>

            {/* Form Card */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Fill in the information below to create your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Title Field */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title *</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter project title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description Field */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project..."
                              className="min-h-[120px] resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide a clear description of your project goals
                            and objectives
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Members Field */}
                    <FormField
                      control={form.control}
                      name="members"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Members *</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter member emails (comma-separated)"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter email addresses separated by commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Image URL Field */}
                    <FormField
                      control={form.control}
                      name="img"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Image URL</FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="https://example.com/image.jpg"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Optional: Add a cover image for your project
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Error Message */}
                    {error && (
                      <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4">
                        <p className="text-sm font-medium text-destructive">
                          {error}
                        </p>
                      </div>
                    )}

                    {/* Success Message */}
                    {success && (
                      <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">
                          Project created successfully! Redirecting...
                        </p>
                      </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => router.push("/projects")}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="w-full sm:w-auto sm:ml-auto"
                        disabled={loading}
                      >
                        {loading ? "Creating..." : "Create Project"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
