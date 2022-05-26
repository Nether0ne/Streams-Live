import { sendRuntimeMessage } from "@/common/helpers";
import { Box, Tooltip, Typography } from "@mui/material";
import { FC, ChangeEvent } from "react";
import Search from "../../Search";
import UpdateButton from "../../UpdateButton";
import { t } from "@/common/helpers";
import { SortDirection, SortField, GroupBy } from "@/common/types/settings";
import LiveStreamsSettings from "./Settings";

interface MainHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  streamSettingsIsLoading: boolean;
  sortField: SortField;
  setSortField: (value: SortField) => void;
  sortDirection: SortDirection;
  setSortDirection: (value: SortDirection) => void;
  groupBy: GroupBy;
  setGroupBy: (value: GroupBy) => void;
}

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

const LiveStreamsHeader: FC<MainHeaderProps> = ({
  search,
  setSearch,
  streamSettingsIsLoading,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  groupBy,
  setGroupBy,
}) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleUpdateClick = () => sendRuntimeMessage("updateLiveStreams", false, true);

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
      <LiveStreamsSettings
        {...{
          isLoading: streamSettingsIsLoading,
          sortField,
          sortDirection,
          groupBy,
          setSortField,
          setSortDirection,
          setGroupBy,
        }}
      />
    </Box>
  );
};

export default LiveStreamsHeader;
