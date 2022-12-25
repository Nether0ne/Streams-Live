import { FC, useContext } from "react";
import { IconButton, Skeleton, Tooltip, Typography } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { StreamSettingsContext } from "@/browser/common/context/StreamsSettings";
import { SortDirection as SortDirectionEnum } from "@/common/types/settings";
import { t } from "@/common/helpers";

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
  const { sortDirection, sortField } = streamSettings;

  const changeSortDirection = () =>
    setStreamsSettings({
      sortDirection:
        sortDirection === SortDirectionEnum.ASC ? SortDirectionEnum.DESC : SortDirectionEnum.ASC,
    });

  return settingsIsLoading ? (
    <Skeleton variant="circular" sx={loadingStyle} />
  ) : (
    <Tooltip
      enterNextDelay={1000}
      title={<Typography>{t(sortDirection, [t(`${sortField}SortField`)])}</Typography>}
      placement="top"
    >
      <IconButton id="sortDirection" sx={buttonStyle} onClick={changeSortDirection}>
        <SortIcon className={sortDirection === SortDirectionEnum.ASC ? "asc" : "desc"} />
      </IconButton>
    </Tooltip>
  );
};

export default SortDirection;
