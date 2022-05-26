import { Platform } from "./general";

export interface TwitchPagination {
  cursor: string | null;
  user_id: string;
  first: number;
}

export interface TwitchStream {
  id: string;
  user_id: string;
  user_name: string;
  user_login: string;
  game_id: string;
  game_name: string;
  title: string;
  thumbnail_url: string;
  viewer_count: number;
  started_at: string;
  language: string;
  is_mature: boolean;
  type: "live" | "rerun" | "";
  tag_ids: string[];
  pagination: TwitchPagination;
}

export interface Stream {
  userName: string;
  gameName: string | null;
  title: string;
  thumbnailUrl: string;
  viewersCount: number;
  startedAt: string;
  type: "live" | "rerun" | null;
  platform: Platform;
}
