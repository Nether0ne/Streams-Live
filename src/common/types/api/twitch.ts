export interface FollowedTwitchChannel {
  broadcaster_id: string;
  broadcaster_login: string;
  broadcaster_name: string;
  followed_at: string;
}

export interface TwitchProfile {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
}

export interface TwitchPagination {
  cursor?: string;
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
