import * as Twitch from "../../../api/twitch";
import { Platform } from "@/common/types/general";

export function getPlatformClient(platform: Platform): typeof Twitch | undefined {
  switch (platform) {
    case Platform.TWITCH:
      return Twitch;
    // case Platform.YOUTUBE:
    //   return Youtube;
    // TODO: goodgame api handler
    // case Platform.GOODGAME:
    //   return Goodgame;
  }
}
