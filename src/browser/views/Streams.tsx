import { Stream } from "@/common/types/stream";
import { Box } from "@mui/material";
import { FC } from "react";
import TwitchStream from "../components/cards/stream/Twitch";
import Loading from "../components/layout/Loading/Loading";
import { t } from "@/common/helpers";
import StreamsHeader from "../components/pages/Streams/Header";
import { useStreamsWithSettings } from "../common/hooks/streams";
import { Platform } from "@/common/types/general";
import { useProfile } from "../common/hooks/profile";
import { StreamSettingsProvider } from "../common/context/StreamsSettings";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  streams: {
    wrapper: {
      display: "flex",
      flexDirection: "column",
    },
    empty: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      height: 400,
    },
    loading: {
      height: 400,
    },
  },
};

const Streams: FC = () => {
  const [twitch, twitchStore] = useProfile(Platform.TWITCH);
  const { streamsWithSettings, isLoading, setStreamsSettings, streamSettings, settingsIsLoading } =
    useStreamsWithSettings();

  if (!twitch.accessToken && !twitch.name && !twitchStore.isLoading) {
    return <div>Please login</div>;
  }
  return (
    <StreamSettingsProvider>
      <Box sx={styles.wrapper}>
        <StreamsHeader />
        <Box sx={styles.streams.wrapper}>
          {isLoading || settingsIsLoading ? (
            <Loading customSx={styles.streams.loading} />
          ) : streamsWithSettings.length > 0 ? (
            streamsWithSettings.map((stream: Stream) => <TwitchStream stream={stream} />)
          ) : (
            <Box sx={styles.streams.empty}>{t("noStreams")}</Box>
          )}
        </Box>
      </Box>
    </StreamSettingsProvider>
  );
};

export default Streams;
