import { NextRequest, NextResponse } from "next/server"
import { mockRecentProjects, mockRecentIssues } from "@/lib/mockData"
import { Recents } from "@/types/recents"

const getRecents = async (idToken: string, type: string | null) => {
    // let recents: Recents[] = [];
    // if (type === "projects") {
    //     recents = mockRecentProjects
    // } else if (type === "issues") {
    //     recents = mockRecentIssues
    // } else {
    //     recents = [...mockRecentProjects, ...mockRecentIssues]
    // }
    // return recents
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/for-you/get-recents/${type ? type : "all"}`;
    const response = await fetch(backendUrl, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`
        },
        method: "GET"
    })
    if (!response.ok) {
        return NextResponse.json({ error: "Failed to fetch recents" }, { status: response.status })
    }
    const data = await response.json()
    return data
}

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type")
    const idToken = req.headers.get("Authorization")?.split(" ")[1]
    if (!idToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const recents = await getRecents(idToken, type)
    return NextResponse.json(recents)
}