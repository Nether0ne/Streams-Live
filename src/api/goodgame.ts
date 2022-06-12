import { stores } from "@/common/store";
import { GoodgameProfile, GoodgameStream } from "@/common/types/api/goodgame";
import { FollowedStreamer, PlatformName } from "@/common/types/platform";
import { Stream } from "@/common/types/stream";
import ky from "ky";

const favoritesApi = "https://goodgame.ru/api/4/favorites/";

const apiClient = ky.extend({
  timeout: 700,
  cache: "no-cache",
  headers: {
    "Client-ID": process.env.GOODGAME_CLIENT_ID,
    Application: "json",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        request.headers.set("Content-Type", "application/x-www-form-urlencoded");
      },
    ],
    afterResponse: [
      async (input, options, response) => {
        if (response.status === 401) {
          const goodgame = await stores.goodgame.get();
          goodgame.accessToken = undefined;
          await stores.goodgame.set(goodgame);
        }

        return response;
      },
    ],
  },
});

export async function getFollowedStreamers(): Promise<FollowedStreamer[]> {
  const favoriteChannels = await apiClient(favoritesApi).json<GoodgameProfile[]>();
  const streamers = [];

  for (const channel of favoriteChannels) {
    const { id, streamer } = channel;
    const { nickname, avatar } = streamer;

    streamers.push({
      id: id,
      name: nickname,
      avatar: `https://goodgame.ru/${avatar.replace("\\", "")}`,
    });
  }

  return streamers;
}

export async function getStreams(): Promise<Stream[]> {
  const favoriteChannels = await apiClient(favoritesApi).json<GoodgameStream[]>();
  const streams: Stream[] = [];

  for (const channel of favoriteChannels) {
    const { id, streamkey, channelkey, broadcast, title, game, preview, online, viewers } = channel;

    if (
      online !== 0 &&
      ((broadcast && typeof broadcast !== "boolean") || (!broadcast && viewers > 0))
    ) {
      let startedAt = null;

      if (broadcast && typeof broadcast !== "boolean") {
        startedAt = new Date(broadcast.start * 1000).toISOString();
      }

      streams.push({
        id: streamkey,
        user: channelkey,
        user_id: id,
        game,
        title,
        thumbnail: `https://${preview.substring(2)}`,
        viewers,
        startedAt,
        type: "live",
        platform: PlatformName.GOODGAME,
      });
    }
  }

  return streams;
}
