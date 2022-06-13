export type Dictionary<T> = Record<string, T>;

export enum LinkType {
  STREAM = "stream",
  CHANNEL = "channel",
  CHAT = "chat",
  VIDEOS = "videos",
}

export enum NotificationType {
  STREAM = "stream",
  AUTH = "auth",
}
