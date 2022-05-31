export type Dictionary<T> = Record<string, T>;

export enum Platform {
  TWITCH = "twitch",
  //YOUTUBE = "youtube",
  GOODGAME = "goodgame",
}

export enum LinkType {
  STREAM = "stream",
  CHANNEL = "channel",
  CHAT = "chat",
  VIDEOS = "videos",
}
