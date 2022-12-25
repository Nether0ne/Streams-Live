import { FC } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { t } from "@/common/helpers";
import GeneralSettings from "../components/pages/Settings/General";
import NotificationsSettings from "../components/pages/Settings/Notifications";
import ExtraSettings from "../components/pages/Settings/Extra";
import PlatformsSettings from "../components/pages/Settings/Platforms";
import StreamCardSettings from "../components/pages/Settings/StreamCardSettings";

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

const settings = [
  {
    label: t("generalSettings"),
    component: <GeneralSettings />,
  },
  {
    label: t("profileSettings"),
    component: <PlatformsSettings />,
  },
  {
    label: t("customStreamCard"),
    component: <StreamCardSettings />,
  },
  {
    label: t("notificationsSettings"),
    component: <NotificationsSettings />,
  },
  {
    label: t("exportAndImportSettings"),
    component: <ExtraSettings />,
  },
];

const Settings: FC = () => {
  return (
    <Box id="settings" sx={styles}>
      {settings.map(({ label, component }) => (
        <>
          <Divider className="divider">
            <Typography>{label}</Typography>
          </Divider>
          {component}
        </>
      ))}
    </Box>
  );
};

export default Settings;
