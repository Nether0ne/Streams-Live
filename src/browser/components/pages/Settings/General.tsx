import { sendRuntimeMessage, t } from "@/common/helpers";
import { Box, Typography, Divider } from "@mui/material";
import { FC } from "react";
import FontSizeSetting from "./options/general/FontSize";
import ThemeSettings from "./options/general/Theme";

import LabelIcon from "@mui/icons-material/Label";
import SwitchSettings from "./options/Switch";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  optionWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    px: 1,
    py: 2,
    transition: "background-color .5s ease-out",
    "&:hover": {
      backgroundColor: "background.paper",
      transition: "background-color .5s ease-out",
    },
  },
  menuItemWrapper: {
    justifyContent: "right",
  },
  menuItemIcon: {
    fontSize: ".75rem",
  },
};

const GeneralSettings: FC = () => {
  const onBadgeChange = async () => await sendRuntimeMessage("updateBadge");

  return (
    <Box id="general" sx={styles.wrapper}>
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
