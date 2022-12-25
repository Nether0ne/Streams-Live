import { FC } from "react";
import { Box, Skeleton, Switch, SxProps } from "@mui/material";

const styles = {
  display: "flex",
  width: "100%",
  "& svg": { marginRight: "1rem" },
  "& .text": {
    display: "flex",
    flexDirection: "column",
    gap: ".25rem",
    width: "100%",
  },
  "& .switch": {
    justifyContent: "space-between",
    alignItems: "center",
    ".MuiSvgIcon-root": {
      marginRight: "1rem",
    },
  },
  "& .main": { width: "5rem" },
  "& .secondary": { width: "2.5rem" },
  "& .right": { mr: ".5rem" },
};

interface SettingLoadingProps {
  readonly icon?: JSX.Element;
  readonly secondaryText?: boolean;
  readonly withSwitch?: boolean;
  readonly sx?: SxProps;
}

const SettingLoading: FC<SettingLoadingProps> = ({
  secondaryText = true,
  withSwitch = false,
  icon,
  sx = {},
}) => {
  return (
    <Box sx={{ ...styles, ...sx }}>
      {icon}

      <Box className="text">
        <Skeleton className="main" />
        {secondaryText && <Skeleton className="secondary" />}
      </Box>

      {withSwitch && (
        <Skeleton className="right">
          <Switch />
        </Skeleton>
      )}
    </Box>
  );
};

export default SettingLoading;
