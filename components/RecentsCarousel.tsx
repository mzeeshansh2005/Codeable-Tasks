import { Recents } from "@/types/recents";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import  Autoplay  from "embla-carousel-autoplay"; 
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { CalendarIcon, FolderIcon, KanbanIcon} from "lucide-react";

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
                {recents.map((recent) => (
                    <CarouselItem key={recent.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer select-none"> 
                        <div className="h-full">
                            <Card className="w-full h-full px-0 py-4 select-none">
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <Image src={"https://images.squarespace-cdn.com/content/v1/5e10bdc20efb8f0d169f85f9/09943d85-b8c7-4d64-af31-1a27d1b76698/arrow.png"} alt={recent.title} width={24} height={24} />
                                    <CardTitle className="md:text-lg font-medium font-semibold line-clamp-1">{recent.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-row items-center justify-between gap-2">
                                    <div className="flex items-center gap-1">
                                        {recent.type === "project" ? <FolderIcon className="w-4 h-4 text-muted-foreground" /> : <KanbanIcon className="w-4 h-4 text-muted-foreground" />}
                                        <p className="text-sm text-primary font-medium capitalize font-semibold">{recent.type}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                            {recent.lastAccessed ? new Date(recent.lastAccessed).toLocaleString() : 'N/A'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}