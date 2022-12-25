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
  const [platform, store] = usePlatform(platformName);
  const { data } = platform;

  if (store.isLoading) {
    return <PlatformLoading />;
  }

  if (platform.enabled && data) {
    return <SetAuthProfile {...{ platformName }} />;
  }

  return <UnsetAuthProfile {...{ platformName }} />;
};

export default AuthPlatform;
