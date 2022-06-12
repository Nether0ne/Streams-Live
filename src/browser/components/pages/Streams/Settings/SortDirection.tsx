import { FC, useContext } from "react";
import { IconButton, Skeleton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { StreamSettingsContext } from "@/browser/common/context/StreamsSettings";
import { SortDirection as SortDirectionEnum } from "@/common/types/settings";

const loadingStyle = {
  width: "0.75rem",
};

const buttonStyle = {
  padding: ".25rem",
  "& svg": {
    fontSize: "1rem",
  },
  "& .desc": {
    transform: "scale(-1, 1)",
  },
  "& .asc": {
    transform: "scale(-1, -1)",
  },
};

const SortDirection: FC = () => {
  const { streamSettings, setStreamsSettings, settingsIsLoading } =
    useContext(StreamSettingsContext);
  const { sortDirection } = streamSettings;

  const changeSortDirection = () =>
    setStreamsSettings({
      sortDirection:
        sortDirection === SortDirectionEnum.ASC ? SortDirectionEnum.DESC : SortDirectionEnum.ASC,
    });

  return settingsIsLoading ? (
    <Skeleton variant="circular" sx={loadingStyle} />
  ) : (
    <IconButton id="sortDirection" sx={buttonStyle} onClick={changeSortDirection}>
      <SortIcon className={sortDirection === SortDirectionEnum.ASC ? "asc" : "desc"} />
    </IconButton>
  );
};

export default SortDirection;
