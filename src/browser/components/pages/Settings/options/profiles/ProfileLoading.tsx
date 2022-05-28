import TwitchIcon from "@/browser/components/icons/Twitch";
import { Avatar, Box, IconButton, Skeleton } from "@mui/material";
import { CSSProperties } from "@mui/styled-engine";
import { FC } from "react";
import SettingWrapper from "../Wrapper";

const styles = {
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  } as CSSProperties,
  infoWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignSelf: "left",
    alignItems: "center",
    gap: 1,
  },
  actionsWrapper: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "right",
    alignItems: "center",
    gap: 1,
    pr: "1rem",
  },
  name: { paddingRight: ".5rem", minWidth: "5rem" },
  button: { fontSize: "1.25rem" },
};

const ProfileLoading: FC = () => {
  return (
    <SettingWrapper id={"loadingProfile"} customStyles={styles.wrapper} clickable={false}>
      <TwitchIcon />

      <Box sx={styles.infoWrapper}>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
        <Skeleton sx={styles.name} />
      </Box>

      <Box sx={styles.actionsWrapper}>
        <Skeleton variant="circular">
          <IconButton sx={styles.button} />
        </Skeleton>
        <Skeleton variant="circular" sx={{ ml: ".5rem" }}>
          <IconButton sx={styles.button} />
        </Skeleton>
      </Box>
    </SettingWrapper>
  );
};

export default ProfileLoading;
