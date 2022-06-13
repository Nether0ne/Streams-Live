import { t } from "@/common/helpers";
import { Box, Fade, Modal, Typography, IconButton, Link, Portal, Backdrop } from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";

interface DonateModalProps {
  readonly open: boolean;
  readonly hide: () => void;
}

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

    "& .background": {
      backgroundColor: "background.default",
      borderRadius: 2,
    },

    "& .content": {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      "& .header": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        m: ".25rem",
        ml: "1rem",
      },
      "& .info": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        pb: 2,
        mt: "1rem",
        "& .footer": {
          display: "flex",
          flexDirection: "row",
          gap: 2,
          mt: "1rem",
          "& .text": {
            display: "flex",
            alignItems: "center",
          },
        },
      },
      "& svg": {
        fontSize: "1rem",
        marginRight: "0.1rem",
      },
    },
  },
};

const links = [
  { href: "https://nether0ne.github.io/#/r/streams-live-coinbase", label: t("coinbase") },
];

const DonateModal: FC<DonateModalProps> = ({ open, hide }) => {
  return (
    <Portal>
      <Modal
        id="donateModal"
        open={open}
        onClose={hide}
        closeAfterTransition
        sx={styles}
        // TODO: fix backdrop behavior
        // BackdropComponent={Backdrop}
      >
        <Fade in={open}>
          <Box className="wrapper">
            <Box className="background">
              <Box className="content">
                <Box className="header">
                  <Typography variant="body2">{t("donate")}</Typography>

                  <IconButton onClick={hide}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box className="info">
                  <Typography>{t("donateDescription")}</Typography>

                  <Box className="footer">
                    {links.map(({ href, label }) => (
                      <Link href={href} target="_blank" color={"text.secondary"}>
                        <Typography className="text">
                          <LinkIcon /> {label}
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
