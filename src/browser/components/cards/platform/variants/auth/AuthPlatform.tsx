import { usePlatform } from "@hooks/platform";
import { PlatformName } from "@customTypes/platform";
import { FC } from "react";
import PlatformLoading from "@layout/Loading";
import SetAuthProfile from "@cards/platform/variants/auth/Set";
import UnsetAuthProfile from "@cards/platform/variants/auth/Unset";

interface AuthPlatformProps {
  readonly platformName: PlatformName;
}

const AuthPlatform: FC<AuthPlatformProps> = ({ platformName }) => {
  const [platform, { isLoading }] = usePlatform(platformName);
  const { data } = platform;

  return isLoading ? (
    <PlatformLoading />
  ) : platform.enabled && data ? (
    <SetAuthProfile {...{ platformName }} />
  ) : (
    <UnsetAuthProfile {...{ platformName }} />
  );
};

export default AuthPlatform;
