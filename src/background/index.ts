import { getLinkForPlatform } from "@/common/helpers";
import { stores } from "@/common/store";
import { Dictionary, LinkType, NotificationType } from "@/common/types/general";
import { PlatformName } from "@/common/types/platform";
import browser from "webextension-polyfill";
import { updateBadge, ping } from "./actions/misc";
import {
  authInit,
  updatePlatform,
  updateFollowedStreamers,
  platformAuth,
} from "./actions/platform";
import { setup, backup, restore, reset } from "./actions/settings";
import { updateStreams } from "./actions/streams";
import { codeVerifierKey } from "@/constants/kick";
import { getAuth } from "@/api/kick";

const updateInterval = 1;
const updateStreamsAlarm = "updateStreams";

const messageHandlers: Dictionary<(...args: any[]) => Promise<any>> = {
  authInit,
  updateFollowedStreamers,
  updatePlatform,
  updateStreams,
  updateBadge,
  backup,
  restore,
  reset,
  ping,
};

browser.alarms.create("updateStreams", { periodInMinutes: updateInterval });

browser.runtime.onMessage.addListener((message) => {
  const { [message.type]: handler } = messageHandlers;

  if (handler == null) {
    throw new RangeError();
  }

  return handler(...message.args);
});

browser.alarms.onAlarm.addListener((alarm) => {
  // Skip alarms older than 5 mins
  if (alarm.scheduledTime + 300_000 < Date.now()) {
    return;
  }

  if (alarm.name === updateStreamsAlarm) {
    updateStreams();
  }
});

browser.notifications.onClicked.addListener((notificationId: string) => {
  const split = notificationId.split(":");
  const type = split[1];
  const streamJSON = split.slice(2).join(":");
  const stream = JSON.parse(streamJSON);

  switch (type) {
    case NotificationType.STREAM: {
      browser.tabs.create({
        url: getLinkForPlatform(stream, LinkType.STREAM),
      });
    }
  }
});

stores.streams.onChange(async () => {
  if ((await stores.streams.get()).isLoading === false) {
    updateBadge();
  }
});

// TODO: refactor for multiple callbacks
browser.tabs.onUpdated.addListener(async (_tabId, changeInfo, tab) => {
  // If tab has no relation to exstension, ignore
  if (tab.url === "undefined") return;

  if (changeInfo.status !== "complete" || !tab.url) return;
  if (
    !tab.url.startsWith(process.env.AUTH_REDIRECT_URI as string) &&
    !tab.url.startsWith(process.env.TWITCH_REDIRECT_URI as string)
  )
    return;

  const url = new URL(tab.url);
  const kickCode = url.searchParams.get("code");

  if (kickCode) {
    const codeVerifierStore = await browser.storage.local.get(codeVerifierKey);
    const codeVerifier = codeVerifierStore[codeVerifierKey];
    try {
      const authData = await getAuth(kickCode, codeVerifier);
      await platformAuth({ ...authData, platformName: PlatformName.KICK });
    } catch (e) {
      console.log(e);
    } finally {
      await browser.storage.local.remove(codeVerifierKey);
    }
  } else {
    const urlParams = new URLSearchParams(url.toString().split("#").at(-1));
    const accessToken = urlParams.get("access_token");

    if (!accessToken) return;

    await platformAuth({ accessToken, platformName: PlatformName.TWITCH });
  }
});

browser.runtime.onInstalled.addListener((detail) => {
  if (detail.reason === "browser_update") {
    return;
  }

  setup(true);
});

browser.runtime.onStartup.addListener(() => {
  setup();
});
