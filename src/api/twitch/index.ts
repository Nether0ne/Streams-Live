import { stores } from "@/common/store";
import { TwitchProfile } from "@/common/types/profile";
import { TwitchStream } from "@/common/types/stream";
import ky from "ky";
import { Dictionary } from "lodash";
import { castArray, find, map, sortBy } from "lodash-es";

const client = ky.extend({
  prefixUrl: "https://api.twitch.tv/helix/",
  headers: {
    "Client-ID": process.env.TWITCH_CLIENT_ID,
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const accessToken = (await stores.twitchProfile.get()).accessToken;

        if (!accessToken) return;

        request.headers.set("Authorization", `Bearer ${accessToken}`);
      },
    ],
    afterResponse: [
      async (input, options, response) => {
        if (response.status === 401) {
          const twitch = await stores.twitchProfile.get();
          twitch.accessToken = null;
          await stores.twitchProfile.set(twitch);
        }

        return response;
      },
    ],
  },
});

async function request(url: string, params: Dictionary<any> = {}) {
  const searchParams = new URLSearchParams();

  for (const [name, value] of Object.entries(params ?? {})) {
    for (const v of castArray(value)) {
      if (typeof v === "undefined") {
        continue;
      }

      searchParams.append(name, v.toString());
    }
  }

  return client(url, { searchParams }).json<any>();
}

export async function getCurrentUser(): Promise<TwitchProfile> {
  return (await request("users")).data[0];
}

export async function getLiveStreamers(after?: string): Promise<any[]> {
  const userId = (await stores.twitchProfile.get()).id;
  if (!userId) {
    console.log("no user sry");
  }

  const { data: followedStreams } = await request("streams/followed", {
    user_id: userId,
    first: 100,
    after,
  });

  const { data: streams } = await request("streams", {
    user_id: map(followedStreams, "user_id"),
    first: 100,
  });

  for (const followedStream of followedStreams) {
    const stream = find(streams, {
      user_id: followedStream.user_id,
    });

    if (stream == null) {
      followedStream.type = "rerun";
    }
  }

  return followedStreams;
}
