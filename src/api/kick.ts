import { stores } from "@/common/store";
import { PlatformName } from "@/common/types/platform";
import { Stream } from "@/common/types/stream";
import ky from "ky";
import browser from "webextension-polyfill";

const apiUrl = "https://api.kick.com";
const authUrl = "https://id.kick.com/oauth/token";
const publicUrl = "https://kick.com";

const publicApiClient = ky.extend({
  prefixUrl: publicUrl,
  timeout: 700,
  cache: "no-cache",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const sessionTokenCookie = await browser.cookies.get({
          url: publicUrl,
          name: "session_token",
        });
        const decodedTokenValue = decodeURI(sessionTokenCookie.value);
        request.headers.set("Authorization", `Bearer ${decodedTokenValue}`);
      },
    ],
  },
});

const apiClient = ky.extend({
  prefixUrl: apiUrl,
  cache: "no-cache",
  hooks: {
    beforeRequest: [
      async (request) => {
        const kick = await stores.kick.get();
        const { accessToken } = kick;

        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);

          return;
        }
      },
    ],
    afterResponse: [
      async (_input, _options, response) => {
        if (response.status !== 401) return response;
        // If 401 received - try to update the access token
        const kick = await stores.kick.get();
        const { accessToken, expiresIn } = kick;

        if (expiresIn && expiresIn > new Date().getTime()) {
          kick.accessToken = undefined;
          await stores.kick.set(kick);
        }

        const { refreshToken } = kick;
        if (!refreshToken) {
          kick.accessToken = undefined;
          kick.refreshToken = undefined;
          kick.expiresIn = undefined;
          await stores.kick.set(kick);

          return;
        }

        const updatedAuth = await getUpdatedAuth(refreshToken);
        await stores.kick.set({
          ...kick,
          ...updatedAuth,
        });

        return response;
      },
    ],
  },
});

export async function getStreams(): Promise<Stream[]> {
  const liveFollowedChannels = await getLiveFollowedChannels();
  const streamsPromises = liveFollowedChannels.map(
    async (channel) => await getChannelData(channel)
  );
  const streamsData = await Promise.all(streamsPromises);
  const streams: Stream[] = streamsData.map((data) => ({
    id: data.slug,
    user_id: data.slug,
    user: data.slug,
    game: data.category.name,
    title: data.stream_title,
    thumbnail: data.stream.thumbnail,
    viewers: data.stream.viewer_count,
    startedAt: data.stream.start_time,
    type: "live",
    platform: PlatformName.KICK,
  }));

  return streams;
}

type FollowedChannelData = {
  is_live: boolean;
  channel_slug: string;
};

async function getLiveFollowedChannels(): Promise<string[]> {
  const response = await publicApiClient("api/v2/channels/followed").json<{
    channels: FollowedChannelData[];
  }>();
  const slugs = response.channels
    .filter(({ is_live }) => is_live)
    .map(({ channel_slug }) => channel_slug);

  return slugs;
}

type ChannelDataResponse = {
  data: [ChannelData];
};

type ChannelData = {
  slug: string;
  stream: {
    start_time: string;
    viewer_count: number;
    thumbnail: string;
  };
  stream_title: string;
  category: {
    name: string;
  };
};

async function getChannelData(channelSlug: string): Promise<ChannelData> {
  const searchParams = new URLSearchParams();
  searchParams.set("slug", channelSlug);
  const channelResponse = await apiClient("public/v1/channels", {
    searchParams,
  }).json<ChannelDataResponse>();
  const [channel] = channelResponse.data;

  return channel;
}

type UserResponse = {
  data: [UserData];
};

type UserData = {
  name: string;
  profile_picture: string;
  user_id: string;
};

export async function getCurrentUser() {
  const userResponse = await apiClient("public/v1/users").json<UserResponse>();
  const [user] = userResponse.data;

  const profile = {
    id: user.user_id,
    name: user.name,
    avatar: user.profile_picture,
  };

  return profile;
}

type KickAuth = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export async function getAuth(code: string, codeVerifier: string) {
  const authBody = new URLSearchParams();
  authBody.append("code", code);
  authBody.append("client_id", process.env.KICK_CLIENT_ID as string);
  authBody.append("client_secret", process.env.KICK_CLIENT_SECRET as string);
  authBody.append("redirect_uri", process.env.AUTH_REDIRECT_URI as string);
  authBody.append("grant_type", "authorization_code");
  authBody.append("code_verifier", codeVerifier);
  const authData = await ky
    .post(authUrl, {
      body: authBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
      },
    })
    .json<KickAuth>();

  return {
    accessToken: authData.access_token,
    refreshToken: authData.refresh_token,
    expiresIn: getAdjustedTokenExpireTime(authData.expires_in),
  };
}

async function getUpdatedAuth(refreshToken: string) {
  const authBody = new URLSearchParams();
  authBody.append("refresh_token", refreshToken);
  authBody.append("client_id", process.env.KICK_CLIENT_ID as string);
  authBody.append("client_secret", process.env.KICK_CLIENT_SECRET as string);
  authBody.append("grant_type", "refresh_token");
  const authData = await ky
    .post(authUrl, {
      body: authBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
      },
    })
    .json<KickAuth>();

  return {
    accessToken: authData.access_token,
    refreshToken: authData.refresh_token,
    expiresIn: getAdjustedTokenExpireTime(authData.expires_in),
  };
}

function getAdjustedTokenExpireTime(expiresIn: number) {
  return expiresIn * 1000 + new Date().getTime();
}
