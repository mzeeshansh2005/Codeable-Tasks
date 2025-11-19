export interface Recents {
  resourceId: string;
  title: string;
  type: "project" | "issue";
  lastAccessed?: Date;
}

