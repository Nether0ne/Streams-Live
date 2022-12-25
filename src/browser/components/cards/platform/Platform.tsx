import { FC } from "react";
import { PlatformName, PlatformType } from "@/common/types/platform";
import AuthPlatform from "./variants/auth/AuthPlatform";
import GeneralPlatform from "./variants/general/GeneralPlatform";

interface PlatformProps {
  readonly platformName: PlatformName;
  readonly platformType: PlatformType;
}

const PlatformCard: FC<PlatformProps> = ({ platformName, platformType }) => {
  if (platformType === PlatformType.AUTH) {
    return <AuthPlatform {...{ platformName }} />;
  }
  return <GeneralPlatform {...{ platformName }} />;
};

export default PlatformCard;
