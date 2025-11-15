import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export function ProjectCardSkeleton() {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-start gap-2 px-2 py-0">
                <Skeleton className="w-10 h-10 rounded" />
                <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="px-2 sm:px-4 py-0 line-clamp-2 flex-1">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter className="px-2 sm:px-4 py-0 mt-auto">
                <Skeleton className="h-9 w-32 ml-auto" />
            </CardFooter>
        </Card>
    )
}

export function ProjectsSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="w-full max-w-full overflow-hidden">
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: count }).map((_, i) => (
                    <ProjectCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}

