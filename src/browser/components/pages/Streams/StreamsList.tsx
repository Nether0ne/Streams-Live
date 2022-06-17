import { FC, useContext } from "react";
import { t } from "@common/helpers";
import { Box, Typography } from "@mui/material";
import Loading from "@layout/Loading";
import { StreamSettingsContext } from "@context/StreamsSettings";
import StreamsGroup from "@pages/Streams/StreamsGroup";

const styles = {
  display: "flex",
  flexDirection: "column",
  "& .empty": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: 400,
  },
};

const loadingStyle = {
  height: 400,
};

const StreamsList: FC = () => {
  const { streamGroups, isLoading, settingsIsLoading, streamSettings } =
    useContext(StreamSettingsContext);
  const { search } = streamSettings;

  return (
    <Box id="streamsList" sx={styles}>
      {isLoading || settingsIsLoading ? (
        <Loading sx={loadingStyle} />
      ) : Object.keys(streamGroups).length ? (
        Object.keys(streamGroups)
          .map((key) => {
            return { key, value: streamGroups[key] };
          })
          .map(({ key, value }) => <StreamsGroup {...{ key, group: value }} />)
      ) : (
        <Box className="empty">
          <Typography variant="body2">
            {search === undefined ? t("noStreams") : t("noFilteredStreams")}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default StreamsList;
