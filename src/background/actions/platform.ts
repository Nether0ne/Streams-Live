import * as Goodgame from "@/api/goodgame";
import * as Twitch from "@/api/twitch";
import * as Wasd from "@/api/wasd";
import { t } from "@/common/helpers";
import { stores } from "@/common/store";
import { FollowedStreamer, Platform, PlatformName } from "@/common/types/platform";
import { createNotification, getIconPath } from "./misc";
import { updateStreams } from "./streams";
import browser from "webextension-polyfill";

export async function getPlatform(name: PlatformName): Promise<Platform> {
  switch (name) {
    case PlatformName.TWITCH:
      return await stores.twitch.get();
    case PlatformName.GOODGAME:
      return await stores.goodgame.get();
    // TODO: Add more platforms
    // case PlatformName.TROVO:
    //   return await stores.trovo.get();
    // case PlatformName.WASD:
    //   return await stores.wasd.get();
  }
}

export async function getAllSetPlatforms(): Promise<Platform[]> {
  const twitch = await stores.twitch.get();
  const goodgame = await stores.goodgame.get();
  // TODO: Add more platforms
  // const trovo = await stores.trovo.get();
  // const wasd = await stores.wasd.get();

  const setProfiles = [];

  if (twitch.enabled) setProfiles.push(twitch);
  if (goodgame.enabled) setProfiles.push(goodgame);
  // TODO: Add more platforms
  // if (trovo.enabled) setProfiles.push(trovo);
  // if (wasd.enabled) setProfiles.push(wasd);

  return setProfiles;
}

export function getPlatformClient(
  platform: Platform
): typeof Twitch | typeof Goodgame | typeof Wasd | null {
  const { name } = platform;
  switch (name) {
    case PlatformName.TWITCH:
      return Twitch;
    case PlatformName.GOODGAME:
      return Goodgame;
    // TODO: Add more platforms
    // case PlatformName.TROVO:
    //   return Trovo;
    // case PlatformName.WASD:
    //   return Wasd;
    default:
      return null;
  }
}

export async function setupPlatform(
  platform: Platform,
  accessToken?: string
): Promise<Platform | null> {
  if (accessToken) {
    platform.enabled = true;
    platform.accessToken = accessToken;
    await stores[`${platform.name}`].set(platform);
    return await updatePlatform(platform);
  }

  return platform;
}

export async function updatePlatform(platform: Platform): Promise<Platform | null> {
  const client = getPlatformClient(platform);

  if (client && "getCurrentUser" in client) {
    const profile = await client.getCurrentUser();

    if (profile) {
      platform.data = profile;
      await stores[platform.name].set(platform);
    }
  }

  return platform;
}

// TODO: Add more platforms
// export async function search(platform: Platform, name: string): Promise<FollowedStreamer[]> {
//   const client = getPlatformClient(platform);

//   if (client && "search" in client) {
//     return await client.search(name);
//   }

//   return [];
// }

// export async function findStreamer(
//   platform: Platform,
//   streamer: string
// ): Promise<FollowedStreamer | null> {
//   const client = getPlatformClient(platform);

//   if (client && "findStreamer" in client) {
//     const foundStreamer = await client.findStreamer(streamer);
//     return foundStreamer;
//   }

//   return null;
// }

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

export async function platformAuth(accessToken: string, platformName: PlatformName) {
  const platform = await getPlatform(platformName);
  platform.accessToken = accessToken;
  platform.enabled = true;
  await stores[platformName].set(platform);

  const updatedPlatform = await updatePlatform(platform);

  if (updatedPlatform) {
    createNotification(["profileSet", updatedPlatform.name!, platform.name], {
      title: t("profileSet"),
      message: t("profileSetMessage", platform.name),
      contextMessage: t("profileSetContext", platform.name),
      type: "basic",
      iconUrl:
        updatedPlatform.data && updatedPlatform.data.avatar
          ? updatedPlatform.data.avatar
          : await getIconPath(128),
    });

    await updateStreams();
  }
}

export async function authInit(platformName: PlatformName) {
  if (platformName === PlatformName.TWITCH) {
    const url = new URL("https://id.twitch.tv/oauth2/authorize");

    url.searchParams.set("client_id", process.env.TWITCH_CLIENT_ID as string);
    url.searchParams.set("redirect_uri", process.env.AUTH_REDIRECT_URI as string);
    url.searchParams.set("response_type", "token");
    url.searchParams.set("scope", "user:read:follows");

    browser.tabs.create({
      active: true,
      url: url.href,
    });
  }
}
