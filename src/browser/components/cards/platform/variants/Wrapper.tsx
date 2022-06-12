import PlatformIcon from "@/browser/components/misc/PlatformIcon";
import { PlatformName } from "@/common/types/platform";
import { Box } from "@mui/material";
import { FC } from "react";

const styles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  px: 1,
  py: 2,
  transition: "background-color .5s ease-out",
  "&:hover": {
    backgroundColor: "background.paper",
    transition: "background-color .5s ease-out",
  },
  "& .left, & .right": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
  },
  "& .left": {
    justifyContent: "start",
  },
  "& .right": {
    justifyContent: "end",
    pr: ".25rem",
    "& svg": {
      fontSize: "1.25rem",
    },
  },
};

interface PlatformWrapperProps {
  readonly platformName: PlatformName;
  readonly leftChildren: JSX.Element;
  readonly rightChildren: JSX.Element;
  readonly onClick?: () => void;
}

const PlatformWrapper: FC<PlatformWrapperProps> = ({
  platformName,
  leftChildren,
  rightChildren,
}) => {
  return (
    <Box sx={styles}>
      <Box className="left">
        <PlatformIcon {...{ platformName }} />
        {leftChildren}
      </Box>
      <Box className="right">{rightChildren}</Box>
    </Box>
  );
};

export default PlatformWrapper;
