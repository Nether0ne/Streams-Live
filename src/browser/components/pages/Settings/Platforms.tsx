import Platform from "@cards/platform";
import { PlatformName, PlatformsTypeMap } from "@customTypes/platform";
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
