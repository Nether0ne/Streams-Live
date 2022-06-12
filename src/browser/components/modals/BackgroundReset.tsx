import { t } from "@/common/helpers";
import { Modal, Portal, Fade, Box, Typography, Button } from "@mui/material";
import { FC } from "react";
import browser from "webextension-polyfill";

const styles = {
  zIndex: 2000,
  backdropFilter: "blur(2px)",
  "& .wrapper": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
    maxWidth: "20rem",
    m: "0 auto",
    outline: "none",

    "& .background": {
      backgroundColor: "background.default",
      borderRadius: 2,
    },

    "& .content": {
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      gap: ".5rem",
    },
  },
};

interface BackgroundResetProps {
  readonly isOpen: boolean;
}

const BackgroundReset: FC<BackgroundResetProps> = ({ isOpen }) => {
  return (
    <Portal>
      <Modal
        id="backgroundResetModal"
        open={isOpen}
        sx={styles}
        // TODO: fix backdrop behavior
        // BackdropComponent={Backdrop}
      >
        <Fade in={isOpen}>
          <Box className="wrapper">
            <Box className="background">
              <Box className="content">
                <Typography variant="body2">{t("backgroundResetTitle")}</Typography>
                <Typography className="info">{t("backgroundResetDescription")}</Typography>
                <Button onClick={() => browser.runtime.reload()} variant="contained" size="medium">
                  <Typography>{t("backgroundResetButton")}</Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Portal>
  );
};

export default BackgroundReset;
