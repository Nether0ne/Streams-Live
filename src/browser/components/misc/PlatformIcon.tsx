import { FC } from "react";
import { PlatformName } from "@/common/types/platform";
import TwitchIcon from "../icons/platforms/Twitch";
import GoodgameIcon from "../icons/platforms/Goodgame";
import { SxProps } from "@mui/material";
import TrovoIcon from "../icons/platforms/Trovo";

interface PlatformIconProps {
  readonly platformName: PlatformName;
  readonly sx?: SxProps;
}

const PlatformIcon: FC<PlatformIconProps> = ({ platformName, sx }) => {
  return platformName === PlatformName.TWITCH ? (
    <TwitchIcon {...{ sx }} />
  ) : platformName === PlatformName.GOODGAME ? (
    <GoodgameIcon {...{ sx }} />
  ) : // TODO: Add more platforms
  // ) : platformName === PlatformName.TROVO ? (
  //   <TrovoIcon {...{ sx }} />
  // ) : platformName === PlatformName.WASD ? (
  //   <>WASD</>
  null;
};

export default PlatformIcon;
