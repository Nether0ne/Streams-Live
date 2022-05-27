import { FC } from "react";
import { Box, Skeleton, Switch } from "@mui/material";

const styles = {
  main: {
    width: "5rem",
  },
  secondary: {
    width: "2.5rem",
  },
  icon: {
    marginRight: "1rem",
  },
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: ".25rem",
    width: "100%",
  },
  switch: {
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      ".MuiSvgIcon-root": {
        marginRight: "1rem",
      },
    },
    left: {
      display: "flex",
      flexDirection: "row",
      alignSelf: "left",
      alignItems: "center",
      gap: "1rem",
    },
    right: {
      mr: ".5rem",
    },
  },
};

interface SettingLoadingProps {
  icon?: JSX.Element;
  secondaryText?: boolean;
  withSwitch?: boolean;
}

const SettingLoading: FC<SettingLoadingProps> = ({
  secondaryText = true,
  withSwitch = false,
  icon,
}) => {
  return withSwitch ? (
    <Box sx={styles.switch.wrapper}>
      {icon}

      <Box sx={styles.textWrapper}>
        <Skeleton sx={styles.main} />
        {secondaryText && <Skeleton sx={styles.secondary} />}
      </Box>

      <Skeleton sx={styles.switch.right}>
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
