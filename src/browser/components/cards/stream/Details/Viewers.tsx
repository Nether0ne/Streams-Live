import { digitWithSpaces, t } from "@/common/helpers";
import { Box, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import PeopleIcon from "@mui/icons-material/People";
import RestoreIcon from "@mui/icons-material/Restore";

interface ViewersProps {
  readonly type: "live" | "rerun" | null;
  readonly count: number;
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  icon: {
    fontSize: "1rem",
    ml: "0.25rem",
    mb: "0.1rem",
  },
  online: { color: "#e64c4c" },
};

const Viewers: FC<ViewersProps> = ({ count, type }) => {
  if (type == "rerun") {
    return (
      <Box sx={styles.wrapper}>
        <Tooltip title={<Typography>{t("rerun")}</Typography>} placement="left">
          <Box sx={styles.wrapper}>
            <Typography variant={"body2"}>
              {digitWithSpaces(count)}
              <RestoreIcon sx={styles.icon} />
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box sx={styles.wrapper}>
      <Tooltip title={<Typography>{t("live")}</Typography>} placement="left">
        <Box sx={{ ...styles.wrapper, ...styles.online }}>
          <Typography variant={"body2"}>{digitWithSpaces(count)}</Typography>
          <PeopleIcon sx={styles.icon} />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default Viewers;
