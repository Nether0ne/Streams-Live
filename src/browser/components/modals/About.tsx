import { t } from "@/common/helpers";
import { Box, Fade, Modal, Typography, IconButton, Link, Portal, Backdrop } from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
import StreamsLive from "../icons/StreamsLive";

interface AboutModalProps {
  open: boolean;
  hide: () => void;
}

const styles = {
  backdrop: {
    backdropFilter: "blur(2px)",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
  },
  background: {
    backgroundColor: "background.default",
    borderRadius: 2,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "18rem",
    m: "0 auto",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    px: 2,
    pb: 2,
  },
  header: {
    textAlign: "right",
    m: ".25rem",
  },
  closeIcon: {
    fontSize: "1rem",
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

const footerItems = [
  { href: "https://github.com/Nether0ne/Streams-Live", label: t("repository") },
  { href: "https://github.com/Nether0ne/Streams-Live/releases", label: t("releases") },
];

const AboutModal: FC<AboutModalProps> = ({ open, hide }) => {
  return (
    <Portal>
      <Modal
        id="aboutModal"
        open={open}
        onClose={hide}
        closeAfterTransition
        sx={styles.backdrop}
        // TODO: fix backdrop behavior
        // BackdropComponent={Backdrop}
      >
        <Fade in={open}>
          <Box sx={styles.wrapper}>
            <Box sx={styles.background}>
              <Box sx={styles.content}>
                <Box sx={styles.header}>
                  <IconButton onClick={hide}>
                    <CloseIcon sx={styles.closeIcon} />
                  </IconButton>
                </Box>
                <Box sx={styles.info}>
                  <StreamsLive sx={{ fontSize: 76 }} />

                  <Typography variant="body2">{t("extName")}</Typography>
                  <Typography variant="body2">{t("extAuthor")}</Typography>
                  <Typography py={3} textAlign={"center"}>
                    {t("extDescription")}
                  </Typography>

                  <Box sx={styles.footer.box}>
                    {footerItems.map(({ href, label }) => (
                      <Link href={href} target="_blank" color={"text.secondary"}>
                        <Typography sx={styles.footer.typography}>
                          <LinkIcon sx={styles.footer.icon} /> {label}
                        </Typography>
                      </Link>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Portal>
  );
};

export default AboutModal;
