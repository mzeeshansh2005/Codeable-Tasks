import { Issue } from "./issue";

export interface Project {
  id: string;
  title: string;
  img: string;
  description: string;
  members?: string[];
  issues?: Issue[];
  createdAt?: String;
  updatedAt?: String;
}