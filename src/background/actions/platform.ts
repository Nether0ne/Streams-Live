import * as Goodgame from "@/api/goodgame";
import * as Twitch from "@/api/twitch";
import * as Kick from "@/api/kick";
import { t } from "@/common/helpers";
import { stores } from "@/common/store";
import { FollowedStreamer, Platform, PlatformName, UserData } from "@/common/types/platform";
import { createNotification, getIconPath } from "./misc";
import { updateStreams } from "./streams";
import browser from "webextension-polyfill";
import { generateCodeVerifier, generateCodeChallenge } from "@/common/utils/kickAuth";
import { codeVerifierKey } from "@/constants/kick";

export async function getPlatform(name: PlatformName): Promise<Platform> {
  switch (name) {
    case PlatformName.TWITCH:
      return await stores.twitch.get();
    case PlatformName.GOODGAME:
      return await stores.goodgame.get();
    case PlatformName.KICK:
      return await stores.kick.get();
  }
}

export async function getEnabledPlatforms(): Promise<Platform[]> {
  const twitch = await stores.twitch.get();
  const goodgame = await stores.goodgame.get();
  const kick = await stores.kick.get();

  const setProfiles = [];

  if (twitch.enabled) setProfiles.push(twitch);
  if (goodgame.enabled) setProfiles.push(goodgame);
  if (kick.enabled) setProfiles.push(kick);

  return setProfiles;
}

export function getPlatformClient(
  platform: Platform
): typeof Twitch | typeof Goodgame | typeof Kick | null {
  const { name } = platform;
  switch (name) {
    case PlatformName.TWITCH:
      return Twitch;
    case PlatformName.GOODGAME:
      return Goodgame;
    case PlatformName.KICK:
      return Kick;
    default:
      return null;
  }
}

export async function updatePlatform(platform: Platform): Promise<UserData | null> {
  const client = getPlatformClient(platform);

  if (!client || !("getCurrentUser" in client)) return null;

  const profile = await client.getCurrentUser();
  if (!profile) return null;
  platform.data = profile;
  await stores[platform.name].set(platform);

  return profile;
}

export async function updateFollowedStreamers(
  platform: Platform
): Promise<FollowedStreamer[] | null> {
  const client = getPlatformClient(platform);

  if (client && "getFollowedStreamers" in client) {
    if (!platform.enabled) platform.enabled = true;
    const followedChannels = await client.getFollowedStreamers();

    if (followedChannels) {
      platform.followedStreamers = followedChannels;
      await stores[platform.name].set(platform);
      return followedChannels;
    }
  }

  return null;
}

type PlatformAuthParameters = {
  accessToken: string;
  platformName: PlatformName;
  refreshToken?: string;
  expiresIn?: number;
};

export async function platformAuth({
  accessToken,
  platformName,
  refreshToken,
  expiresIn,
}: PlatformAuthParameters) {
  const platform = await getPlatform(platformName);
  platform.accessToken = accessToken;
  platform.refreshToken = refreshToken;
  platform.expiresIn = expiresIn;
  platform.enabled = true;

  await stores[platformName].set(platform);
  await updatePlatform(platform);

  createNotification(["profileSet", platform.name, platform.name], {
    title: t("profileSet"),
    message: t("profileSetMessage", platform.name),
    contextMessage: t("profileSetContext", platform.name),
    type: "basic",
    iconUrl: platform.data && platform.data.avatar ? platform.data.avatar : await getIconPath(128),
  });

  await updateStreams();
}

export async function authInit(platform: PlatformName) {
  switch (platform) {
    case PlatformName.TWITCH: {
      const url = new URL("https://id.twitch.tv/oauth2/authorize");

      url.searchParams.set("client_id", process.env.TWITCH_CLIENT_ID as string);
      url.searchParams.set("redirect_uri", process.env.TWITCH_REDIRECT_URI as string);
      url.searchParams.set("response_type", "token");
      url.searchParams.set("scope", "user:read:follows");

      browser.tabs.create({
        active: true,
        url: url.href,
      });
      break;
    }
    case PlatformName.KICK: {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      const url = new URL("https://id.kick.com/oauth/authorize");

      url.searchParams.set("client_id", process.env.KICK_CLIENT_ID as string);
      url.searchParams.set("response_type", "code");
      url.searchParams.set("redirect_uri", process.env.AUTH_REDIRECT_URI as string);
      url.searchParams.set("state", `streamslive-${new Date().getTime()}`);
      url.searchParams.set("scope", "user:read channel:read");
      url.searchParams.set("code_challenge", codeChallenge);
      url.searchParams.set("code_challenge_method", "S256");
      browser.storage.local.set({ [codeVerifierKey]: codeVerifier });

      browser.tabs.create({
        active: true,
        url: url.href,
      });
      break;
    }
  }
}
