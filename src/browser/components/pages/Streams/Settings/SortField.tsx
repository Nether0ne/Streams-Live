import { StreamSettingsContext } from "@/browser/common/context/StreamsSettings";
import { t } from "@/common/helpers";
import { SortField as SortFieldEnum } from "@/common/types/settings";
import { MenuItem, Skeleton, StandardTextFieldProps, TextField } from "@mui/material";
import { ChangeEvent, FC, useContext } from "react";

const loadingStyle = {
  width: "5rem",
  pl: 1,
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
  ".MuiSelect-select": {
    minWidth: "3rem",
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

const sortFieldOptions: SortFieldEnum[] = Object.values(SortFieldEnum);

const SortField: FC = () => {
  const { streamSettings, setStreamsSettings, settingsIsLoading } =
    useContext(StreamSettingsContext);
  const { sortField } = streamSettings;

  const changeSortField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setStreamsSettings({ sortField: e.target.value as SortFieldEnum });

  return settingsIsLoading ? (
    <Skeleton sx={loadingStyle} />
  ) : (
    <TextField id="sortField" {...selectProps} value={sortField} onChange={changeSortField}>
      {sortFieldOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {t(`${option}SortField`)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SortField;
