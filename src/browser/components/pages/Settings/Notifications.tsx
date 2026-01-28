import { t } from "@/common/helpers";
import { Box, Collapse } from "@mui/material";
import { FC } from "react";
import SwitchSettings from "./options/Switch";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import useSettings from "@/browser/common/hooks/settings";
import { useEnabledPlatforms } from "@/browser/common/hooks/platform";
import PlatformIcon from "../../misc/PlatformIcon";
import SettingLoading from "./options/SettingLoading";

const styles = {
  display: "flex",
  flexDirection: "column",
  loading: {
    px: 1,
    py: 2,
  },
};

const NotificationsSettings: FC = () => {
  const [settings, store] = useSettings();
  const { notifications } = settings;
  const setPlatforms = useEnabledPlatforms();

  if (store.isLoading) {
    return <SettingLoading withSwitch icon={<NotificationsIcon />} sx={styles.loading} />;
  }

  return (
    <Box sx={styles}>
      <SwitchSettings
        {...{
          id: "notificationsEnabled",
          label: t("notificationsEnabled"),
          icon: <NotificationsIcon />,
          secondaryText: true,
          setting: "notifications.enabled",
        }}
      />

      <Collapse in={notifications.enabled}>
        <SwitchSettings
          {...{
            id: "notificationsCategory",
            label: t("notificationsCategory"),
            icon: <SwitchLeftIcon />,
            secondaryText: true,
            setting: "notifications.category",
          }}
        />
        {setPlatforms.map(({ platform }) => (
          <SwitchSettings
            {...{
              id: `notifications${platform.name}`,
              label: t("notificationsPlatform", t(platform.name)),
              icon: <PlatformIcon platformName={platform.name} />,
              secondaryText: true,
              setting: `notifications.${platform.name}`,
            }}
          />
        ))}
      </Collapse>
    </Box>
  );
};

export default NotificationsSettings;
