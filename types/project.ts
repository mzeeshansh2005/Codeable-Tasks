import { Issue } from "./issue";

export interface Project {
  id: string;
  title: string;
  img: string;
  description: string;
  issues?: Issue[];
  createdAt: Date;
  updatedAt: Date;
}