import { sendRuntimeMessage, t } from "@common/helpers";
import { Box } from "@mui/material";
import { FC } from "react";
import FontSizeSetting from "@pages/Settings/options/general/FontSize";
import ThemeSettings from "@pages/Settings/options/general/Theme";

import LabelIcon from "@mui/icons-material/Label";
import SwitchSettings from "@pages/Settings/options/Switch";

const styles = {
  display: "flex",
  flexDirection: "column",
};

const GeneralSettings: FC = () => {
  const onBadgeChange = async () => await sendRuntimeMessage("updateBadge");

  return (
    <Box id="general" sx={styles}>
      <FontSizeSetting />
      <ThemeSettings />
      <SwitchSettings
        {...{
          id: "badge",
          label: t("badge"),
          icon: <LabelIcon />,
          secondaryText: true,
          setting: "general.badge",
          onClick: onBadgeChange,
        }}
      />
    </Box>
  );
};

export default GeneralSettings;
