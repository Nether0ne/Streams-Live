import { Box } from "@mui/material";
import { FC } from "react";
import StreamsHeader from "../components/pages/Streams/Header";
import { Platform } from "@/common/types/general";
import { useProfile } from "../common/hooks/profile";
import { StreamSettingsProvider } from "../common/context/StreamsSettings";
import StreamsList from "../components/pages/Streams/StreamsList";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
};

const Streams: FC = () => {
  const [twitch, twitchStore] = useProfile(Platform.TWITCH);

  if (!twitch.accessToken && !twitch.name && !twitchStore.isLoading) {
    return <div>Please login</div>;
  }
  return (
    <StreamSettingsProvider>
      <Box sx={styles.wrapper}>
        <StreamsHeader />
        <StreamsList />
      </Box>
    </StreamSettingsProvider>
  );
};

export default Streams;
