import { usePlatform } from "@/browser/common/hooks/platform";
import { PlatformName } from "@/common/types/platform";
import { FC } from "react";
import SetAuthProfile from "./Set";
import UnsetAuthProfile from "./Unset";

interface AuthPlatformProps {
  readonly platformName: PlatformName;
}

const AuthPlatform: FC<AuthPlatformProps> = ({ platformName }) => {
  const [platform] = usePlatform(platformName);
  const { data } = platform;

  return platform.enabled && data ? (
    <SetAuthProfile {...{ platformName }} />
  ) : (
    <UnsetAuthProfile {...{ platformName }} />
  );
};

export default AuthPlatform;
