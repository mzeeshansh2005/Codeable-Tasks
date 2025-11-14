import { NextResponse } from "next/server"
import { mockProjects } from "@/lib/mockData"
import { Project as ProjectType } from "@/types/project"

const getProjects = async (idToken: string): Promise<ProjectType[]> => {
    return mockProjects
}

export const GET = async (req: Request) => {
    const idToken = req.headers.get("Authorization")?.split(" ")[1]
    
    if (!idToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    try {
        const projects = await getProjects(idToken)
        return NextResponse.json({projects})
    } catch (error) {
        console.error("Error fetching projects:", error)
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        )
    }
}

