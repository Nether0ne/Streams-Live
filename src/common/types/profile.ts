import { Platform } from "./general";
import { Stream } from "./stream";

export interface Streams {
  data: Stream[];
  isLoading: boolean;
}

export interface Profile {
  id: string | undefined;
  accessToken: string | undefined;
  name: string | undefined;
  platform: Platform;
  avatar: string | undefined;
}
