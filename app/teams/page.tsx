"use client"

import { useAuth } from "@/lib/auth/AuthProvider";
import { useEffect, useState } from "react";
import { Team as TeamType } from "@/types/team";
import { EmptyComponent } from "@/components/Empty";
import { Teams } from "@/components/Teams";
import { TeamsSkeleton } from "@/components/TeamCardSkeleton";

type AllTeams = {
    workingIn: TeamType[],
    myTeams: TeamType[]
}
export default function TeamsPage() {
    const { user } = useAuth()
    const [teams, setTeams] = useState<AllTeams>({workingIn: [], myTeams: []})
    const [loading, setLoading] = useState(true)
    
    const fetchTeams = async () => {
        if (!user) return
        
        setLoading(true)
        try {
            const idToken = await user.getIdToken()
            const response = await fetch("/teams/api", {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            })
            const data = await response.json()
            setTeams({workingIn: data.workingIn, myTeams: data.myTeams})
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchTeams()
    }, [user])
    
    const hasTeams = teams.workingIn?.length > 0 || teams.myTeams?.length > 0
    
    return (
        <div className="w-full h-full min-w-0 bg-background font-sans bg-gradient-to-t from-primary/10 to-white dark:from-primary/10 dark:to-background">
            <main className="w-full mx-auto flex flex-col items-start justify-start gap-y-8 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
                {loading ? (
                    <div className="w-full flex flex-col gap-y-8">
                        <TeamsSkeleton count={3} />
                        <TeamsSkeleton count={3} />
                    </div>
                ) : hasTeams ? (
                   <div className="w-full flex flex-col gap-y-8">
                       <Teams type="workingIn" teams={teams.workingIn}/>
                       <Teams type="myTeams" teams={teams.myTeams}/>
                   </div>
                ) : (
                    <div className="w-full overflow-hidden flex items-center justify-center">
                        <EmptyComponent type="team" />
                    </div>
                )}
            </main>
        </div>
    )
}
