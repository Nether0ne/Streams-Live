import { FC } from "react";
import { Box, Skeleton, Switch } from "@mui/material";

const styles = {
  main: {
    width: "5rem",
  },
  secondary: {
    width: "2.5rem",
  },
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: ".25rem",
  },
  switch: {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      minWidth: "23rem",
    },
    left: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "1rem",
    },
  },
};

interface SettingLoadingProps {
  secondaryText?: boolean;
  withSwitch?: boolean;
}

const SettingLoading: FC<SettingLoadingProps> = ({ secondaryText = true, withSwitch = false }) => {
  return withSwitch ? (
    <Box sx={{ ...styles.switch.wrapper }}>
      <Box sx={styles.textWrapper}>
        <Skeleton sx={styles.main} />
        {secondaryText && <Skeleton sx={styles.secondary} />}
      </Box>

      <Skeleton>
        <Switch />
      </Skeleton>
    </Box>
  ) : (
    <Box sx={styles.textWrapper}>
      <Skeleton sx={styles.main} />
      {secondaryText && <Skeleton sx={styles.secondary} />}
    </Box>
  );
};

export default SettingLoading;
