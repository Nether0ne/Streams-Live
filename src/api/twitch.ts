import { objectToUrlParams } from "@/common/helpers";
import { stores } from "@/common/store";
import { TwitchProfile } from "@/common/types/api/twitch";
import { TwitchStream } from "@/common/types/api/twitch";
import { Platform } from "@/common/types/general";
import { Profile } from "@/common/types/profile";
import { Stream } from "@/common/types/stream";
import ky from "ky";
import { find, map } from "lodash-es";

const apiClient = ky.extend({
  timeout: 700,
  prefixUrl: "https://api.twitch.tv/helix/",
  cache: "no-cache",
  headers: {
    "Client-ID": process.env.TWITCH_CLIENT_ID,
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const accessToken = (await stores.twitchProfile.get()).accessToken;

        // TODO: check if token needs to be refreshed

        if (!accessToken) return;

        request.headers.set("Authorization", `Bearer ${accessToken}`);
      },
    ],
    afterResponse: [
      async (input, options, response) => {
        if (response.status === 401) {
          const twitch = await stores.twitchProfile.get();
          twitch.accessToken = undefined;
          await stores.twitchProfile.set(twitch);
        }

        return response;
      },
    ],
  },
});

export async function getCurrentUser(): Promise<Partial<Profile>> {
  const twitchProfile = (await apiClient("users").json<{ data: TwitchProfile[] }>()).data[0];
  const { id, display_name, profile_image_url } = twitchProfile;

  const profile = {
    id,
    name: display_name,
    avatar: profile_image_url,
    platform: Platform.TWITCH,
  };

  return profile;
}

export async function getStreams(after?: string): Promise<Stream[]> {
  const userId = (await stores.twitchProfile.get()).id;
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
      thumbnail: stream.thumbnail_url,
      viewers: stream.viewer_count,
      startedAt: stream.started_at,
      type: stream.type,
      platform: Platform.TWITCH,
    });
  }

  return fetchedStreams;
}
