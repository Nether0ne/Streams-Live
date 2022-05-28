import { Box } from "@mui/material";
import { FC } from "react";
import StreamsHeader from "../components/pages/Streams/Header";
import { useAllSetProfiles } from "../common/hooks/profile";
import { StreamSettingsProvider } from "../common/context/StreamsSettings";
import StreamsList from "../components/pages/Streams/StreamsList";
import Welcome from "../components/pages/Streams/Welcome";
import useSettings from "../common/hooks/settings";
import Loading from "../components/layout/Loading/Loading";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
};

const Streams: FC = () => {
  const [, { isLoading }] = useSettings();
  const profiles = useAllSetProfiles();
  console.log("rerender");
  return (
    <StreamSettingsProvider>
      {isLoading ? (
        <Loading />
      ) : profiles.length > 0 ? (
        <Box sx={styles.wrapper}>
          <StreamsHeader />
          <StreamsList />
        </Box>
      ) : (
        <Welcome />
      )}
    </StreamSettingsProvider>
  );
};

export default Streams;
