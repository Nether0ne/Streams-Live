import { StreamCardSettings } from "./stream";

export enum FontSize {
  SMALLEST = "smallest",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  LARGEST = "largest",
}
export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export enum SortField {
  VIEWERS = "viewers",
  NAME = "user",
  STARTED_AT = "startedAt",
}

export enum GroupBy {
  NONE = "none",
  PLATFORM = "platform",
  CATEGORY = "game",
}

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export interface GeneralSettings {
  fontSize: FontSize;
  theme: Theme;
  badge: boolean;
  useCustomStreamCard: boolean;
  customStreamCard: StreamCardSettings;
}

export interface NotificationSettings {
  enabled: boolean;
  category: boolean;
  twitch: boolean;
  goodgame: boolean;
  kick: boolean;
}

export interface StreamSettings {
  sortDirection: SortDirection;
  sortField: SortField;
  groupBy: GroupBy;
}

export interface Settings {
  general: GeneralSettings;
  notifications: NotificationSettings;
  stream: StreamSettings;
}

export const defaultSettings: Settings = {
  general: {
    fontSize: FontSize.MEDIUM,
    theme: Theme.DARK,
    badge: true,
    useCustomStreamCard: false,
    customStreamCard: {
      thumbnail: true,
      platformIcon: true,
      viewers: true,
      title: true,
      category: true,
    },
  },
  notifications: {
    enabled: true,
    category: false,
    twitch: true,
    goodgame: true,
    kick: true,
  },
  stream: {
    sortDirection: SortDirection.DESC,
    sortField: SortField.VIEWERS,
    groupBy: GroupBy.NONE,
  },
};
