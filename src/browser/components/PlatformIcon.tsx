import { FC } from "react";
import { Platform } from "@/common/types/general";
import TwitchIcon from "./icons/Twitch";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GoodgameIcon from "./icons/Goodgame";

interface PlatformIconProps {
  platform: Platform;
}

const PlatformIcon: FC<PlatformIconProps> = ({ platform }) => {
  return platform === Platform.TWITCH ? (
    <TwitchIcon />
  ) : platform === Platform.YOUTUBE ? (
    <YouTubeIcon />
  ) : platform === Platform.GOODGAME ? (
    <GoodgameIcon />
  ) : null;
};

export default PlatformIcon;
