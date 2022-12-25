import { sendRuntimeMessage, t } from "@/common/helpers";
import {
  Fade,
  Typography,
  Portal,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  Box,
} from "@mui/material";
import { FC } from "react";
import { usePlatform } from "@/browser/common/hooks/platform";
import { PlatformName } from "@/common/types/platform";
import { stores } from "@/common/store";

interface PlatformExpiredModalProps {
  readonly open: boolean;
  readonly platformName: PlatformName;
}

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

const PlatformExpiredModal: FC<PlatformExpiredModalProps> = ({ open, platformName }) => {
  const [platform] = usePlatform(platformName);

  const handleUnset = async () => {
    platform.enabled = false;
    platform.data = {
      id: null,
      name: null,
      avatar: null,
    };
    platform.followedStreamers = [];
    platform.accessToken = undefined;
    await stores[platformName].set(platform);
    sendRuntimeMessage("updateStreams", true);
  };

  const handleConfirm = () => sendRuntimeMessage("authInit", platformName);

  return (
    <Portal>
      <Fade in={open}>
        <Box>
          <Dialog
            id="platformExpiredModal"
            open={open}
            TransitionComponent={Fade}
            keepMounted
            sx={styles}
          >
            <DialogTitle className="header">
              <Typography variant="body2">{t("accessTokenExpired", [t(platformName)])}</Typography>
            </DialogTitle>

            <DialogActions className="actions">
              <Button variant="outlined" color="info" size="small" onClick={handleConfirm}>
                <Typography>{t("renewAcessToken", [t(platformName)])}</Typography>
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={async () => await handleUnset()}
              >
                <Typography>{t("forbidPlatform")}</Typography>
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Fade>
    </Portal>
  );
};

export default PlatformExpiredModal;
