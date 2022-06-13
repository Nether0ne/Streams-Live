import { usePlatform } from "@/browser/common/hooks/platform";
import { PlatformName } from "@/common/types/platform";
import { FC } from "react";
import PlatformLoading from "./Loading";
import SetAuthProfile from "./Set";
import UnsetAuthProfile from "./Unset";

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
