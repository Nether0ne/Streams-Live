import { FC, useContext } from "react";
import { IconButton, Skeleton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { StreamSettingsContext } from "@/browser/common/context/StreamsSettings";
import { SortDirection as SortDirectionEnum } from "@/common/types/settings";

const styles = {
  loading: { width: "0.75rem" },
  iconButton: {
    padding: ".25rem",
  },
  icon: {
    fontSize: "1rem",
    transform: "scale(-1, 1)",
  },
  iconAsc: { transform: "scale(-1, -1)" },
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
    <Skeleton variant="circular" sx={styles.loading} />
  ) : (
    <IconButton id="sortDirection" sx={styles.iconButton} onClick={changeSortDirection}>
      <SortIcon
        sx={{
          ...styles.icon,
          ...(sortDirection == SortDirectionEnum.ASC ? styles.iconAsc : undefined),
        }}
      />
    </IconButton>
  );
};

export default SortDirection;
