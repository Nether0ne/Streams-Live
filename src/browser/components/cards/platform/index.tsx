import { FC } from "react";
import { PlatformName, PlatformType } from "@customTypes/platform";
import AuthPlatform from "@cards/platform/variants/auth/AuthPlatform";
import GeneralPlatform from "@cards/platform/variants/general/GeneralPlatform";

interface PlatformProps {
  readonly platformName: PlatformName;
  readonly platformType: PlatformType;
}

const PlatformCard: FC<PlatformProps> = ({ platformName, platformType }) => {
  return platformType === PlatformType.AUTH ? (
    <AuthPlatform {...{ platformName }} />
  ) : (
    <GeneralPlatform {...{ platformName }} />
  );
};

export default PlatformCard;
