"use client"

import { useAuth } from "@/lib/auth/AuthProvider";
import { useEffect, useState } from "react";
import { Project as ProjectType } from "@/types/project";
import { EmptyComponent } from "@/components/Empty";
import { Projects } from "@/components/Projects";
import { ProjectsSkeleton } from "@/components/ProjectCardSkeleton";
import { apiGet } from "@/lib/api/apiClient";

export default function ProjectsPage() {
    const { user } = useAuth()
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [loading, setLoading] = useState(true)
    
    const fetchProjects = async () => {
        if (!user) return
        
        setLoading(true)
        try {
            const idToken = await user.getIdToken()
            const response = await apiGet(`/projects/api?uid=${user.uid}`, idToken)
            const data = await response.json()
            setProjects(data.projects)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchProjects()
    }, [user])
    
    return (
        <div className="w-full h-full min-w-0 bg-background font-sans bg-linear-to-t from-primary/10 to-white dark:from-primary/10 dark:to-background">
            <main className="w-full mx-auto flex flex-col items-start justify-start gap-y-8 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
                {loading ? (
                    <ProjectsSkeleton count={5} />
                ) : projects && projects.length > 0 ? (
                   <Projects projects={projects}/>
                ) : (
                    <div className="w-full overflow-hidden flex items-center justify-center">
                        <EmptyComponent type="project" />
                    </div>
                )}
            </main>
        </div>
    )
}
