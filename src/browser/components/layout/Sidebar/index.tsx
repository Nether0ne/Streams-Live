import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import { sendRuntimeMessage, t } from "@/common/helpers";
import { NavLink } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AppleIcon from "@mui/icons-material/Apple";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

interface SidebarProps {
  modalToggler: () => void;
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: 500,
    justifyContent: "space-between",
    p: 0.5,
    py: 2,
  },
  icon: {
    main: { fontSize: "1.125rem" },
    secondary: { fontSize: "1.125rem" },
  },
  divider: { my: 2.5 },
  item: { my: 2 },
};

const Sidebar: FC<SidebarProps> = ({ modalToggler }) => {
  return (
    <Box bgcolor="background.paper" sx={styles.wrapper}>
      <Tooltip title={<Typography>{t("extName")}</Typography>} placement="right">
        <IconButton>
          <AppleIcon sx={styles.icon.main} />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Box>
          <NavLink to="liveStreams">
            <Tooltip title={<Typography>{t("liveStreams")}</Typography>} placement="right">
              <IconButton>
                <LiveTvIcon sx={styles.icon.secondary} />
              </IconButton>
            </Tooltip>
          </NavLink>
        </Box>

        <Divider sx={styles.divider} />

        <Box sx={styles.item}>
          <NavLink to="">
            <Tooltip title={<Typography>{t("refreshProfile")}</Typography>} placement="right">
              <IconButton onClick={() => sendRuntimeMessage("updateLiveStreams")}>
                <RestartAltOutlinedIcon sx={styles.icon.secondary} />
              </IconButton>
            </Tooltip>
          </NavLink>
        </Box>

        <Box sx={styles.item}>
          <NavLink to="settings">
            <Tooltip title={<Typography>{t("settings")}</Typography>} placement="right">
              <IconButton>
                <SettingsOutlinedIcon sx={styles.icon.secondary} />
              </IconButton>
            </Tooltip>
          </NavLink>
        </Box>
      </Box>

      <Tooltip title={<Typography>{t("about")}</Typography>} placement="right">
        <IconButton onClick={modalToggler}>
          <InfoOutlinedIcon sx={styles.icon.secondary} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Sidebar;
