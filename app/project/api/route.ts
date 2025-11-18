import { NextRequest, NextResponse } from "next/server";
import { mockProjects } from "@/lib/mockData";
import { Project } from "@/types/project";

const getProject = async (idToken: string, id: string): Promise<Project> => {
    const project = mockProjects.find(p => p.id === id);
    if (!project) {
        throw new Error("Project not found");
    }
    return project;
}

export const GET = async (req: NextRequest) => {
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get("id");
    if (!id || id === "null" || id === "undefined") {
        return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
    }
    const idToken = req.headers.get("Authorization")?.split(" ")[1]
    if (!idToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const project = await getProject(idToken, id)
        return NextResponse.json({ project })
    } catch (error) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
}