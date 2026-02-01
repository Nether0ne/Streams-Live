import { SnackbarContext } from "@/browser/common/context/Snackbar";
import { useEnabledPlatforms } from "@/browser/common/hooks/platform";
import { defaultPlatformState, t } from "@/common/helpers";
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
  zIndex: 2000,
  backdropFilter: "blur(2px)",
  "& .header": {
    padding: "1rem",
    "& .text": {
      px: "1rem",
    },
    "& .actions": {
      px: "1rem",
      pb: ".75rem",
    },
  },
};

interface FactoryResetModalProps {
  readonly open: boolean;
  readonly hide: () => void;
}

const FactoryResetModal: FC<FactoryResetModalProps> = ({ open, hide }) => {
  const { setSnackbar } = useContext(SnackbarContext);
  const platforms = useEnabledPlatforms();

  const handleConfirm = () => {
    for (const p of platforms) {
      const { platform, store } = p;
      store.set(defaultPlatformState(platform.name, platform.type));
    }

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
          sx={styles}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="header">
            <Typography variant="body2">{t("resetWarning")}</Typography>
          </DialogTitle>

          <DialogContent className="text">
            <DialogContentText id="alert-dialog-slide-description">
              <Typography>{t("resetWarningDescription")}</Typography>
            </DialogContentText>
          </DialogContent>

          <DialogActions className="actions">
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
};

export default FactoryResetModal;
