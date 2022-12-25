import browser from "webextension-polyfill";
import { stores } from "@/common/store";
import { Stream } from "@/common/types/stream";
import { find } from "lodash";
import { createNotification, getIconPath } from "./misc";
import { t } from "@/common/helpers";
import { getPlatformClient, getAllSetPlatforms } from "./platform";
import { NotificationType } from "@/common/types/general";
import { FollowedStreamer } from "@/common/types/platform";

export async function updateStreams(forceUpdate: boolean = false) {
  const settings = await stores.settings.get();
  const notificationsEnabled = settings.notifications.enabled;

  const previousStreams = (await stores.streams.get()).data;

  if (forceUpdate) {
    browser.alarms.clear("updateStreams");
    await stores.streams.set({ data: [], isLoading: true });
  }

  const [updatedStreams, errors] = await getAllStreams();

  await stores.streams.set({ data: updatedStreams, isLoading: false });

  if (!forceUpdate && notificationsEnabled) {
    await updateFollowedStreamers();
    const withCategoryChange = settings.notifications.category;

    updatedStreams.forEach(async (stream) => {
      if (settings.notifications[stream.platform]) {
        const notified = find(previousStreams, ["user", stream.user]);
        const followedStreamer = (await stores[`${stream.platform}`].get()).followedStreamers.find(
          (streamer) => streamer.id === stream.user_id
        );

        if (!notified) {
          newStreamNotification(stream, followedStreamer);
        }

        if (notified && withCategoryChange) {
          newCategoryNotification(notified, stream, followedStreamer);
        }
      }
    });
  }

  if (forceUpdate) {
    browser.alarms.create("updateStreams", { periodInMinutes: 1 });
  }
}

const updateFollowedStreamers = async (): Promise<void> => {
  const setProfiles = await getAllSetPlatforms();

  for (const profile of setProfiles) {
    const client = getPlatformClient(profile);

    if (client && "getFollowedStreamers" in client) {
      try {
        const followedStreamers = await client.getFollowedStreamers();
        const store = await stores[`${profile.name}`].get();
        store.followedStreamers = followedStreamers;
        await stores[`${profile.name}`].set(store);
      } catch (e: unknown) {
        console.log(e);
      }
    }
  }
};

const getAllStreams = async (): Promise<[Stream[], string[]]> => {
  const setProfiles = await getAllSetPlatforms();
  const updateStreamsQueries = [];

  for (const profile of setProfiles) {
    const client = getPlatformClient(profile);

    if (client && "getStreams" in client) {
      updateStreamsQueries.push(client.getStreams());
    }
  }

  const errors: string[] = [];

  return [
    (await Promise.allSettled(updateStreamsQueries))
      .map((query) => {
        if (query.status === "fulfilled") {
          return query.value;
        } else if (query.status === "rejected") {
          errors.push(query.reason);
        }
        return [];
      })
      .flat(),
    errors,
  ];
};

const newStreamNotification = async (
  stream: Stream,
  followedStreamer?: FollowedStreamer
): Promise<void> => {
  const { user, game, title, platform } = stream;
  const icon =
    followedStreamer && followedStreamer.avatar ? followedStreamer.avatar : await getIconPath(128);

  createNotification([NotificationType.STREAM, JSON.stringify(stream)], {
    title: t("streamerOnline", [user, platform]),
    message: game ?? t("noCategory"),
    contextMessage: title,
    type: "basic",
    iconUrl: icon,
  });
};

const newCategoryNotification = async (
  oldStream: Stream,
  newStream: Stream,
  followedStreamer?: FollowedStreamer
): Promise<void> => {
  const { user, game, title } = newStream;
  const icon =
    followedStreamer && followedStreamer.avatar ? followedStreamer.avatar : await getIconPath(128);

  if (oldStream.game !== game) {
    createNotification([NotificationType.STREAM, JSON.stringify(newStream)], {
      title: t("streamerNewCategory", user),
      message: t("streamerNewCategoryMessage", [oldStream.game, game || t("noCategory")]),
      contextMessage: title,
      type: "basic",
      iconUrl: icon,
    });
  }
};
