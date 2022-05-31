import * as Twitch from "../../../api/twitch";
import * as Goodgame from "../../../api/goodgame";
import { Platform } from "@/common/types/general";

export function getPlatformClient(platform: Platform): typeof Twitch | typeof Goodgame | undefined {
  switch (platform) {
    case Platform.TWITCH:
      return Twitch;
    // case Platform.YOUTUBE:
    //   return Youtube;
    case Platform.GOODGAME:
      return Goodgame;
  }
}
