import { Recents } from "@/types/recents";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { FolderIcon, KanbanIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function RecentsCarousel({ recents }: { recents: Recents[] }) {
    if (!recents) return null;
    return (
        <Carousel className="w-full max-w-full" opts={{ loop: true, align: "start" }} plugins={[
            Autoplay({
                delay: 6000,
                stopOnInteraction: true,
            }),
        ]}>
            <CarouselContent className="-ml-2 md:-ml-4">
                {recents.map((recent) => {
                    const href = recent.type === "project" ? `/project/${recent.resourceId}` : `/issue/${recent.resourceId}`;
                    return (
                        <CarouselItem key={recent.resourceId} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer select-none">
                            <Link href={href} className="h-full block">
                                <Card className="w-full h-full px-0 py-4 select-none hover:shadow-md transition-shadow">
                                    <CardHeader className="flex flex-row items-center gap-2">
                                        <CardTitle className="md:text-lg font-semibold line-clamp-1">{recent.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-row items-center justify-between gap-2">
                                        <div className="flex items-center gap-1">
                                            {recent.type === "project" ? <FolderIcon className="w-4 h-4 text-muted-foreground" /> : <KanbanIcon className="w-4 h-4 text-muted-foreground" />}
                                            <p className="text-sm text-primary capitalize font-semibold">{recent.type}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <p className="text-xs text-muted-foreground">
                                                {recent.lastAccessed ? formatDistanceToNow(new Date(recent.lastAccessed), { addSuffix: true }) : 'N/A'}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
        </Carousel>
    );
}