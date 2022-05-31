import { stores } from "@/common/store";
import { GoodgameProfile, GoodgameStream } from "@/common/types/api/goodgame";
import { Platform } from "@/common/types/general";
import { Profile } from "@/common/types/profile";
import { Stream } from "@/common/types/stream";
import ky from "ky";

const mainApi = "https://api2.goodgame.ru/";
const favoritesApi = "https://goodgame.ru/api/4/favorites/";

const apiClient = ky.extend({
  timeout: 600,
  cache: "no-cache",
  headers: {
    "Client-ID": process.env.GOODGAME_CLIENT_ID,
    Application: "json",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const accessToken = (await stores.goodgameProfile.get()).accessToken;

        // TODO: check if token needs to be refreshed

        if (!accessToken) return;

        request.headers.set("Authorization", `Bearer ${accessToken}`);
        request.headers.set("Content-Type", "application/x-www-form-urlencoded");
      },
    ],
    afterResponse: [
      async (input, options, response) => {
        // if (response.status === 401) {
        //   const goodgame = await stores.goodgameProfile.get();
        //   goodgame.accessToken = undefined;
        //   await stores.goodgameProfile.set(goodgame);
        // }

        return response;
      },
    ],
  },
});

export async function getCurrentUser(): Promise<Partial<Profile>> {
  const info = await apiClient(`${mainApi}info`).json<GoodgameProfile>();

  const { user } = info;
  const { user_id, username } = user;

  const profile = {
    id: user_id,
    name: username,
    platform: Platform.GOODGAME,
  };

  return profile;
}

export async function getStreams(after?: string): Promise<Stream[]> {
  const favoriteChannels = await apiClient(favoritesApi).json<GoodgameStream[]>();
  const streams: Stream[] = [];

  for (const channel of favoriteChannels) {
    const { channelkey, broadcast, title, game, preview, status, viewers } = channel;

    if (status && broadcast && typeof broadcast !== "boolean") {
      const startedAt = new Date(broadcast.start * 1000).toISOString();

      streams.push({
        user: channelkey,
        userLogin: channelkey,
        game,
        title,
        thumbnail: `https://${preview.substring(2)}`,
        viewers,
        startedAt,
        type: "live",
        platform: Platform.GOODGAME,
      });
    }
  }

  return streams;
}
