import { stores } from "@/common/store";
import { Stream } from "@/common/types/stream";
import { find } from "lodash";
import { createNotification } from "../misc/createNotification";
import { getIconPath } from "../misc/getIcon";
import { t } from "@/common/helpers";
import { getAllSetProfiles } from "../profiles/getAllSetupProfiles";
import { getPlatformClient } from "../platform/getPlatformClient";

export async function updateStreams(forceUpdate: boolean = false) {
  console.log(`updated at ${new Date().toLocaleString()}`);

  const settings = await stores.settings.get();
  const notificationsEnabled = settings.notifications.enabled;

  const previousStreams = (await stores.streams.get()).data;

  if (forceUpdate) {
    console.log("force update");
    await stores.streams.set({ data: [], isLoading: true });
  }

  const updatedStreams = await getAllStreams();

  await stores.streams.set({ data: updatedStreams, isLoading: false });

  if (!forceUpdate && notificationsEnabled) {
    const withCategoryChange = settings.notifications.category;

    updatedStreams.forEach(async (stream) => {
      const notified = find(previousStreams, ["user", stream.user]);

      if (!notified) {
        newStreamNotification(stream);
      }

      if (notified && withCategoryChange) {
        newCategoryNotification(notified, stream);
      }
    });
  }
}

const getAllStreams = async (): Promise<Stream[]> => {
  const setProfiles = await getAllSetProfiles();
  const queries = [];

  for (const profile of setProfiles) {
    const client = getPlatformClient(profile.platform);

    if (client) {
      queries.push(client.getStreams());
    }
  }

  return (await Promise.allSettled(queries))
    .map((query) => {
      if (query.status === "fulfilled") {
        return query.value;
      } else if (query.status === "rejected") {
        console.error(query.reason);
      }
      return [];
    })
    .flat();
};

const newStreamNotification = async (stream: Stream): Promise<void> => {
  const { user, userLogin, game, title, platform } = stream;

  createNotification(user, {
    title: t("streamerOnline", [user ?? userLogin, platform]),
    message: title,
    contextMessage: game ?? "",
    type: "basic",
    iconUrl: await getIconPath(128),
  });
};

const newCategoryNotification = async (oldStream: Stream, newStream: Stream): Promise<void> => {
  const { user, userLogin, game, title } = newStream;
  if (oldStream.game !== game) {
    createNotification(user, {
      title: t("streamerNewCategory", user ?? userLogin),
      message: t("streamerNewCategoryMessage", [oldStream.game, game]),
      contextMessage: title,
      type: "basic",
      iconUrl: await getIconPath(128),
    });
  }
};
