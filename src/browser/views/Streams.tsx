import { Box } from "@mui/material";
import { FC } from "react";
import StreamsHeader from "@pages/Streams/Header";
import { useAllSetPlatforms } from "@hooks/platform";
import { StreamSettingsProvider } from "@context/StreamsSettings";
import StreamsList from "@pages/Streams/StreamsList";
import Welcome from "@pages/Streams/Welcome";
import useSettings from "@hooks/settings";
import Loading from "@layout/Loading";

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
