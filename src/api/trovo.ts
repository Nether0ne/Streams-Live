import { stores } from "@/common/store";
import { GoodgameProfile, GoodgameStream } from "@/common/types/api/goodgame";
import { FollowedStreamer, PlatformName } from "@/common/types/platform";
import { Stream } from "@/common/types/stream";
import ky from "ky";

// Note: commented until trovo client id is (or if) received

// const apiClient = ky.extend({
//   prefixUrl: "https://open-api.trovo.live/openplatform/",
//   cache: "no-cache",
//   headers: {
//     "Client-ID": process.env.GOODGAME_CLIENT_ID,
//     Application: "json",
//   },
// });

// export async function getFollowedStreamers(): Promise<FollowedStreamers[]> {
//   const favoriteChannels = await apiClient(favoritesApi).json<GoodgameProfile[]>();
//   const streamers = [];

//   for (const channel of favoriteChannels) {
//     const { id, streamer } = channel;
//     const { nickname, avatar } = streamer;

//     streamers.push({
//       id: id,
//       name: nickname,
//       avatar: `https://goodgame.ru/${avatar.replace("\\", "")}`,
//     });
//   }

//   return streamers;
// }

// export async function getStreams(after?: string): Promise<Stream[]> {
//   const favoriteChannels = await apiClient(favoritesApi).json<GoodgameStream[]>();
//   const streams: Stream[] = [];

//   for (const channel of favoriteChannels) {
//     const { streamkey, channelkey, broadcast, title, game, preview, online, viewers } = channel;

//     if (
//       online !== 0 &&
//       ((broadcast && typeof broadcast !== "boolean") || (!broadcast && viewers > 0))
//     ) {
//       let startedAt = null;

//       if (broadcast && typeof broadcast !== "boolean") {
//         startedAt = new Date(broadcast.start * 1000).toISOString();
//       }

//       streams.push({
//         id: streamkey,
//         user: channelkey,
//         game,
//         title,
//         thumbnail: `https://${preview.substring(2)}`,
//         viewers,
//         startedAt,
//         type: "live",
//         platform: PlatformName.GOODGAME,
//       });
//     }
//   }

//   return streams;
// }
