import { Box } from "@mui/material";
import { FC } from "react";
import ExportSetting from "@pages/Settings/options/extra/Export";
import ImportSetting from "@pages/Settings/options/extra/Import";
import ResetSetting from "@pages/Settings/options/extra/Reset";

const ExtraSettings: FC = () => {
  return (
    <Box id="extra">
      <ExportSetting />
      <ImportSetting />
      <ResetSetting />
    </Box>
  );
};

export default ExtraSettings;
