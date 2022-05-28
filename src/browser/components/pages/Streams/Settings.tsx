import { Box } from "@mui/material";
import { FC } from "react";
import SortField from "./Settings/SortField";
import SortDirection from "./Settings/SortDirection";
import GroupBy from "./Settings/GroupBy";

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
};

const StreamsSettings: FC = () => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.left}>
        <GroupBy />
      </Box>

      <Box sx={styles.right}>
        <SortDirection />
        <SortField />
      </Box>
    </Box>
  );
};

export default StreamsSettings;
