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
import { useEnabledPlatforms } from "@/browser/common/hooks/platform";

interface SidebarProps {
  readonly aboutModalToggler: () => void;
  readonly donateModalToggler: () => void;
}

const styles = {
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
  "& .bottom": {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  "& * > svg": {
    fontSize: "1.25rem",
  },
  "& .menu > svg": {
    fontSize: "1rem",
  },
  "& .appSet svg": {
    color: "primary.main",
  },
  "& .appUnset svg": {
    color: "#a9a9a9",
  },
};

const menuItem = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  py: ".25rem",
  px: ".5rem",
  transition: "background-color .5s ease-out",
  "&:hover": {
    transition: "background-color .5s ease-out",
  },
  "& svg": {
    fontSize: "1rem",
  },
};

const menuProps = {
  disablePadding: true,
};

const Sidebar: FC<SidebarProps> = ({ aboutModalToggler, donateModalToggler }) => {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const platforms = useEnabledPlatforms();

  const moreItems = [
    {
      label: t("about"),
      icon: <InfoIcon />,
      onClick: () => {
        aboutModalToggler();
        setMoreMenuOpen(false);
      },
    },
    {
      label: t("donate"),
      icon: <MonetizationOnOutlinedIcon />,
      onClick: () => {
        donateModalToggler();
        setMoreMenuOpen(false);
      },
    },
  ];

  return (
    <Box id="sidebar" className="sidebar" sx={styles}>
      <MuiLink href={"https://nether0ne.github.io/#/streams-live/"} target="_blank">
        <Tooltip title={<Typography>{t("extensionName")}</Typography>} placement="right">
          <IconButton className={platforms.length > 0 ? "appSet" : "appUnset"}>
            <StreamsLive />
          </IconButton>
        </Tooltip>
      </MuiLink>

      <Box alignSelf="center" id="streams">
        <Link to="streams">
          <Tooltip title={<Typography>{t("streams")}</Typography>} placement="right">
            <IconButton>
              <LiveTvIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </Box>

      <Box id="settings" className="bottom">
        <Link to="settings">
          <Tooltip title={<Typography>{t("settings")}</Typography>} placement="right">
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Link>

        <Box id="more">
          <Tooltip title={<Typography>{t("more")}</Typography>} placement="right">
            <IconButton onClick={() => setMoreMenuOpen(true)}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>

          <Menu
            className="menu"
            open={moreMenuOpen}
            MenuListProps={menuProps}
            BackdropComponent={Backdrop}
            onClose={() => setMoreMenuOpen(false)}
          >
            {moreItems.map(({ label, icon, onClick }) => (
              <MenuItem {...{ onClick }} sx={menuItem}>
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
