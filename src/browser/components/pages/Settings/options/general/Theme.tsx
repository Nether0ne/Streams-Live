import { Box, capitalize, Typography, FormGroup, Switch } from "@mui/material";
import { FC } from "react";
import { t } from "@/common/helpers";
import useSettings from "@/browser/common/hooks/settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import SettingWrapper from "../Wrapper";

const styles = {
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: ".25rem",
  },
};

const ThemeSettings: FC = () => {
  const [settings, store] = useSettings();
  const { general } = settings;
  const { theme } = general;

  const handleClick = () =>
    store.set({
      ...settings,
      general: { ...general, theme },
    });

  return (
    <SettingWrapper id="theme" onClick={handleClick}>
      {theme === "light" ? <Brightness4Icon /> : <Brightness6Icon />}
      <Box sx={styles.textWrapper}>
        <Typography variant="body2">{t("theme")}</Typography>
        <Typography color="text.secondary">{t(`${theme}Theme`)}</Typography>
      </Box>
    </SettingWrapper>
  );
};

export default ThemeSettings;
