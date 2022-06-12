import {
  Backdrop,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { FC, useState } from "react";
import { t } from "@/common/helpers";
import { Link } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoIcon from "@mui/icons-material/Info";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import StreamsLive from "../../icons/StreamsLive";
import { useAllSetPlatforms } from "@/browser/common/hooks/platform";

interface SidebarProps {
  aboutModalToggler: () => void;
  donateModalToggler: () => void;
}

const styles = {
  wrapper: {
    height: "550px",
    backgroundColor: "background.paper",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    left: 0,
    justifyContent: "space-between",
    p: 0.5,
    py: 2,
  },
  bottomWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  icon: {
    sidebar: { fontSize: "1.25rem" },
    menu: { fontSize: "1rem" },
  },
  appIcon: {
    set: {
      color: "primary.main",
    },
    unset: {
      color: "#a9a9a9",
    },
  },
  menu: {
    py: 0,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    py: ".25rem",
    px: ".5rem",
    transition: "background-color .5s ease-out",
    "&:hover": {
      transition: "background-color .5s ease-out",
    },
  },
};

const menuProps = {
  disablePadding: true,
};

const Sidebar: FC<SidebarProps> = ({ aboutModalToggler, donateModalToggler }) => {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const platforms = useAllSetPlatforms();

  const moreItems = [
    {
      label: t("about"),
      icon: <InfoIcon sx={styles.icon.menu} />,
      onClick: () => {
        aboutModalToggler();
        setMoreMenuOpen(false);
      },
    },
    {
      label: t("donate"),
      icon: <MonetizationOnOutlinedIcon sx={styles.icon.menu} />,
      onClick: () => {
        donateModalToggler();
        setMoreMenuOpen(false);
      },
    },
  ];

  return (
    <Box id="sidebar" sx={styles.wrapper}>
      {/* TODO: replace url with chrome store url */}
      <MuiLink href={"https://twitch.tv"} target="_blank">
        <Tooltip title={<Typography>{t("extName")}</Typography>} placement="right">
          <IconButton>
            {/* TODO: apply exstension icon */}
            <StreamsLive
              sx={{
                ...styles.icon.sidebar,
                ...(platforms.length > 0 ? styles.appIcon.set : styles.appIcon.unset),
              }}
            />
          </IconButton>
        </Tooltip>
      </MuiLink>

      <Box alignSelf="center" id="streams">
        <Link to="streams">
          <Tooltip title={<Typography>{t("streams")}</Typography>} placement="right">
            <IconButton>
              <LiveTvIcon sx={styles.icon.sidebar} />
            </IconButton>
          </Tooltip>
        </Link>
      </Box>

      <Box id="settings" sx={styles.bottomWrapper}>
        <Link to="settings">
          <Tooltip title={<Typography>{t("settings")}</Typography>} placement="right">
            <IconButton>
              <SettingsOutlinedIcon sx={styles.icon.sidebar} />
            </IconButton>
          </Tooltip>
        </Link>

        <Box id="more">
          <Tooltip title={<Typography>{t("more")}</Typography>} placement="right">
            <IconButton onClick={() => setMoreMenuOpen(true)}>
              <MoreVertIcon sx={styles.icon.sidebar} />
            </IconButton>
          </Tooltip>

          <Menu
            open={moreMenuOpen}
            sx={styles.menu}
            MenuListProps={menuProps}
            BackdropComponent={Backdrop}
            onClose={() => setMoreMenuOpen(false)}
          >
            {moreItems.map(({ label, icon, onClick }) => (
              <MenuItem {...{ onClick }} sx={styles.menuItem}>
                {icon}
                <Typography>{label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
