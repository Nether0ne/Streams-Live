import { Box, Button, Link } from "@mui/material";
import { FC } from "react";

const test: FC = () => {
  return (
    <Box width={300}>
      <Link target="_blank">
        <Button>Start with twitch</Button>
      </Link>
    </Box>
  );
};

export default test;
