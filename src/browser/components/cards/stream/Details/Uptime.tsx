import { timeBetweenDates } from "@common/helpers";
import { SxProps, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import useNow from "@hooks/now";

interface UptimeProps {
  readonly startedAt: string;
  readonly styles?: SxProps;
  readonly className?: string;
}

const Uptime: FC<UptimeProps> = ({ startedAt, styles = {}, className = "" }) => {
  const now = useNow();
  const calculatedUptime = timeBetweenDates(new Date(startedAt), now);

  const uptime = useMemo(() => {
    const { days, hours, minutes, seconds } = calculatedUptime;
    return `${days ? `${days}:` : ""}${hours ? `${hours}:` : ""}${minutes ? `${minutes}:` : ""}${
      seconds ? `${seconds}` : ""
    }`;
  }, [calculatedUptime]);

  return (
    <Typography sx={styles} className={className}>
      {uptime}
    </Typography>
  );
};

export default Uptime;
