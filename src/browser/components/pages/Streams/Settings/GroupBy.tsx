import { ChangeEvent, FC, useContext } from "react";
import { StreamSettingsContext } from "@/browser/common/context/StreamsSettings";
import { GroupBy as GroupByEnum } from "@/common/types/settings";
import { MenuItem, Skeleton, StandardTextFieldProps, TextField } from "@mui/material";
import { t } from "@/common/helpers";

const styles = {
  loader: {
    width: "5rem",
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
    // Adjusts select icon to left
    ".MuiSelect-select": {
      minWidth: "3rem",
      paddingLeft: "1.5rem",
    },
    "	.MuiSelect-icon": {
      left: 0,
    },
  },
};

const selectProps: StandardTextFieldProps = {
  select: true,
  variant: "standard",
  size: "small",
  color: "secondary",
  InputProps: {
    sx: { ...styles.select },
    disableUnderline: true,
  },
};

const groupByOptions: GroupByEnum[] = Object.values(GroupByEnum);

const GroupBy: FC = () => {
  const { streamSettings, setStreamsSettings, settingsIsLoading } =
    useContext(StreamSettingsContext);
  const { groupBy } = streamSettings;

  const changeGroupBy = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStreamsSettings({ groupBy: e.target.value as GroupByEnum });
  };

  return settingsIsLoading ? (
    <Skeleton sx={styles.loader} />
  ) : (
    <TextField {...selectProps} value={groupBy} onChange={changeGroupBy}>
      {groupByOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {t(`${option}GroupBy`)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default GroupBy;
