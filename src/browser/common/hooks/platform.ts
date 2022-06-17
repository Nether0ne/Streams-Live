import { stores } from "@common/store";
import { PlatformName } from "@customTypes/platform";
import { get } from "lodash-es";
import { useStore } from "@hooks/store";

export function usePlatform(name: PlatformName) {
  return useStore(get(stores, name));
}

export function useAllSetPlatforms() {
  const [twitch, twitchStore] = usePlatform(PlatformName.TWITCH);
  const [goodgame, goodgameStore] = usePlatform(PlatformName.GOODGAME);

  const allSetProfiles = [];

  if (twitch.enabled) allSetProfiles.push({ platform: twitch, store: twitchStore });
  if (goodgame.enabled) allSetProfiles.push({ platform: goodgame, store: goodgameStore });

  return allSetProfiles;
}
