import { Platform } from "./general";

export interface Stream {
  id: string;
  user: string;
  game: string | null;
  title: string;
  thumbnail: string;
  viewers: number;
  startedAt: string | null;
  type: "live" | "rerun" | null;
  platform: Platform;
}

export interface StreamError {
  message: string;
  platform: Platform;
}
