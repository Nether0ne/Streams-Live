import { GroupBy, SortDirection, SortField } from "@/common/types/settings";
import { Box, TextField, MenuItem, IconButton, StandardTextFieldProps } from "@mui/material";
import { ChangeEvent, FC } from "react";
import SortIcon from "@mui/icons-material/Sort";
import { t } from "@/common/helpers";

interface LiveStreamsSettingsProps {
  isLoading: boolean;
  sortField: SortField;
  setSortField: (value: SortField) => void;
  sortDirection: SortDirection;
  setSortDirection: (value: SortDirection) => void;
  groupBy: GroupBy;
  setGroupBy: (value: GroupBy) => void;
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "24rem",
    m: "0 auto",
    px: "1rem",
    py: ".25rem",
  },
  right: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: ".25rem",
    ".MuiInput-root": {
      minWidth: "5rem",
    },
  },
  left: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ".MuiInput-root": {
      minWidth: "5.5rem",
    },
  },
  select: {
    ".MuiInputBase-input": {
      p: 0,
      pl: 1,
    },
    ".MuiSvgIcon-root": {
      fontSize: "1.25rem",
    },
    ".MuiSelect-select:focus": {
      backgroundColor: "background.default",
    },
  },
  selectRight: {
    ".MuiSelect-select": {
      minWidth: "3.5rem",
    },
  },
  selectLeft: {
    ".MuiSelect-select": {
      minWidth: "3rem",
    },
  },
  iconButton: {
    padding: ".25rem",
  },
  icon: {
    fontSize: "1rem",
    transform: "scale(-1, 1)",
  },
  iconAsc: { transform: "scale(-1, -1)" },
};

const selectProps: StandardTextFieldProps = {
  select: true,
  variant: "standard",
  size: "small",
  color: "secondary",
  InputProps: {
    sx: { ...styles.select, ...styles.selectLeft },
    disableUnderline: true,
  },
};

const LiveStreamsSettings: FC<LiveStreamsSettingsProps> = ({
  isLoading,
  sortField,
  sortDirection,
  groupBy,
  setSortField,
  setSortDirection,
  setGroupBy,
}) => {
  const changeSortField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setSortField(e.target.value as SortField);
  const changeSortDirection = () =>
    setSortDirection(sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC);
  const changeGroupBy = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGroupBy(e.target.value as GroupBy);
    console.log(e.target);
  };

  return (
    <Box>
      {isLoading ? (
        <div />
      ) : (
        <Box sx={styles.wrapper}>
          <Box sx={styles.left}>
            <TextField {...selectProps} value={groupBy} onChange={changeGroupBy}>
              <MenuItem value={"none"}>{t("noneGroupBy")}</MenuItem>
              <MenuItem value={"platform"}>{t("platformGroupBy")}</MenuItem>
              <MenuItem value={"category"}>{t("categoryGroupBy")}</MenuItem>
            </TextField>
          </Box>
          <Box sx={styles.right}>
            <IconButton sx={styles.iconButton}>
              <SortIcon
                sx={{
                  ...styles.icon,
                  ...(sortDirection == "asc" ? styles.iconAsc : undefined),
                }}
                onClick={changeSortDirection}
              ></SortIcon>
            </IconButton>
            <TextField {...selectProps} value={sortField} onChange={changeSortField}>
              <MenuItem value={"viewersCount"}>{t("viewersSortField")}</MenuItem>
              <MenuItem value={"startedAt"}>{t("uptimeSortField")}</MenuItem>
              <MenuItem value={"userName"}>{t("nameSortField")}</MenuItem>
            </TextField>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LiveStreamsSettings;
