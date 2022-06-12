import Platform from "@/browser/components/cards/platform/Platform";
import { PlatformName, PlatformsTypeMap } from "@/common/types/platform";
import { Box } from "@mui/material";
import { FC } from "react";

const supportedPlatforms = Object.values(PlatformName);

const PlatformsSettings: FC = () => {
  return (
    <Box>
      {supportedPlatforms.map((platformName) => (
        <Platform {...{ platformName, platformType: PlatformsTypeMap[platformName] }} />
      ))}
    </Box>
  );
};

export default PlatformsSettings;
