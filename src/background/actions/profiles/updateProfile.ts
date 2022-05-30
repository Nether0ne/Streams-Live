import { Platform } from "@/common/types/general";
import { Profile } from "@/common/types/profile";
import { getPlatformClient } from "../platform/getPlatformClient";
import { setupProfile } from "./setupProfile";

export async function updateProfile(platform: Platform): Promise<Profile | null> {
  const client = getPlatformClient(platform);

  if (client) {
    const updatedProfile = await client.getCurrentUser();
    const profile = setupProfile(platform, updatedProfile);

    return profile;
  }

  return null;
}
