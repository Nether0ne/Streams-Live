import { FC } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { t } from "@/common/helpers";
import GeneralSettings from "../components/pages/Settings/General";
import NotificationsSettings from "../components/pages/Settings/Notifications";
import ExtraSettings from "../components/pages/Settings/Extra";
import PlatformsSettings from "../components/pages/Settings/Platforms";

const styles = {
  display: "flex",
  flexDirection: "column",
  pt: "1rem",
  gap: 2,
  "& .divider": {
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
    <Box id="settings" sx={styles}>
      <Divider className="divider">
        <Typography>{t("generalSettings")}</Typography>
      </Divider>

      <GeneralSettings />

      <Divider className="divider">
        <Typography>{t("profileSettings")}</Typography>
      </Divider>

      <PlatformsSettings />

      <Divider className="divider">
        <Typography>{t("notificationsSettings")}</Typography>
      </Divider>

      <NotificationsSettings />

      <Divider className="divider">
        <Typography>{t("exportAndImportSettings")}</Typography>
      </Divider>

      <ExtraSettings />
    </Box>
  );
};

export default Settings;
