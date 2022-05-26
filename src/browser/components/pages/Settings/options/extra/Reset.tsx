import { FC, useContext } from "react";
import SettingWrapper from "../Wrapper";
import { defaultProfileState, sendRuntimeMessage, t } from "@/common/helpers";
import { Box, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { SnackbarContext } from "@/browser/common/context/Snackbar";
import useSettings from "@/browser/common/hooks/settings";
import { defaultSettings } from "@/common/types/settings";
import { useProfile } from "@/browser/common/hooks/profile";
import { Platform } from "@/common/types/general";

const styles = {
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: ".25rem",
  },
};

const ResetSetting: FC = () => {
  const { setSnackbar } = useContext(SnackbarContext);
  const [, settingsStore] = useSettings();
  const [, twitchStore] = useProfile(Platform.TWITCH);
  const [, youtubeStore] = useProfile(Platform.YOUTUBE);
  const [, goodgameStore] = useProfile(Platform.GOODGAME);

  const handleClick = async () => {
    settingsStore.set(defaultSettings);
    twitchStore.set(defaultProfileState(Platform.TWITCH));
    youtubeStore.set(defaultProfileState(Platform.YOUTUBE));
    goodgameStore.set(defaultProfileState(Platform.GOODGAME));

    setSnackbar({
      open: true,
      message: t("actionSuccess", t("resetSetting")),
      variant: "success",
    });
  };

  return (
    <SettingWrapper id="import" onClick={handleClick}>
      <ReportProblemIcon />
      <Box sx={styles.textWrapper}>
        <Typography variant="body2">{t("resetSetting")}</Typography>
        <Typography color="text.secondary">{t(`resetSettingDescription`)}</Typography>
      </Box>
    </SettingWrapper>
  );
};

export default ResetSetting;
