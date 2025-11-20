import { User } from "./user";
import { Project } from "./project";

export interface Team {
  id: string;
  name: string;
  img?: string;
  description?: string;
  admin: string[];
  members: string[];
  projects?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type TeamMember = Pick<User, "id" | "name" | "email" | "avatar">;
export type TeamProject = Pick<Project, "id" | "title" | "img">;