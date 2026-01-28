import { FC } from "react";
import { PlatformName } from "@/common/types/platform";
import TwitchIcon from "../icons/platforms/Twitch";
import GoodgameIcon from "../icons/platforms/Goodgame";
import KickIcon from "../icons/platforms/Kick";
import { SxProps } from "@mui/material";

interface PlatformIconProps {
  readonly platformName: PlatformName;
  readonly sx?: SxProps;
}

const PLATFORM_TO_ICON: Record<PlatformName, FC<{ sx?: SxProps }>> = {
  [PlatformName.TWITCH]: TwitchIcon,
  [PlatformName.GOODGAME]: GoodgameIcon,
  [PlatformName.KICK]: KickIcon,
};

const PlatformIcon: FC<PlatformIconProps> = ({ platformName, sx }) => {
  const Icon = PLATFORM_TO_ICON[platformName];

  if (!Icon) return null;

  return <Icon {...{ sx }} />;
};

export default PlatformIcon;
