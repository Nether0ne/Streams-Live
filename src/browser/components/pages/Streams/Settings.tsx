import { Box } from "@mui/material";
import { FC } from "react";
import SortField from "./settings/SortField";
import SortDirection from "./settings/SortDirection";
import GroupBy from "./settings/GroupBy";

const styles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignSelf: "center",
  width: "24rem",
  m: "0 auto",
  px: "1rem",
  py: ".25rem",
  "& .right": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: ".25rem",
    ".MuiInput-root": {
      minWidth: "5rem",
    },
  },
  "& .left": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ".MuiInput-root": {
      minWidth: "5.5rem",
    },
  },
};

const StreamsSettings: FC = () => {
  return (
    <Box id="streamsSettings" sx={styles}>
      <Box className="left">
        <GroupBy />
      </Box>

      <Box className="right">
        <SortDirection />
        <SortField />
      </Box>
    </Box>
  );
};

export default StreamsSettings;
