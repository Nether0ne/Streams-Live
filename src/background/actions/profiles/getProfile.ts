import { stores } from "@/common/store";
import { Platform } from "@/common/types/general";
import { Profile } from "@/common/types/profile";

export async function getProfile(platform: Platform): Promise<Profile> {
  switch (platform) {
    case Platform.TWITCH:
      return await stores.twitchProfile.get();
    // case Platform.YOUTUBE:
    //   return await stores.youtubeProfile.get();
    case Platform.GOODGAME:
      return await stores.goodgameProfile.get();
  }
}
