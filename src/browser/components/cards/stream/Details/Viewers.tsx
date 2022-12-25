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
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  "& svg": {
    fontSize: "1rem",
    ml: "0.25rem",
    mb: "0.1rem",
  },
  "& .online": {
    color: "#e64c4c",
  },
};

const Viewers: FC<ViewersProps> = ({ count, type }) => {
  const rerun = type === "rerun";

  return (
    <Tooltip
      enterNextDelay={1000}
      title={<Typography>{!rerun ? t("live") : t("rerun")}</Typography>}
      placement="left"
    >
      <Box className="viewers" sx={styles}>
        <Typography className={!rerun ? "online" : ""} variant={"body2"}>
          {digitWithSpaces(count)}
        </Typography>
        {!rerun ? <PeopleIcon className={!rerun ? "online" : ""} /> : <RestoreIcon />}
      </Box>
    </Tooltip>
  );
};

export default Viewers;
