import { Platform } from "./general";

export interface Stream {
  user: string;
  userLogin: string;
  game: string | null;
  title: string;
  thumbnail: string;
  viewers: number;
  startedAt: string;
  type: "live" | "rerun" | null;
  platform: Platform;
}

export interface StreamError {
  message: string;
  platform: Platform;
}
