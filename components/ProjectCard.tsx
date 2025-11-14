import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Project as ProjectType } from "@/types/project";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
    project: ProjectType
    i: number
}

export default function ProjectCard({ project, i }: ProjectCardProps) {
    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 * i }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 * i }}
        >
            <Card className="h-full flex flex-col">
                <CardHeader className="flex flex-row items-start gap-2 px-2 py-0">
                    <Image src={project.img} alt={project.title} width={100} height={100} className="w-10 h-10 object-cover" />
                    <CardTitle className="text-lg font-medium p-0">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-2 sm:px-4 py-0 line-clamp-2 flex-1">
                    <p className="text-sm text-gray-500">{project.description}</p>
                </CardContent>
                <CardFooter className="px-2 sm:px-4 py-0 mt-auto">
                    <Link className="w-fit ml-auto" href={`/project/${project.id}`}>
                        <Button variant="outline" className="cursor-pointer"><ArrowRightIcon className="w-4 h-4" /> View Project</Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
}