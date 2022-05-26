import { t } from "@/common/helpers";
import { Box, Collapse } from "@mui/material";
import { FC } from "react";
import SwitchSettings from "./options/Switch";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useSettings from "@/browser/common/hooks/settings";
import { Platform } from "@/common/types/general";
import Loading from "../../layout/Loading/Loading";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
};

const additionalSwitches = [
  {
    id: "notificationsTwitch",
    label: t("notificationsPlatform", t(Platform.TWITCH)),
    icon: <div>T</div>,
    secondaryText: true,
    setting: "notifications.twitch",
  },
  {
    id: "notificationsYoutube",
    label: t("notificationsPlatform", t(Platform.YOUTUBE)),
    icon: <div>YT</div>,
    secondaryText: true,
    setting: "notifications.youtube",
  },
  {
    id: "notificationsGoodgame",
    label: t("notificationsPlatform", t(Platform.GOODGAME)),
    icon: <div>GG</div>,
    secondaryText: true,
    setting: "notifications.goodgame",
  },
];

const NotificationsSettings: FC = () => {
  const [{ notifications }, { isLoading }] = useSettings();

  if (isLoading) {
    return <Loading />;
  }

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
        {additionalSwitches.map((item) => (
          <SwitchSettings {...item} />
        ))}
      </Collapse>
    </Box>
  );
};

export default NotificationsSettings;
