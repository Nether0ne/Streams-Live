import { stores } from "@/common/store";
import { PlatformName } from "@/common/types/platform";
import { get } from "lodash-es";
import { useMemo } from "react";
import { useStore } from "./store";

export function usePlatform(name: PlatformName) {
  return useStore(get(stores, name));
}

export function useEnabledPlatforms() {
  const [twitch, twitchStore] = usePlatform(PlatformName.TWITCH);
  const [goodgame, goodgameStore] = usePlatform(PlatformName.GOODGAME);
  const [kick, kickStore] = usePlatform(PlatformName.KICK);

  const allSetProfiles = [];

  if (twitch.enabled) allSetProfiles.push({ platform: twitch, store: twitchStore });
  if (goodgame.enabled) allSetProfiles.push({ platform: goodgame, store: goodgameStore });
  if (kick.enabled) allSetProfiles.push({ platform: kick, store: kickStore });

  return allSetProfiles;
}

export function useExpiredPlatform() {
  const [twitch] = usePlatform(PlatformName.TWITCH);
  const [kick] = usePlatform(PlatformName.KICK);

  const expiredPlatform: PlatformName | null = useMemo(() => {
    switch (true) {
      case twitch.enabled && !twitch.accessToken:
        return PlatformName.TWITCH;
      case kick.enabled && !kick.accessToken && !kick.refreshToken:
        return PlatformName.KICK;
      default:
        return null;
    }
  }, [twitch, kick]);

  return expiredPlatform;
}
