import { NextResponse } from "next/server"
import {  mockTeams } from "@/lib/mockData"
import type { Team as TeamType } from "@/types/team"

const getTeams = async (idToken: string): Promise<{workingIn: TeamType[], myTeams: TeamType[]}> => {
    return {
        workingIn: mockTeams,
        myTeams: mockTeams
    }
}

export const GET = async (req: Request) => {
    const idToken = req.headers.get("Authorization")?.split(" ")[1]
    
    if (!idToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    try {
        const teams = await getTeams(idToken)
        return NextResponse.json(teams)
    } catch (error) {
        console.error("Error fetching projects:", error)
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        )
    }
}

