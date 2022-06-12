import { getLinkForPlatform } from "@/common/helpers";
import { stores } from "@/common/store";
import { Dictionary, NotificationType } from "@/common/types/general";
import { PlatformName } from "@/common/types/platform";
import browser from "webextension-polyfill";
import { updateBadge } from "./actions/misc";
import {
  getPlatform,
  updatePlatform,
  setupPlatform,
  updateFollowedStreamers,
  // TODO: Add more platforms
  // findStreamer,
  // search,
} from "./actions/platform";
import { setup, backup, restore, reset } from "./actions/settings";
import { updateStreams } from "./actions/streams";

const updateInterval = 1;
const updateStreamsAlarm = "updateStreams";

const messageHandlers: Dictionary<(...args: any[]) => Promise<any>> = {
  // TODO: Add more platforms
  // findStreamer,
  // search,
  updateFollowedStreamers,
  updatePlatform,
  updateStreams,
  updateBadge,
  backup,
  restore,
  reset,
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
  const [, type, user, platform] = notificationId.split(":");

  switch (type) {
    case NotificationType.STREAM: {
      browser.tabs.create({
        url: getLinkForPlatform(platform as PlatformName, user),
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
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // If tab has no relation to exstension, ignore
  if (tab.url === "undefined") {
    return;
  }

  if (changeInfo.status === "complete" && tab.url) {
    const url = new URL(tab.url);
    const hashParams = new URLSearchParams(url.hash.substring(1));

    let platformName = null;

    if (tab.url?.startsWith(process.env.TWITCH_REDIRECT_URI as string)) {
      platformName = PlatformName.TWITCH;
    }
    if (tab.url?.startsWith(process.env.GOODGAME_REDIRECT_URI as string)) {
      platformName = PlatformName.GOODGAME;
    }

    const accessToken = hashParams.get("access_token");

    if (platformName && accessToken) {
      const platform = await getPlatform(platformName);

      await setupPlatform(platform, accessToken);
      await updateStreams();
    } else {
      // TODO: uncomment when redirect uri will be not streaming site
      // await createNotification(`${platform}ProfileSetFailed`, {
      //   title: t("profileSetFailed"),
      //   message: t("profileSetFailedMessage", platform),
      //   type: "basic",
      //   iconUrl: iconUrlPlaceholder,
      // });
    }
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
