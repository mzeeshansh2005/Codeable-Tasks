import { NextResponse } from "next/server"
import { mockRecentProjects, mockRecentIssues } from "@/lib/mockData"
import { Recents } from "@/types/recents"

const getRecents = async (idToken: string, type: string | null) => {
    let recents: Recents[] = [];
    if (type === "projects") {
        recents = mockRecentProjects
    } else if (type === "issues") {
        recents = mockRecentIssues
    } else {
        recents = [...mockRecentProjects, ...mockRecentIssues]
    }
    return recents
}

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type")
    const idToken = req.headers.get("Authorization")?.split(" ")[1]
    if (!idToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const recents = await getRecents(idToken, type)
    return NextResponse.json(recents)
}