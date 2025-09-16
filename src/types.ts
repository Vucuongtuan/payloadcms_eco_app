export type Lang = "vi" | "en";

export interface AnnouncementSettings {
  transition: "blur" | "slide-horizontal" | "slide-vertical";
  interval: number;
  announcement: Announcement[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
}
