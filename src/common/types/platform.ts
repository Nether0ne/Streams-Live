export enum PlatformName {
  TWITCH = "twitch",
  GOODGAME = "goodgame",
  // TODO: Add more platforms
  // TROVO = "trovo",
  // WASD = "wasd",
}

export interface Platform {
  enabled: boolean;
  name: PlatformName;
  type: PlatformType;
  accessToken?: string;
  data: UserData | null;
  followedStreamers: FollowedStreamer[];
}

export interface FollowedStreamer {
  id: string;
  name: string;
  avatar: string;
}

export interface UserData {
  id: string | null;
  name: string | null;
  avatar: string | null;
}

export enum PlatformType {
  AUTH = "auth",
  LIST = "list",
  NONE = "none",
}

export const PlatformsTypeMap = {
  [PlatformName.TWITCH]: PlatformType.AUTH,
  [PlatformName.GOODGAME]: PlatformType.NONE,
  // TODO: Add more platforms
  // [PlatformName.TROVO]: PlatformType.LIST,
  // [PlatformName.WASD]: PlatformType.LIST,
};
