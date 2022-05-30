import { t } from "@/common/helpers";
import { Box, Fade, Modal, Typography, IconButton, Link, Portal, Backdrop } from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";

interface DonateModalProps {
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
    maxWidth: "20rem",
    m: "0 auto",
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
    mt: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    m: ".25rem",
    ml: "1rem",
  },
  closeIcon: {
    fontSize: "1rem",
  },
  footer: {
    box: {
      display: "flex",
      flexDirection: "row",
      gap: 2,
      mt: "1rem",
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

const links = [
  { href: "https://github.com/Nether0ne/Streams-Live/releases", label: t("coinbase") },
];

const DonateModal: FC<DonateModalProps> = ({ open, hide }) => {
  return (
    <Portal>
      <Modal
        id="donateModal"
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
                  <Typography variant="body2">{t("donate")}</Typography>

                  <IconButton onClick={hide}>
                    <CloseIcon sx={styles.closeIcon} />
                  </IconButton>
                </Box>
                <Box sx={styles.info}>
                  <Typography>{t("donateDescription")}</Typography>

                  <Box sx={styles.footer.box}>
                    {links.map(({ href, label }) => (
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

export default DonateModal;
