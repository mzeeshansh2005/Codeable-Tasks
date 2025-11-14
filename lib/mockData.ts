import { Project } from "@/types/project";
import { Recents } from "@/types/recents";
import type { TabItem } from "@/types/tabitem";

export const mockRecentProjects: Recents[] = [
  {
    id: "1",
    title: "Website Redesign",
    type: "project",
    icon: "Layout",
    lastAccessed: new Date("2025-11-14T10:30:00"),
  },
  {
    id: "2",
    title: "Marketing Campaign Q4",
    type: "project",
    icon: "Kanban",
    lastAccessed: new Date("2025-11-14T09:15:00"),
  }
];

export const mockRecentIssues: Recents[] = [
  {
    id: "issue-1",
    title: "Fix login page responsive layout",
    type: "issue",
    icon: "Bug",
    lastAccessed: new Date("2025-11-14T11:00:00"),
  },
  {
    id: "issue-2",
    title: "Add dark mode support",
    type: "issue",
    icon: "Moon",
    lastAccessed: new Date("2025-11-14T09:30:00"),
  },
  {
    id: "issue-3",
    title: "Optimize database queries",
    type: "issue",
    icon: "Database",
    lastAccessed: new Date("2025-11-13T17:20:00"),
  }
];

// Worked on issues
export const mockWorkedOnItems: TabItem[] = [
  {
    id: "work-1",
    title: "Fix authentication bug",
    icon: "Shield",
    project: "Website Redesign",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "work-2",
    title: "Update user profile UI",
    icon: "User",
    project: "Mobile App Development",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: "work-3",
    title: "Implement responsive layout",
    icon: "Layout",
    project: "Website Redesign",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: "work-4",
    title: "Add loading states",
    icon: "Loader",
    project: "Marketing Campaign Q4",
    status: "in-progress",
    priority: "low",
  },
];

// Assigned to me issues
export const mockAssignedItems: TabItem[] = [
  {
    id: "assigned-1",
    title: "Implement payment gateway",
    icon: "CreditCard",
    project: "E-commerce Platform",
    status: "open",
    priority: "high",
  },
  {
    id: "assigned-2",
    title: "Fix email notifications",
    icon: "Mail",
    project: "Marketing Campaign Q4",
    status: "open",
    priority: "high",
  },
  {
    id: "assigned-3",
    title: "Add search functionality",
    icon: "Search",
    project: "Website Redesign",
    status: "open",
    priority: "medium",
  },
  {
    id: "assigned-4",
    title: "Update documentation",
    icon: "FileText",
    project: "API Documentation",
    status: "open",
    priority: "low",
  },
];

// Starred issues
export const mockStarredItems: TabItem[] = [
  {
    id: "starred-1",
    title: "Improve performance metrics",
    icon: "Zap",
    project: "Mobile App Development",
    status: "open",
    priority: "high",
  },
  {
    id: "starred-2",
    title: "Setup CI/CD pipeline",
    icon: "GitBranch",
    project: "DevOps Infrastructure",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "starred-3",
    title: "Refactor API endpoints",
    icon: "Code",
    project: "API Documentation",
    status: "open",
    priority: "medium",
  },
  {
    id: "starred-4",
    title: "Add unit tests",
    icon: "TestTube",
    project: "Website Redesign",
    status: "open",
    priority: "medium",
  },
];

export const mockProjects:Project[]=[
  {
    id: "1",
    title: "Website Redesign",
    img: "https://images.squarespace-cdn.com/content/v1/5e10bdc20efb8f0d169f85f9/09943d85-b8c7-4d64-af31-1a27d1b76698/arrow.png",
    description: "A redesign of the website to improve the user experience",
    createdAt: new Date("2025-11-14T10:30:00"),
    updatedAt: new Date("2025-11-14T10:30:00"),
  },
  {
    id: "2",
    title: "Marketing Campaign Q4",
    img: "https://images.squarespace-cdn.com/content/v1/5e10bdc20efb8f0d169f85f9/09943d85-b8c7-4d64-af31-1a27d1b76698/arrow.png",
    description: "A marketing campaign for the fourth quarter of the year",
    createdAt: new Date("2025-11-14T09:15:00"),
    updatedAt: new Date("2025-11-14T09:15:00"),
  }
]