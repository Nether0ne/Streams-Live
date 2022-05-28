import { sendRuntimeMessage } from "@/common/helpers";
import { Box, Tooltip, Typography } from "@mui/material";
import { FC, ChangeEvent, useContext } from "react";
import Search from "../../Search";
import UpdateButton from "../../UpdateButton";
import { t } from "@/common/helpers";
import StreamsSettings from "./Settings";
import { StreamSettingsContext } from "@/browser/common/context/StreamsSettings";

const styles = {
  wrapper: {
    width: "100%",
    position: "sticky",
    alignSelf: "center",
    top: 0,
    zIndex: 2000,
    paddingTop: ".5rem",
    bgcolor: "background.default",
  },
  content: {
    width: "24rem",
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: "background.paper",
    borderRadius: 8,
    m: "0 auto",
    px: "1rem",
  },
  input: {
    minWidth: "18rem",
  },
  updateIcon: {
    fontSize: "1.25rem",
  },
};

const searchFieldProps = {
  label: t("search"),
  variant: "filled",
  size: "small",
  color: "primary",
  sx: { ...styles.input },
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
  const handleUpdateClick = () => sendRuntimeMessage("updateStreams", false, true);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.content}>
        <Search search={search} onChange={handleSearchChange} textFieldProps={searchFieldProps} />

        <Tooltip title={<Typography>{t("refreshStreams")}</Typography>} placement="left">
          <Box>
            <UpdateButton onClick={handleUpdateClick} sx={styles.updateIcon} />
          </Box>
        </Tooltip>
      </Box>
      <StreamsSettings />
    </Box>
  );
};

export default StreamsHeader;
