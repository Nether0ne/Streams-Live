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
  defaultLink: {
    textDecoration: "none",
    color: "inherit",
  },
  footer: {
    box: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 1,
    },
    item: {
      display: "inline-flex",
      alignItems: "center",
    },
    icon: {
      fontSize: "1rem",
      marginRight: "0.1rem",
    },
  },
};

const authorGithub = "https://github.com/nether0ne";

const footerItems = [
  { href: "https://github.com/Nether0ne/Streams-Live", label: t("repository") },
  { href: "https://github.com/Nether0ne/Streams-Live/releases", label: t("releases") },
  { href: "https://github.com/Nether0ne/Streams-Live/issues", label: t("issues") },
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
                  <Typography variant="body2">
                    <Link sx={styles.defaultLink} href={authorGithub} color={"text.secondary"}>
                      {t("extAuthor")}
                    </Link>
                  </Typography>
                  <Typography py={3} textAlign={"center"}>
                    {t("extensionDescription")}
                  </Typography>

                  <Box sx={styles.footer.box}>
                    {footerItems.map(({ href, label }) => (
                      <Link
                        sx={styles.footer.item}
                        href={href}
                        target="_blank"
                        color={"text.secondary"}
                      >
                        <LinkIcon sx={styles.footer.icon} />
                        <Typography noWrap>{label}</Typography>
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
