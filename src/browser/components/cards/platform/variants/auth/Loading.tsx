import TwitchIcon from "@/browser/components/icons/platforms/Twitch";
import SettingWrapper from "@/browser/components/pages/Settings/options/Wrapper";
import { Avatar, Box, IconButton, Skeleton } from "@mui/material";
import { CSSProperties, FC } from "react";

const styles = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  "& .info": {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignSelf: "left",
    alignItems: "center",
    gap: 1,
    "& .name": { paddingRight: ".5rem", minWidth: "5rem" },
  },
  "& .actions": {
    display: "flex",
    flexDirection: "row",
    alignSelf: "right",
    alignItems: "center",
    gap: 1,
    pr: "1rem",
    "& svg": { fontSize: "1.25rem" },
  },
} as CSSProperties;

const PlatformLoading: FC = () => {
  return (
    <SettingWrapper id={"loadingProfile"} customStyles={styles} clickable={false}>
      <TwitchIcon />

      <Box className="info">
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
        <Skeleton className="name" />
      </Box>

      <Box className="actions">
        <Skeleton variant="circular">
          <IconButton />
        </Skeleton>
        <Skeleton variant="circular" sx={{ ml: ".5rem" }}>
          <IconButton />
        </Skeleton>
      </Box>
    </SettingWrapper>
  );
};

export default PlatformLoading;
