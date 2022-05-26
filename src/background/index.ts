import browser from "webextension-polyfill";
import { settlePromises, t } from "@/common/helpers";
import { Store, stores, StoreState } from "@/common/store";
import * as Twitch from "@/api/twitch";
import { Dictionary, Platform } from "@/common/types/general";
import { Stream } from "@/common/types/stream";
import { LiveStreams, Profile, TwitchProfile } from "@/common/types/profile";
import { Settings } from "@/common/types/settings";
import { get } from "lodash-es";

const messageHandlers: Dictionary<(...args: any[]) => Promise<any>> = {
  updateProfile,
  updateLiveStreams,
  backup,
  restore,
  reset,
};

browser.alarms.create("updateLiveStream", { periodInMinutes: 1 });

async function updateProfile(): Promise<Profile | null> {
  const user = await Twitch.getCurrentUser();

  if (user && user.id && user.display_name) {
    const twitch = await stores.twitchProfile.get();

    // Set user data
    twitch.id = user.id;
    twitch.name = user.display_name;
    twitch.avatar = user.profile_image_url;

    await stores.twitchProfile.set(twitch);

    return twitch;
  }

  return null;
}

async function updateLiveStreams(sendNotifications: boolean = true, forceUpdate: boolean = false) {
  // To determine streams which needed notifications
  console.log("update at " + new Date().toLocaleTimeString());
  const liveStreams = await stores.liveStreams.get();

  const updatedLiveStreams: Stream[] = [];

  if (forceUpdate) {
    await stores.liveStreams.set({ data: [], isLoading: true });
  }

  const streams = await Twitch.getLiveStreamers();

  if (streams) {
    for (const stream of streams) {
      updatedLiveStreams.push({
        userName: stream.user_name,
        gameName: stream.game_name,
        title: stream.title,
        thumbnailUrl: stream.thumbnail_url,
        viewersCount: stream.viewer_count,
        startedAt: stream.started_at,
        type: stream.type,
        platform: "twitch" as Platform,
      });
    }
  }

  await stores.liveStreams.set({ data: updatedLiveStreams, isLoading: false });

  const streamsCount = updatedLiveStreams.length;

  // Sets active streams amount as text on badge
  if (streamsCount > 0) {
    browser.action.setBadgeText({ text: `${streamsCount}` });
  } else {
    browser.action.setBadgeText({ text: "" });
  }
}

async function refreshActionBadge(): Promise<void> {
  const manifest = browser.runtime.getManifest();
  const browserAction = manifest.manifest_version === 2 ? browser.browserAction : browser.action;

  // Todo: authorized if any account connection exists
  const authorized = true;

  const [liveStreams, settings] = await Promise.all([
    stores.liveStreams.get(),
    stores.settings.get(),
  ]);

  let text = "";

  if (settings.general.badge && liveStreams.data.length > 0) {
    text = `${liveStreams.data.length}`;
  }

  const getIconPath = (size: number) =>
    browser.runtime.getURL(authorized ? `icon-${size}.png` : `icon-gray-${size}.png`);

  await Promise.allSettled([
    browserAction.setBadgeBackgroundColor({
      color: "#000000",
    }),
    browserAction.setBadgeText({
      text,
    }),
    browserAction.setIcon({
      path: {
        16: getIconPath(16),
        32: getIconPath(32),
      },
    }),
  ]);
}

// Sets up badge notifications background color
browser.action.setBadgeBackgroundColor({ color: "#000" });

browser.runtime.onMessage.addListener((message) => {
  const { [message.type]: handler } = messageHandlers;

  if (handler == null) {
    throw new RangeError();
  }

  return handler(...message.args);
});

// browser.alarms.create("test", { periodInMinutes: 0.05 });

browser.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "updateLiveStream") {
    updateLiveStreams();
  }
});

// stores.accessToken.onChange(() => {
//   refresh(false, true);
// });

stores.liveStreams.onChange(async () => {
  if ((await stores.liveStreams.get()).isLoading === false) {
    refreshActionBadge();
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

    if (tab.url?.startsWith(process.env.TWITCH_REDIRECT_URI as string)) {
      const accessToken = hashParams.get("access_token");

      if (accessToken) {
        const twitch = await stores.twitchProfile.get();
        twitch.accessToken = accessToken;
        // Set twitch token
        await stores.twitchProfile.set(twitch);

        const user = await Twitch.getCurrentUser();
        twitch.id = user.id;
        twitch.name = user.display_name;
        twitch.avatar = user.profile_image_url;
        // Set user data
        await stores.twitchProfile.set(twitch);
      }
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

async function backup(): Promise<Dictionary<StoreState<unknown>>> {
  const settings = await stores.settings.getState();

  return { settings };
}

async function restore(data: StoreState<Settings>): Promise<void> {
  const restoreStore = async (store: Store<any>) => {
    const state = get(data, store.name);

    if (state) {
      await store.restore(state);
    }
  };

  await restoreStore(stores.settings);
}

async function reset(): Promise<void> {
  await Promise.allSettled([
    browser.storage.local.clear(),
    browser.storage.managed.clear(),
    browser.storage.sync.clear(),
  ]);

  await setup(true);
  browser.runtime.reload();
}

async function setup(migrate = false): Promise<void> {
  const allStores = Object.values(stores);
  await settlePromises(allStores, (store: Store<any>) => store.setup(migrate));
}
