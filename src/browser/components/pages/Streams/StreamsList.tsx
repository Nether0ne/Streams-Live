import { FC, useContext } from "react";
import { t } from "@/common/helpers";
import { Box } from "@mui/material";
import TwitchStream from "../../cards/stream/Twitch";
import Loading from "../../layout/Loading/Loading";
import { StreamSettingsContext } from "@/browser/common/context/StreamsSettings";

const styles = {
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
};
const StreamsList: FC = () => {
  const { streamsWithSettings, isLoading, settingsIsLoading, streamSettings } =
    useContext(StreamSettingsContext);

  return (
    <Box sx={styles.wrapper}>
      {isLoading || settingsIsLoading ? (
        <Loading customSx={styles.loading} />
      ) : streamsWithSettings.length > 0 ? (
        streamsWithSettings.map((stream) => <TwitchStream stream={stream} />)
      ) : (
        <Box sx={styles.empty}>{t("noStreams")}</Box>
      )}
    </Box>
  );
};

export default StreamsList;
