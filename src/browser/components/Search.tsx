import { Box, TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, FC } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  textFieldProps?: object;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

const styles = {
  wrapper: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
  },
  icon: { color: "action.active", my: 0.5, fontSize: "1.25rem" },
};

const Search: FC<SearchProps> = ({ textFieldProps, search, onChange }) => {
  return (
    <Box sx={styles.wrapper}>
      <SearchIcon sx={styles.icon} />
      <TextField {...textFieldProps} value={search} onChange={onChange} />
    </Box>
  );
};

export default Search;
