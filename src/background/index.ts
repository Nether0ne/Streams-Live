import browser from "webextension-polyfill";
import { t } from "@/common/helpers";
import { stores } from "@/common/store";
import { Dictionary, Platform } from "@/common/types/general";
import { setup } from "./actions/settings/setup";
import { updateStreams } from "./actions/streams/updateStreams";
import { createNotification } from "./actions/misc/createNotification";
import { setupProfile } from "./actions/profiles/setupProfile";
import { getPlatformClient } from "./actions/platform/getPlatformClient";
import { getProfile } from "./actions/profiles/getProfile";
import { updateBadge } from "./actions/misc/updateBadge";
import { updateProfile } from "./actions/profiles/updateProfile";
import { backup } from "./actions/settings/backup";
import { restore } from "./actions/settings/restore";
import { reset } from "./actions/settings/reset";

const iconUrlPlaceholder = browser.runtime.getURL("/icon/icon-128.png");

(async () => await updateStreams())();

const messageHandlers: Dictionary<(...args: any[]) => Promise<any>> = {
  updateProfile,
  updateStreams,
  updateBadge,
  backup,
  restore,
  reset,
};

browser.alarms.create("updateStreams", { periodInMinutes: 1 });

browser.runtime.onMessage.addListener((message) => {
  const { [message.type]: handler } = messageHandlers;

  if (handler == null) {
    throw new RangeError();
  }

  return handler(...message.args);
});

browser.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "updateStreams") {
    updateStreams();
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

    let platform = null;

    if (tab.url?.startsWith(process.env.TWITCH_REDIRECT_URI as string)) {
      platform = Platform.TWITCH;
    }
    if (tab.url?.startsWith(process.env.GOODGAME_REDIRECT_URI as string)) {
      platform = Platform.GOODGAME;
    }

    const accessToken = hashParams.get("access_token");

    if (platform && accessToken) {
      const profile = await getProfile(platform);

      profile.accessToken = accessToken;
      await stores[`${platform}Profile`].set(profile);

      const platformClient = getPlatformClient(platform);

      if (platformClient) {
        const profile = await platformClient.getCurrentUser();
        const setProfile = await setupProfile(platform, profile);

        if (setProfile) {
          await createNotification(`${platform}ProfileSet`, {
            title: t("profileSet"),
            message: t("profileSetMessage", platform),
            contextMessage: t("profileSetContext", platform),
            type: "basic",
            iconUrl: setProfile.avatar !== null ? setProfile.avatar : iconUrlPlaceholder,
          });

          await updateStreams();
        }
      }
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
