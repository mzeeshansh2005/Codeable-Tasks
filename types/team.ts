import { User } from "./user";
import { Project } from "./project";

export interface Team {
  id: string;
  name: string;
  members: (TeamMember )[];
  projects?: (TeamProject )[];
  description: string;
  createdBy: Pick<User, "id" > & Partial<User>;
    createdAt: Date;
    updatedAt: Date;
}

export type TeamMember = Pick<User, "id" | "name" | "email" | "pic">;
export type TeamProject = Pick<Project, "id" | "title" | "img">;