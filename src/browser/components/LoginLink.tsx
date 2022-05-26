import { Platform } from "@/common/types/general";
import { Box, Link } from "@mui/material";
import { FC } from "react";

interface LoginLinkProps {
  platform: Platform;
  children: JSX.Element[] | JSX.Element;
  style?: object;
}

const loginUrl = {
  twitch: "https://id.twitch.tv/oauth2/authorize",
  youtube: "https://accounts.google.com/o/oauth2/v2/auth",
  goodgame: "https://api.goodgame.ru/oauth2/authorize",
};

const getLoginLink = (platform: Platform) => {
  const url = new URL(loginUrl[platform]);

  url.searchParams.set("client_id", process.env.TWITCH_CLIENT_ID as string);
  url.searchParams.set("redirect_uri", process.env.TWITCH_REDIRECT_URI as string);
  url.searchParams.set("response_type", "token");
  url.searchParams.set("scope", "user:read:follows");

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
