import { Box, Collapse, Typography } from "@mui/material";
import { FC } from "react";
import { t } from "@/common/helpers";
import useSettings from "@/browser/common/hooks/settings";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PanoramaIcon from "@mui/icons-material/Panorama";
import CastIcon from "@mui/icons-material/Cast";
import PeopleIcon from "@mui/icons-material/People";
import TitleIcon from "@mui/icons-material/Title";
import CategoryIcon from "@mui/icons-material/Category";
import SwitchSettings from "./options/Switch";
import SettingLoading from "./options/SettingLoading";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: ".25rem",
  loading: {
    px: 1,
    py: 2,
  },
};

const customStreamCardSettings = {
  thumbnail: {
    id: "thumbnail",
    label: t("useCustomThumbnail"),
    icon: <PanoramaIcon />,
  },
  platformIcon: {
    id: "platformIcon",
    label: t("useCustomPlatformIcon"),
    icon: <CastIcon />,
  },
  viewers: {
    id: "viewers",
    label: t("useCustomViewers"),
    icon: <PeopleIcon />,
  },
  title: {
    id: "title",
    label: t("useCustomTitle"),
    icon: <TitleIcon />,
  },
  category: {
    id: "category",
    label: t("useCustomCategory"),
    icon: <CategoryIcon />,
  },
};

const StreamCardSettings: FC = () => {
  const [settings, store] = useSettings();
  const { general } = settings;
  const { useCustomStreamCard } = general;

  if (store.isLoading) {
    return <SettingLoading withSwitch icon={<DashboardCustomizeIcon />} sx={styles.loading} />;
  }

  return (
    <Box sx={styles}>
      <SwitchSettings
        {...{
          id: "useCustomStreamCard",
          label: t("useCustomStreamCard"),
          icon: <DashboardCustomizeIcon />,
          secondaryText: true,
          setting: "general.useCustomStreamCard",
        }}
      />

      <Collapse in={useCustomStreamCard}>
        {Object.values(customStreamCardSettings).map(({ id, icon, label }) => (
          <SwitchSettings
            {...{
              id: `general.customStreamCard.${id}`,
              label,
              icon,
              secondaryText: true,
              setting: `general.customStreamCard.${id}`,
            }}
          />
        ))}
      </Collapse>
    </Box>
  );
};

export default StreamCardSettings;
