import { NextResponse } from "next/server"
import { mockRecentProjects, mockRecentIssues } from "@/lib/mockData"
import { Recents } from "@/types/recents"

const getRecents = async (idToken: string) => {
    const recents: Recents[] = [...mockRecentProjects, ...mockRecentIssues]
    return recents
}

export const GET = async (req: Request) => {
    const idToken = req.headers.get("Authorization")?.split(" ")[1]
    if (!idToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const recents = await getRecents(idToken)
    return NextResponse.json(recents)
}