import { Box, CircularProgress, Stack } from "@mui/material";
import { CSSProperties } from "@mui/styled-engine";
import { FC } from "react";

interface Props {
  sx?: CSSProperties | undefined;
}

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
  height: "100%",
};

const Loading: FC<Props> = ({ sx }) => {
  return (
    <Box className="loading" sx={{ ...styles, ...sx }}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loading;
