import { objectToUrlParams } from "@/common/helpers";
import { stores } from "@/common/store";
import { WasdMedia, WasdSearch, WasdSearchChannel } from "@/common/types/api/wasd";
import { FollowedStreamer, PlatformName } from "@/common/types/platform";
import { Stream } from "@/common/types/stream";
import ky from "ky";

const searchApi = "api/search";
const containerApi = "api/media-containers";

const apiClient = ky.extend({
  prefixUrl: "https://wasd.tv/",
  timeout: 700,
  cache: "no-cache",
  headers: {
    Application: "json",
  },
});

// TODO: Add more platforms
// export async function findStreamer(name: string): Promise<FollowedStreamer | null> {
//   let foundStreamer: FollowedStreamer | null = null;

//   const streamerParams = objectToUrlParams({
//     search_phrase: name,
//     limit: 10,
//     offset: 0,
//   });

//   const response = await apiClient(`${searchApi}/channels`, {
//     searchParams: streamerParams,
//   }).json<WasdSearchChannel>();

//   const { count, rows } = response.result;

//   if (count > 0) {
//     const streamer = rows[0];

//     foundStreamer = {
//       id: streamer.channel_id.toString(),
//       name: streamer.channel_name,
//       avatar: streamer.channel_image.small,
//     };
//   }

//   return foundStreamer;
// }

// export async function search(name: string): Promise<FollowedStreamer[]> {
//   const streamerParams = objectToUrlParams({
//     search_phrase: name,
//     limit: 5,
//     offset: 0,
//   });

//   const searchResults: FollowedStreamer[] = [];
//   const response = (await apiClient(searchApi, { searchParams: streamerParams }).json<WasdSearch>())
//     .result;
//   console.log(response);
//   const { count, rows } = response.profiles;

//   if (count > 0) {
//     for (const streamer of rows) {
//       searchResults.push({
//         id: streamer.channel_id.toString(),
//         name: streamer.user_login,
//         avatar: streamer.profile_image.small,
//       });
//     }
//   }

//   return searchResults;
// }

// export async function getFollowedStreamers(): Promise<FollowedStreamer[]> {
//   const wasdStore = await stores[PlatformName.WASD].get();
//   const wasdFollowedStreamers = wasdStore.followedStreamers;

//   const followedStreamersParams = objectToUrlParams({
//     channel_id: wasdFollowedStreamers.map((streamer) => streamer.id),
//   });

//   const followedStreamers = (
//     await apiClient(containerApi, { searchParams: followedStreamersParams }).json<WasdMedia>()
//   ).result;

//   const streamers: FollowedStreamer[] = [];

//   for (const channel of followedStreamers) {
//     const { channel_id, channel_name, channel_image } = channel.media_container_channel;

//     streamers.push({
//       id: channel_id.toString(),
//       name: channel_name,
//       avatar: channel_image.small,
//     });
//   }

//   return streamers;
// }

// export async function getStreams(): Promise<Stream[]> {
//   const wasdStore = await stores[PlatformName.WASD].get();
//   const wasdFollowedStreamers = wasdStore.followedStreamers;

//   const followedStreamersParams = objectToUrlParams({
//     channel_id: wasdFollowedStreamers.map((streamer) => streamer.id),
//     media_container_status: "RUNNING",
//   });

//   const followedStreams = (
//     await apiClient(containerApi, { searchParams: followedStreamersParams }).json<WasdMedia>()
//   ).result;

//   const streams: Stream[] = [];

//   for (const channel of followedStreams) {
//     const { channel_id, channel_name } = channel.media_container_channel;
//     streams.push({
//       id: channel_id.toString(),
//       user: channel_name,
//       game: channel.game.game_name,
//       title: channel.media_container_name,
//       // TODO: handle null thumbnail
//       thumbnail: channel.media_container_preview_url || "",
//       viewers: channel.media_container_priority,
//       startedAt: channel.published_at,
//       type: "live",
//       platform: PlatformName.WASD,
//     });
//   }

//   return streams;
// }
