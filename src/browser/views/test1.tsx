import { Platform } from "@/common/types/general";
import { Box } from "@mui/material";
import { FC } from "react";
import { useProfile } from "../common/hooks/profile";

const test1: FC = () => {
  const [twitch, twitchActions] = useProfile(Platform.TWITCH);
  twitch.accessToken = null;
  twitchActions.set(twitch);
  return <Box sx={{ width: 400 }}>done!</Box>;
};
export default test1;
