export interface Recents {
  id: string;
  title: string;
  type: "project" | "issue";
  icon: string;
  lastAccessed?: Date;
}

