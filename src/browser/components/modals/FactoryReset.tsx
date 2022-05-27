import { SnackbarContext } from "@/browser/common/context/Snackbar";
import { useProfile } from "@/browser/common/hooks/profile";
import useSettings from "@/browser/common/hooks/settings";
import { defaultProfileState, t } from "@/common/helpers";
import { Platform } from "@/common/types/general";
import { defaultSettings } from "@/common/types/settings";
import {
  Fade,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Portal,
} from "@mui/material";
import { FC, useContext, useMemo } from "react";

const styles = {
  wrapper: {
    margin: "4rem",
  },
  backdrop: {
    backdropFilter: "blur(2px)",
  },
  header: {
    padding: "1rem",
  },
  text: {
    px: "1rem",
  },
  actions: {
    px: "1rem",
    pb: ".75rem",
  },
};

interface FactoryResetModalProps {
  open: boolean;
  hide: () => void;
}

const FactoryResetModal: FC<FactoryResetModalProps> = ({ open, hide }) => {
  return useMemo(() => {
    const { setSnackbar } = useContext(SnackbarContext);
    const [, settingsStore] = useSettings();
    const [, twitchStore] = useProfile(Platform.TWITCH);
    const [, youtubeStore] = useProfile(Platform.YOUTUBE);
    const [, goodgameStore] = useProfile(Platform.GOODGAME);

    const handleConfirm = () => {
      settingsStore.set(defaultSettings);
      twitchStore.set(defaultProfileState(Platform.TWITCH));
      youtubeStore.set(defaultProfileState(Platform.YOUTUBE));
      goodgameStore.set(defaultProfileState(Platform.GOODGAME));

      setSnackbar({
        open: true,
        message: t("actionSuccess", t("resetSetting")),
        variant: "success",
      });

      hide();
    };

    return (
      <Portal>
        <Fade in={open}>
          <Dialog
            id="factoryResetModal"
            open={open}
            TransitionComponent={Fade}
            keepMounted
            onClose={hide}
            sx={styles.backdrop}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle sx={styles.header}>
              <Typography variant="body2">{t("resetWarning")}</Typography>
            </DialogTitle>

            <DialogContent sx={styles.text}>
              <DialogContentText id="alert-dialog-slide-description">
                <Typography>{t("resetWarningDescription")}</Typography>
              </DialogContentText>
            </DialogContent>

            <DialogActions sx={styles.actions}>
              <Button variant="outlined" color="info" size="small" onClick={hide}>
                <Typography variant="body2">{t("resetAbort")}</Typography>
              </Button>
              <Button variant="outlined" color="warning" size="small" onClick={handleConfirm}>
                <Typography variant="body2">{t("resetConfirm")}</Typography>
              </Button>
            </DialogActions>
          </Dialog>
        </Fade>
      </Portal>
    );
  }, [open]);
};

export default FactoryResetModal;
