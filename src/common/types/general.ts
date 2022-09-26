export type Dictionary<T> = Record<string, T>;

export enum LinkType {
  STREAM = "stream",
  POPOUT = "popout",
  CHAT = "chat",
  VIDEOS = "videos",
}

export enum NotificationType {
  STREAM = "stream",
  AUTH = "auth",
}
