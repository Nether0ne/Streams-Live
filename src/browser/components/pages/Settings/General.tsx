import useSettings from "@/browser/common/hooks/settings";
import { t } from "@/common/helpers";
import { Box, Typography, Divider } from "@mui/material";
import { FC } from "react";
import FontSizeSetting from "./options/general/FontSize";
import ThemeSettings from "./options/general/Theme";

import LabelIcon from "@mui/icons-material/Label";
import SwitchSettings from "./options/Switch";
import Loading from "../../layout/Loading/Loading";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  divider: {
    fontWeight: "bold",
    pt: "1rem",
    pb: ".5rem",
    "&::before, &::after": {
      borderColor: "primary.light",
    },
  },
  dividerText: {
    fontWeight: "600",
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
  const [, { isLoading }] = useSettings();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={styles.wrapper}>
      <Divider sx={styles.divider}>
        <Typography sx={styles.dividerText}>{t("generalSettings")}</Typography>
      </Divider>

      <FontSizeSetting />
      <ThemeSettings />
      <SwitchSettings
        {...{
          id: "badge",
          label: t("badge"),
          icon: <LabelIcon />,
          secondaryText: true,
          setting: "general.badge",
        }}
      />
    </Box>
  );
};

export default GeneralSettings;
