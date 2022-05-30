import { stores } from "@/common/store";
import { Profile } from "@/common/types/profile";

export async function getAllSetProfiles(): Promise<Profile[]> {
  const twitch = await stores.twitchProfile.get();
  const goodgame = await stores.goodgameProfile.get();
  // const youtube = await stores.twitchProfile.get();

  const setProfiles = [];

  if (twitch.accessToken) setProfiles.push(twitch);
  if (goodgame.accessToken) setProfiles.push(goodgame);
  // if (youtube.accessToken) setProfiles.push(youtube);

  return setProfiles;
}
