export interface WasdSearch {
  result: {
    profiles: {
      count: number;
      rows: WasdProfile[];
    };
  };
}

export interface WasdSearchChannel {
  result: {
    count: number;
    rows: WasdUser[];
  };
}

export interface WasdMedia {
  result: WasdContainer[];
}

export interface WasdUser {
  channel_id: number; // channel ID
  channel_name: string; // channel name
  channel_image: {
    small: string; // channel avatar
  };
}

export interface WasdProfile {
  channel_id: number; // channel ID
  user_login: string; // channel name
  profile_image: {
    small: string; // channel avatar
  };
}

export interface WasdContainer {
  media_container_status: string; // stream status, if online === RUNNING
  media_container_preview_url: string | null; // equals to thumbnail, but mostly is null
  media_container_name: string; // equals to title
  media_container_priority: number; // equals to viewers
  published_at: string; // last activity date? probably equals to time when title is set, can be used for uptime
  game: {
    game_name: string;
  };
  media_container_channel: WasdUser;
}
