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
import AppleIcon from "@mui/icons-material/Apple";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoIcon from "@mui/icons-material/Info";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

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
    main: { fontSize: "1.125rem" },
    secondary: { fontSize: "1.125rem" },
    menu: { fontSize: "1rem" },
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
    <Box sx={styles.wrapper}>
      {/* TODO: replace url with chrome store url */}
      <MuiLink href={"https://twitch.tv"} target="_blank">
        <Tooltip title={<Typography>{t("extName")}</Typography>} placement="right">
          <IconButton>
            {/* TODO: apply exstension icon */}
            <AppleIcon sx={styles.icon.main} />
          </IconButton>
        </Tooltip>
      </MuiLink>

      <Link to="streams">
        <Tooltip title={<Typography>{t("streams")}</Typography>} placement="right">
          <IconButton>
            <LiveTvIcon sx={styles.icon.secondary} />
          </IconButton>
        </Tooltip>
      </Link>

      <Box sx={styles.bottomWrapper}>
        <Link to="settings">
          <Tooltip title={<Typography>{t("settings")}</Typography>} placement="right">
            <IconButton>
              <SettingsOutlinedIcon sx={styles.icon.secondary} />
            </IconButton>
          </Tooltip>
        </Link>

        <Box>
          <Tooltip title={<Typography>{t("more")}</Typography>} placement="right">
            <IconButton onClick={() => setMoreMenuOpen(true)}>
              <MoreVertIcon sx={styles.icon.secondary} />
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
