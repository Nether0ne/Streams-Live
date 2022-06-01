import { FC } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { t } from "@/common/helpers";
import GeneralSettings from "../components/pages/Settings/General";
import ProfilesSettings from "../components/pages/Settings/Profiles";
import NotificationsSettings from "../components/pages/Settings/Notifications";
import ExtraSettings from "../components/pages/Settings/Extra";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    pt: "1rem",
    gap: 2,
  },
  divider: {
    m: "0 .5rem",
    fontWeight: "bold",
    "&::before, &::after": {
      borderColor: "primary.light",
    },
    "& p": {
      fontWeight: "600",
    },
  },
};

const Settings: FC = () => {
  return (
    <Box id="settings" sx={styles.wrapper}>
      <Divider sx={styles.divider}>
        <Typography>{t("generalSettings")}</Typography>
      </Divider>

      <GeneralSettings />

      <Divider sx={styles.divider}>
        <Typography>{t("profileSettings")}</Typography>
      </Divider>

      <ProfilesSettings />

      <Divider sx={styles.divider}>
        <Typography>{t("notificationsSettings")}</Typography>
      </Divider>

      <NotificationsSettings />

      <Divider sx={styles.divider}>
        <Typography>{t("exportAndImportSettings")}</Typography>
      </Divider>

      <ExtraSettings />
    </Box>
  );
};

export default Settings;
