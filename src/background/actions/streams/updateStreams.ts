import browser from "webextension-polyfill";
import { stores } from "@/common/store";
import { Stream } from "@/common/types/stream";
import { find } from "lodash";
import { createNotification } from "../misc/createNotification";
import { getIconPath } from "../misc/getIcon";
import { t } from "@/common/helpers";
import { getAllSetProfiles } from "../profiles/getAllSetupProfiles";
import { getPlatformClient } from "../platform/getPlatformClient";
import { NotificationType } from "@/common/types/general";

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
    const withCategoryChange = settings.notifications.category;

    updatedStreams.forEach(async (stream) => {
      if (settings.notifications[stream.platform]) {
        const notified = find(previousStreams, ["user", stream.user]);

        if (!notified) {
          newStreamNotification(stream);
        }

        if (notified && withCategoryChange) {
          newCategoryNotification(notified, stream);
        }
      }
    });
  }

  if (forceUpdate) {
    browser.alarms.create("updateStreams", { periodInMinutes: 1 });
  }
}

const getAllStreams = async (): Promise<[Stream[], string[]]> => {
  const setProfiles = await getAllSetProfiles();
  const queries = [];

  for (const profile of setProfiles) {
    const client = getPlatformClient(profile.platform);

    if (client && "getStreams" in client) {
      queries.push(client.getStreams());
    }
  }

  const errors: string[] = [];

  return [
    (await Promise.allSettled(queries))
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

const newStreamNotification = async (stream: Stream): Promise<void> => {
  const { user, userLogin, game, title, platform } = stream;

  createNotification([NotificationType.STREAM, user, platform], {
    title: t("streamerOnline", [user ?? userLogin, platform]),
    message: game ?? "",
    contextMessage: title,
    type: "basic",
    iconUrl: await getIconPath(128),
  });
};

const newCategoryNotification = async (oldStream: Stream, newStream: Stream): Promise<void> => {
  const { user, userLogin, game, title, platform } = newStream;
  if (oldStream.game !== game) {
    createNotification([NotificationType.STREAM, user, platform], {
      title: t("streamerNewCategory", user ?? userLogin),
      message: title,
      contextMessage: t("streamerNewCategoryMessage", [oldStream.game, game]),
      type: "basic",
      iconUrl: await getIconPath(128),
    });
  }
};
