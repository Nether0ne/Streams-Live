import { Box } from "@mui/material";
import { FC } from "react";
import ExportSetting from "./options/extra/Export";
import ImportSetting from "./options/extra/Import";
import ResetSetting from "./options/extra/Reset";

const ExtraSettings: FC = () => {
  return (
    <Box>
      <ExportSetting />
      <ImportSetting />
      <ResetSetting />
    </Box>
  );
};

export default ExtraSettings;
