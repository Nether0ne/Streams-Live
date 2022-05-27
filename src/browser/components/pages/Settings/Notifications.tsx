import { t } from "@/common/helpers";
import { Box, Collapse } from "@mui/material";
import { FC } from "react";
import SwitchSettings from "./options/Switch";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useSettings from "@/browser/common/hooks/settings";
import { useAllSetProfiles } from "@/browser/common/hooks/profile";
import PlatformIcon from "../../PlatformIcon";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
};

const NotificationsSettings: FC = () => {
  const [{ notifications }] = useSettings();
  const setProfiles = useAllSetProfiles();

  return (
    <Box sx={styles.wrapper}>
      <SwitchSettings
        {...{
          id: "notifications",
          label: t("notificationsEnabled"),
          icon: <NotificationsIcon />,
          secondaryText: true,
          setting: "notifications.enabled",
        }}
      />

      <Collapse in={notifications.enabled}>
        {setProfiles.map(({ profile }) => (
          <SwitchSettings
            {...{
              id: `notifications${profile.platform}`,
              label: t("notificationsPlatform", t(profile.platform)),
              icon: <PlatformIcon platform={profile.platform} />,
              secondaryText: true,
              setting: `notifications.${profile.platform}`,
            }}
          />
        ))}
      </Collapse>
    </Box>
  );
};

export default NotificationsSettings;
