import { sendRuntimeMessage } from "@common/helpers";
import { Box } from "@mui/material";
import { FC, ChangeEvent, useContext } from "react";
import Search from "@misc/Search";
import UpdateButton from "@misc/UpdateButton";
import { t } from "@common/helpers";
import StreamsSettings from "@pages/Streams/Settings";
import { StreamSettingsContext } from "@context/StreamsSettings";

const styles = {
  zIndex: 1,
  width: "100%",
  position: "sticky",
  alignSelf: "center",
  top: 0,
  paddingTop: ".5rem",
  bgcolor: "background.default",
  "& .search": {
    width: "24rem",
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: "background.paper",
    borderRadius: 8,
    m: "0 auto",
    px: "1rem",
    "& .refreshButton": {
      fontSize: "1.25rem",
    },
  },
};

const searchFieldProps = {
  label: t("search"),
  variant: "filled",
  size: "small",
  color: "primary",
  sx: {
    minWidth: "18rem",
  },
  InputProps: {
    disableUnderline: true,
    sx: { input: { backgroundColor: "background.paper" } },
  },
};

const StreamsHeader: FC = () => {
  const { streamSettings, setStreamsSettings } = useContext(StreamSettingsContext);
  const { search } = streamSettings;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setStreamsSettings({ search: e.target.value });
  const handleUpdateClick = () => sendRuntimeMessage("updateStreams", true);

  return (
    <Box id="streamsHeader" sx={styles}>
      <Box className="search">
        <Search input={search} onChange={handleSearchChange} textFieldProps={searchFieldProps} />

        <UpdateButton
          className="refreshButton"
          onClick={handleUpdateClick}
          tooltip={t("refreshStreams")}
        />
      </Box>
      <StreamsSettings />
    </Box>
  );
};

export default StreamsHeader;
