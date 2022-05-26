import { Stream } from "@/common/types/stream";
import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import TwitchStream from "../components/cards/stream/Twitch";
import Loading from "../components/layout/Loading/Loading";
import { t } from "@/common/helpers";
import LiveStreamsHeader from "../components/pages/LiveStreams/Header";
import useLiveStreams from "../common/hooks/liveStreams";
import { useStreamSettings } from "../common/hooks";
import { Platform } from "@/common/types/general";
import useSettings from "../common/hooks/settings";
import { useProfile } from "../common/hooks/profile";

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

const LiveStreams: FC = () => {
  const [{ data, isLoading }] = useLiveStreams();
  const [, settingsStore] = useSettings();
  const [twitch, twitchStore] = useProfile(Platform.TWITCH);
  const streams = data;

  const [search, setSearch] = useState("");
  const [filteredStreams, setFilteredStreams] = useState(streams);

  const {
    sortField,
    sortDirection,
    groupBy,
    setSortField,
    reverseSortDirection,
    setGroupBy,
    streamSettingsIsLoading,
  } = useStreamSettings();

  useEffect(() => {
    let arg = sortDirection === "asc" ? 1 : -1;
    if (sortField == "startedAt") {
      arg = sortDirection === "asc" ? -1 : 1;
    }

    streams.sort((a, b) => (a[sortField] > b[sortField] ? arg : -arg));
  }, [streams, sortDirection, sortField, groupBy]);

  useEffect(() => {
    if (search !== "") {
      setFilteredStreams(
        streams.filter(
          (stream: Stream) =>
            stream.title.toLowerCase().includes(search.toLowerCase()) ||
            stream.userName.toLowerCase().includes(search.toLowerCase()) ||
            stream.gameName?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredStreams(streams);
    }
  }, [search, streams]);

  const searchHandler = (value: string) => setSearch(value);

  if (!twitch.accessToken && !twitch.name && !twitchStore.isLoading) {
    return <div>Please login</div>;
  }
  return (
    <Box sx={styles.wrapper}>
      <LiveStreamsHeader
        {...{
          search,
          setSearch: searchHandler,
          streamSettingsIsLoading: settingsStore.isLoading,
          sortField,
          sortDirection,
          groupBy,
          setSortField,
          setSortDirection: reverseSortDirection,
          setGroupBy,
        }}
      />
      <Box sx={styles.streams.wrapper}>
        {isLoading ? (
          <Loading customSx={styles.streams.loading} />
        ) : search === "" ? (
          streams.length > 0 ? (
            streams.map((stream: Stream) => <TwitchStream stream={stream} />)
          ) : (
            <Box sx={styles.streams.empty}>{t("noStreams")}</Box>
          )
        ) : filteredStreams.length > 0 ? (
          filteredStreams.map((stream: Stream) => <TwitchStream stream={stream} />)
        ) : (
          <Box sx={styles.streams.empty}>{t("noFilteredStreams")}</Box>
        )}
      </Box>
    </Box>
  );
};

export default LiveStreams;
