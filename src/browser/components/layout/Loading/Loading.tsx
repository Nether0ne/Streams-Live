import { Box, CircularProgress, Stack } from "@mui/material";
import { CSSProperties } from "@mui/styled-engine";
import { FC } from "react";

interface Props {
  customSx?: CSSProperties | undefined;
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
  },
};

const Loading: FC<Props> = ({ customSx }) => {
  const sx = [{ ...styles.wrapper }, { ...customSx }];
  return (
    <Box sx={sx}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loading;
