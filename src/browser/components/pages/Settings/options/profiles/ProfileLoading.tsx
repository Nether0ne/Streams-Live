import TwitchIcon from "@/browser/components/icons/Twitch";
import { Avatar, Box, IconButton, Skeleton } from "@mui/material";
import { FC } from "react";

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  icon: {
    marginRight: "1rem",
  },
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
    <Box sx={styles.wrapper}>
      <TwitchIcon sx={styles.icon} />

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
    </Box>
  );
};

export default ProfileLoading;
