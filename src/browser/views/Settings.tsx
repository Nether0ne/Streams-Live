import { FC } from "react";
import { Box, Divider, Typography, Button } from "@mui/material";
import { t } from "@/common/helpers";
import Loading from "../components/layout/Loading/Loading";
import GeneralSettings from "../components/pages/Settings/General";
import ProfilesSettings from "../components/pages/Settings/Profiles";
import NotificationsSettings from "../components/pages/Settings/Notifications";
import useSettings from "../common/hooks/settings";
import ExtraSettings from "../components/pages/Settings/Extra";

const Settings: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <GeneralSettings />

      <Divider
        sx={{
          fontWeight: "bold",
          "&::before, &::after": {
            borderColor: "primary.light",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
          }}
        >
          {t("profileSettings")}
        </Typography>
      </Divider>

      <ProfilesSettings />

      <Divider
        sx={{
          fontWeight: "bold",
          "&::before, &::after": {
            borderColor: "primary.light",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
          }}
        >
          {t("notificationsSettings")}
        </Typography>
      </Divider>

      <NotificationsSettings />

      <Divider
        sx={{
          "&::before, &::after": {
            borderColor: "primary.light",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
          }}
        >
          {t("exportAndImportSettings")}
        </Typography>
      </Divider>

      <ExtraSettings />
    </Box>
  );
};

export default Settings;
