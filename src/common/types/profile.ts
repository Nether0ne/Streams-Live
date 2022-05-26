import { Platform } from "./general";
import { Stream } from "./stream";

export interface LiveStreams {
  data: Stream[];
  isLoading: boolean;
}

export interface Profile {
  id: string | null;
  accessToken: string | null;
  name: string | null;
  platform: Platform;
  avatar: string | null;
}

export interface TwitchProfile {
  id: string;
  login: string;
  broadcaster_type: "partner" | "affiliate" | "";
  display_name: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  type: "staff" | "admin" | "global_mod" | "";
  view_count: number;
  email: string | null;
  created_at: string;
}
