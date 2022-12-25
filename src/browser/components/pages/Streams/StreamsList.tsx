import { FC, useContext } from "react";
import { t } from "@/common/helpers";
import { Box, Typography } from "@mui/material";
import Loading from "../../layout/Loading/Loading";
import { StreamSettingsContext } from "@/browser/common/context/StreamsSettings";
import StreamsGroup from "./StreamsGroup";
import useSettings from "@/browser/common/hooks/settings";

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
  const [, store] = useSettings();

  return (
    <Box id="streamsList" sx={styles}>
      {isLoading || settingsIsLoading || store.isLoading ? (
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
            {search === "" ? t("noStreams") : t("noFilteredStreams")}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default StreamsList;
