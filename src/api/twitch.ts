import { objectToUrlParams } from "@/common/helpers";
import { stores } from "@/common/store";
import { TwitchProfile } from "@/common/types/api/twitch";
import { TwitchStream } from "@/common/types/api/twitch";
import { FollowedStreamer, PlatformName, UserData } from "@/common/types/platform";
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

export async function getStreams(): Promise<Stream[]> {
  const followedStreams = await getFollowedStreams();
  const streamers = await getGeneralStreams(map(followedStreams, "user_id"));

  for (const stream of streamers) {
    const s = find(streamers, {
      user_id: stream.id,
    });

    if (s == null) {
      stream.type = "rerun";
    }
  }

  const fetchedStreams: Stream[] = [];

  for (const stream of streamers) {
    if (stream.user_name === "") {
      continue;
    }

    fetchedStreams.push({
      id: stream.user_login,
      user: stream.user_name,
      user_id: stream.user_id,
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

export async function getFollowedStreamers(after?: string): Promise<FollowedStreamer[]> {
  const settings = await stores.twitch.get();
  if (!(settings.data && settings.data.id)) {
    return [];
  }

  const userId = settings.data.id;

  if (!userId) {
    return [];
  }

  const followsParams = objectToUrlParams({
    from_id: userId,
    first: 100,
    after,
  });

  const { data: follows } = await apiClient("users/follows", {
    searchParams: followsParams,
  }).json<{
    data: TwitchProfile[];
  }>();

  const usersParams = objectToUrlParams({
    id: map(follows, "to_id"),
    first: 100,
    after,
  });

  const { data: followedStreamers } = await apiClient("users", {
    searchParams: usersParams,
  }).json<{
    data: TwitchProfile[];
  }>();

  const streamers: FollowedStreamer[] = [];

  for (const channel of followedStreamers) {
    const { id, display_name, profile_image_url } = channel;

    streamers.push({
      id: id,
      name: display_name,
      avatar: profile_image_url,
    });
  }

  if (streamers.length === 100) {
    streamers.push(
      ...(await getFollowedStreamers(followedStreamers[followedStreamers.length - 1].id))
    );
  }

  return streamers;
}

async function getFollowedStreams(after?: string): Promise<TwitchStream[]> {
  const settings = await stores.twitch.get();

  if (!(settings.data && settings.data.id)) {
    return [];
  }

  const userId = settings.data.id;
  if (!userId) {
    return [];
  }

  const streamsParams = objectToUrlParams({
    user_id: userId,
    first: 100,
    after,
  });

  const { data: streams } = await apiClient("streams/followed", {
    searchParams: streamsParams,
  }).json<{
    data: TwitchStream[];
  }>();

  if (streams.length === 100) {
    streams.push(...(await getFollowedStreams(streams[streams.length - 1].id)));
  }

  return streams;
}

async function getGeneralStreams(streamers: string[], after?: string): Promise<TwitchStream[]> {
  const settings = await stores.twitch.get();

  if (!(settings.data && settings.data.id)) {
    return [];
  }

  const userId = settings.data.id;
  if (!userId) {
    return [];
  }

  const streamsParams = objectToUrlParams({
    user_id: streamers,
    first: 100,
    after,
  });

  const { data: streams } = await apiClient("streams", { searchParams: streamsParams }).json<{
    data: TwitchStream[];
  }>();

  if (streams.length === 100) {
    streams.push(...(await getGeneralStreams(streamers, streams[streams.length - 1].id)));
  }

  return streams;
}
