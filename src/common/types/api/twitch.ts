export interface TwitchProfile {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
}

export interface TwitchPagination {
  cursor: string | null;
  user_id: string;
  first: number;
}

export interface TwitchStream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_name: string;
  title: string;
  thumbnail_url: string;
  viewer_count: number;
  started_at: string;
  type: "live" | "rerun" | null;
}
