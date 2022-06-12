import { PlatformName } from "./platform";

export interface Stream {
  id: string;
  user: string;
  game: string | null;
  title: string;
  thumbnail: string;
  viewers: number;
  startedAt: string | null;
  type: "live" | "rerun" | null;
  platform: PlatformName;
}

export interface Streams {
  data: Stream[];
  isLoading: boolean;
}

export interface StreamError {
  message: string;
  platform: PlatformName;
}
