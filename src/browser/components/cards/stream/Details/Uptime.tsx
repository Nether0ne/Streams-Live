import { timeBetweenDates } from "@/common/helpers";
import { Typography } from "@mui/material";
import { FC, useMemo } from "react";
import useNow from "../../../../common/hooks/now";

interface UptimeProps {
  startedAt: string;
  styles: object | undefined;
}

const Uptime: FC<UptimeProps> = ({ startedAt, styles }) => {
  const now = useNow();
  const calculatedUptime = timeBetweenDates(new Date(startedAt), now);

  const uptime = useMemo(() => {
    const { days, hours, minutes, seconds } = calculatedUptime;
    return `${days ? `${days}:` : ""}${hours ? `${hours}:` : ""}${minutes ? `${minutes}:` : ""}${
      seconds ? `${seconds}` : ""
    }`;
  }, [calculatedUptime]);

  return <Typography sx={styles}>{uptime}</Typography>;
};

export default Uptime;
