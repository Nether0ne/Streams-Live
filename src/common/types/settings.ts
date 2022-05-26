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
  VIEWERS = "viewersCount",
  NAME = "userName",
  STARTED_AT = "startedAt",
}

export enum GroupBy {
  NONE = "none",
  PLATFORM = "platform",
  CATEGORY = "category",
}

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export interface GeneralSettings {
  fontSize: FontSize;
  theme: Theme;
  badge: boolean;
}

export interface NotificationSettings {
  enabled: boolean;
  twitch: boolean;
  youtube: boolean;
  goodgame: boolean;
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
  },
  notifications: {
    enabled: true,
    twitch: true,
    youtube: true,
    goodgame: true,
  },
  stream: {
    sortDirection: SortDirection.DESC,
    sortField: SortField.VIEWERS,
    groupBy: GroupBy.NONE,
  },
};
