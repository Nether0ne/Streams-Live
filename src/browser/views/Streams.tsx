import { Box } from "@mui/material";
import { FC } from "react";
import StreamsHeader from "../components/pages/Streams/Header";
import { useAllSetPlatforms } from "../common/hooks/platform";
import { StreamSettingsProvider } from "../common/context/StreamsSettings";
import StreamsList from "../components/pages/Streams/StreamsList";
import Welcome from "../components/pages/Streams/Welcome";
import useSettings from "../common/hooks/settings";
import Loading from "../components/layout/Loading/Loading";

const styles = {
  display: "flex",
  flexDirection: "column",
};

const Streams: FC = () => {
  const [, { isLoading }] = useSettings();
  const profiles = useAllSetPlatforms();

  return (
    <StreamSettingsProvider>
      {isLoading ? (
        <Loading />
      ) : profiles.length > 0 ? (
        <Box id="streams" sx={styles}>
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
