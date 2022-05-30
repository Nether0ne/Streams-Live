import { stores } from "@/common/store";
import { Platform } from "@/common/types/general";
import { Profile } from "@/common/types/profile";
import { getProfile } from "./getProfile";

export async function setupProfile(
  platform: Platform,
  data: Partial<Profile>
): Promise<Profile | null> {
  const profile = await getProfile(platform);
  profile.id = data.id;
  profile.name = data.name;
  profile.avatar = data.avatar;

  await stores[`${platform}Profile`].set(profile);
  return profile;
}
