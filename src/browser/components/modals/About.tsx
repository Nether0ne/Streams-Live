import { useModal } from "@/browser/common/hooks";
import { t } from "@/common/helpers";
import { Box, Fade, Modal, Typography, IconButton, Link, Backdrop } from "@mui/material";
import { FC, useMemo } from "react";
import AppleIcon from "@mui/icons-material/Apple";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";

interface AboutModalProps {
  open: boolean;
  hide: () => void;
}

const styles = {
  backdrop: {
    backdropFilter: "blur(2px)",
    zIndex: 2040,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
    zIndex: 2050,
  },
  background: {
    backgroundColor: "background.default",
    borderRadius: 2,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    px: 2,
    pb: 2,
  },
  footer: {
    box: {
      display: "flex",
      flexDirection: "row",
      gap: 2,
    },
    typography: {
      display: "flex",
      alignItems: "center",
    },
    icon: {
      fontSize: "1rem",
      marginRight: "0.1rem",
    },
  },
};

const AboutModal: FC<AboutModalProps> = ({ open, hide }) => {
  return useMemo(() => {
    return (
      <Modal open={open} onClose={hide} closeAfterTransition sx={styles.backdrop}>
        <Fade in={open}>
          <Box sx={styles.wrapper}>
            <Box sx={styles.background}>
              <Box sx={styles.content}>
                <Box textAlign={"right"} m={1}>
                  <IconButton onClick={hide}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box sx={styles.info}>
                  <AppleIcon sx={{ fontSize: 76 }} />

                  <Typography>{t("extName")}</Typography>
                  <Typography>{t("extAuthor")}</Typography>

                  <Typography py={3}>{t("extDescription")}</Typography>

                  <Box sx={styles.footer.box}>
                    <Link
                      href="https://github.com/Nether0ne/Streams-Now"
                      target="_blank"
                      color={"text.secondary"}
                    >
                      <Typography sx={styles.footer.typography}>
                        <LinkIcon sx={styles.footer.icon} /> {t("repository")}
                      </Typography>
                    </Link>

                    <Link
                      href="https://github.com/Nether0ne/Streams-Now/releases"
                      target="_blank"
                      color={"text.secondary"}
                    >
                      <Typography sx={styles.footer.typography}>
                        <LinkIcon sx={styles.footer.icon} /> {t("releases")}
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    );
  }, [open]);
};

export default AboutModal;
