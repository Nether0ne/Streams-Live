import { stores } from "@/common/store";
import { Platform } from "@/common/types/general";
import { get } from "lodash-es";
import { useStore } from "./store";

export function useProfile(platform: Platform) {
  return useStore(get(stores, `${platform}Profile`));
}

export function useAllSetProfiles() {
  const [twitch, twitchStore] = useProfile(Platform.TWITCH);
  const [youtube, youtubeStore] = useProfile(Platform.YOUTUBE);
  const [goodgame, goodgameStore] = useProfile(Platform.GOODGAME);

  const allSetProfiles = [];

  if (twitch.name) allSetProfiles.push({ profile: twitch, store: twitchStore });
  if (youtube.name) allSetProfiles.push({ profile: youtube, store: youtubeStore });
  if (goodgame.name) allSetProfiles.push({ profile: goodgame, store: goodgameStore });

  return allSetProfiles;
}
