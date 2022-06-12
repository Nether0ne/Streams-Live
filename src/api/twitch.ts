import { objectToUrlParams } from "@/common/helpers";
import { stores } from "@/common/store";
import { TwitchProfile } from "@/common/types/api/twitch";
import { TwitchStream } from "@/common/types/api/twitch";
import { PlatformName, UserData } from "@/common/types/platform";
import { Stream } from "@/common/types/stream";
import ky from "ky";
import { find, map } from "lodash-es";

const thumbnailHeight = "54";
const thumbnailWidth = "96";

const apiClient = ky.extend({
  prefixUrl: "https://api.twitch.tv/helix/",
  cache: "no-cache",
  headers: {
    "Client-ID": process.env.TWITCH_CLIENT_ID,
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const accessToken = (await stores.twitch.get()).accessToken;

        // TODO: check if token needs to be refreshed

        if (!accessToken) return;

        request.headers.set("Authorization", `Bearer ${accessToken}`);
      },
    ],
    afterResponse: [
      async (input, options, response) => {
        if (response.status === 401) {
          const twitch = await stores.twitch.get();
          twitch.accessToken = undefined;
          await stores.twitch.set(twitch);
        }

        return response;
      },
    ],
  },
});

export async function getCurrentUser(): Promise<UserData> {
  const twitchProfile = (await apiClient("users").json<{ data: TwitchProfile[] }>()).data[0];
  const { id, display_name, profile_image_url } = twitchProfile;

  const profile = {
    id,
    name: display_name,
    avatar: profile_image_url,
  };

  return profile;
}

export async function getStreams(after?: string): Promise<Stream[]> {
  const settings = await stores.twitch.get();

  if (!(settings.data && settings.data.id)) {
    return [];
  }

  const userId = settings.data.id;
  if (!userId) {
    return [];
  }

  const followedParams = objectToUrlParams({
    user_id: userId,
    first: 100,
    after,
  });

  const { data: followedStreams } = await apiClient("streams/followed", {
    searchParams: followedParams,
  }).json<{
    data: TwitchStream[];
  }>();

  const streamsParams = objectToUrlParams({
    user_id: map(followedStreams, "user_id"),
    first: 100,
  });

  const { data: streams } = await apiClient("streams", { searchParams: streamsParams }).json<{
    data: TwitchStream[];
  }>();

  for (const followedStream of followedStreams) {
    const stream = find(streams, {
      user_id: followedStream.user_id,
    });

    if (stream == null) {
      followedStream.type = "rerun";
    }
  }

  const fetchedStreams: Stream[] = [];

  for (const stream of followedStreams) {
    if (stream.user_name === "") {
      continue;
    }

    fetchedStreams.push({
      id: stream.user_login,
      user: stream.user_name,
      game: stream.game_name,
      title: stream.title,
      thumbnail: stream.thumbnail_url
        .replace("{width}", thumbnailWidth)
        .replace("{height}", thumbnailHeight),
      viewers: stream.viewer_count,
      startedAt: stream.started_at,
      type: stream.type,
      platform: PlatformName.TWITCH,
    });
  }

  return fetchedStreams;
}
