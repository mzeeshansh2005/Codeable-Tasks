export interface TabItem {
  id: string;
  title: string;
  icon: string;
  project: string;
  status?: "open" | "in-progress" | "closed";
  priority?: "low" | "medium" | "high";
}

