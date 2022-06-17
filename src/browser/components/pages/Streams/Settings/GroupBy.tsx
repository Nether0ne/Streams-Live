import { ChangeEvent, FC, useContext } from "react";
import { StreamSettingsContext } from "@context/StreamsSettings";
import { GroupBy as GroupByEnum } from "@customTypes/settings";
import { MenuItem, Skeleton, StandardTextFieldProps, TextField } from "@mui/material";
import { t } from "@common/helpers";

const loadingStyle = {
  width: "5rem",
};

const selectStyle = {
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
};

const selectProps: StandardTextFieldProps = {
  select: true,
  variant: "standard",
  size: "small",
  color: "secondary",
  InputProps: {
    sx: { ...selectStyle },
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
    <Skeleton sx={loadingStyle} />
  ) : (
    <TextField id="groupBy" {...selectProps} value={groupBy} onChange={changeGroupBy}>
      {groupByOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {t(`${option}GroupBy`)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default GroupBy;
