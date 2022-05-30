import { objectToUrlParams } from "@/common/helpers";
import { stores } from "@/common/store";
import { YoutubeProfile } from "@/common/types/api/youtube";
import ky from "ky";

const apiClient = ky.extend({
  prefixUrl: "https://www.googleapis.com/youtube/v3/",
  cache: "no-cache",
  hooks: {
    beforeRequest: [
      async (request) => {
        // const accessToken = (await stores.youtubeProfile.get()).accessToken;
        // if (!accessToken) return;
        // request.headers.set("Authorization", `Bearer ${accessToken}`);
      },
    ],
    afterResponse: [
      async (input, options, response) => {
        if (response.status === 401) {
          // const youtube = await stores.youtubeProfile.get();
          // youtube.accessToken = undefined;
          // await stores.youtubeProfile.set(youtube);
        }

        return response;
      },
    ],
  },
});

export async function getCurrentUser(): Promise<YoutubeProfile> {
  const searchParams = objectToUrlParams({
    part: ["snippet"],
    mine: true,
  });

  return (await apiClient("channels", { searchParams }).json<{ items: YoutubeProfile[] }>())
    .items[0];
}

export async function getStreams() {
  /*
  const userId = (await stores.youtubeProfile.get()).id;
  if (!userId) {
    return [];
  }

  const searchParams = objectToUrlParams({
    part: ["snippet"],
    mine: true,
  });

  const { data: followedChannels } = await apiClient("subscriptions", { searchParams }).json<any>();
  */
  /*
   * YouTube API V3 allows us to gather information about followed channels,
   * but it doesn't allow us to gather information about their streams.
   *
   * Therefore it seems not possible to query every followed channel for information
   * about current live stream.
   *
   * We could parse SEO and HTML data to define if channel is live, but it would take
   * too much time and we would lack information about stream anyway.
   */
}
