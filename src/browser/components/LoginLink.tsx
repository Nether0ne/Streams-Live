import { Platform } from "@/common/types/general";
import { Link } from "@mui/material";
import { FC } from "react";

interface LoginLinkProps {
  platform: Platform;
  children: JSX.Element[] | JSX.Element;
  style?: object;
}

const platformToData = {
  [Platform.TWITCH]: {
    href: "https://id.twitch.tv/oauth2/authorize",
    client: process.env.TWITCH_CLIENT_ID,
    redirect: process.env.TWITCH_REDIRECT_URI,
    scopes: ["user:read:follows"],
    response_type: "token",
    optional: undefined,
  },
  // [Platform.YOUTUBE]: {
  //   href: "https://accounts.google.com/o/oauth2/v2/auth",
  //   client: process.env.YOUTUBE_CLIENT_ID,
  //   redirect: process.env.YOUTUBE_REDIRECT_URI,
  //   scopes: [
  //     "https://www.googleapis.com/auth/youtube.readonly",
  //     "https://www.googleapis.com/auth/userinfo.profile",
  //   ],
  // },
  [Platform.GOODGAME]: {
    href: "https://api2.goodgame.ru/oauth/authorize",
    client: process.env.GOODGAME_CLIENT_ID,
    redirect: "", //process.env.GOODGAME_REDIRECT_URI,
    scopes: ["user.favorites"],
    response_type: "token",
    optional: {
      state: process.env.GOODGAME_CLIENT_SECRET,
    },
  },
};

const getLoginLink = (platform: Platform) => {
  const linkData = platformToData[platform];
  const url = new URL(linkData.href);

  url.searchParams.set("client_id", linkData.client as string);
  url.searchParams.set("redirect_uri", linkData.redirect as string);
  url.searchParams.set("response_type", linkData.response_type as string);
  url.searchParams.set("scope", linkData.scopes.map((scope) => `${scope}`).join(" "));

  if (linkData.optional !== undefined) {
    for (const [key, value] of Object.entries(linkData.optional)) {
      url.searchParams.set(key, value as string);
    }
  }

  return url.href;
};

const styles = {
  color: "inherit",
  textDecoration: "inherit",
  width: "100%",
  height: "100%",
};

const LoginLink: FC<LoginLinkProps> = ({ platform, children, style }) => {
  const href = getLoginLink(platform);
  return (
    <Link href={href} target={"_blank"} style={{ ...styles, ...style }}>
      {children}
    </Link>
  );
};

export default LoginLink;
