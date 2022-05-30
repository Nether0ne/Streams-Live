import { FC } from "react";
import { Platform } from "@/common/types/general";
import TwitchIcon from "./icons/Twitch";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GoodgameIcon from "./icons/Goodgame";
import { SxProps } from "@mui/material";

interface PlatformIconProps {
  platform: Platform;
  sx?: SxProps;
}

const PlatformIcon: FC<PlatformIconProps> = ({ platform, sx }) => {
  return platform === Platform.TWITCH ? (
    <TwitchIcon {...{ sx }} />
  ) : // ) : platform === Platform.YOUTUBE ? (
  //   <YouTubeIcon {...{ sx }} />
  platform === Platform.GOODGAME ? (
    <GoodgameIcon {...{ sx }} />
  ) : null;
};

export default PlatformIcon;
