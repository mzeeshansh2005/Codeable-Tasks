import { FolderIcon, UsersIcon } from "lucide-react"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyComponent({ type }: { type: "project" | "team" }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {type === "project" ? <FolderIcon className="w-4 h-4" /> : <UsersIcon className="w-4 h-4" />}
        </EmptyMedia>
        <EmptyTitle>No {type === "project" ? "Projects" : "Teams"} Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any {type === "project" ? "projects" : "teams"} yet. Get started by creating
          your first {type === "project" ? "project" : "team"}.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create {type === "project" ? "Project" : "Team"}</Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  )
}
