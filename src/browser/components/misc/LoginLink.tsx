import { PlatformName } from "@/common/types/platform";
import { Link } from "@mui/material";
import { FC } from "react";

interface LoginLinkProps {
  readonly platformName: PlatformName;
  readonly children: JSX.Element[] | JSX.Element;
  readonly style?: object;
}

const platformToData = {
  [PlatformName.TWITCH]: {
    href: "https://id.twitch.tv/oauth2/authorize",
    client: process.env.TWITCH_CLIENT_ID,
    redirect: process.env.TWITCH_REDIRECT_URI,
    scopes: ["user:read:follows"],
    response_type: "token",
    optional: undefined,
  },
  [PlatformName.GOODGAME]: {
    // TODO: we don't need auth for goodgame
    href: "https://api2.goodgame.ru/oauth/authorize",
    client: process.env.GOODGAME_CLIENT_ID,
    redirect: "", //process.env.GOODGAME_REDIRECT_URI,
    scopes: ["user.favorites"],
    response_type: "token",
    optional: {
      state: process.env.GOODGAME_CLIENT_SECRET,
    },
  },
  // TODO: Add more platforms
  // [PlatformName.TROVO]: {
  //   // TODO: we don't need auth for trovo
  //   href: "https://api2.goodgame.ru/oauth/authorize",
  //   client: process.env.GOODGAME_CLIENT_ID,
  //   redirect: "", //process.env.GOODGAME_REDIRECT_URI,
  //   scopes: ["user.favorites"],
  //   response_type: "token",
  //   optional: {
  //     state: process.env.GOODGAME_CLIENT_SECRET,
  //   },
  // },
  // [PlatformName.WASD]: {
  //   // TODO: we don't need auth for wasd
  //   href: "https://api2.goodgame.ru/oauth/authorize",
  //   client: process.env.GOODGAME_CLIENT_ID,
  //   redirect: "", //process.env.GOODGAME_REDIRECT_URI,
  //   scopes: ["user.favorites"],
  //   response_type: "token",
  //   optional: {
  //     state: process.env.GOODGAME_CLIENT_SECRET,
  //   },
  // },
};

const getLoginLink = (platformName: PlatformName) => {
  const linkData = platformToData[platformName];
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

const LoginLink: FC<LoginLinkProps> = ({ platformName, children, style }) => {
  const href = getLoginLink(platformName);
  return (
    <Link href={href} target={"_blank"} style={{ ...styles, ...style }}>
      {children}
    </Link>
  );
};

export default LoginLink;
