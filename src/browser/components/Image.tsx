import { FC, useState } from "react";
import { Box, Fade } from "@mui/material";

interface ImageProps {
  src: string;
  alt: string;
  style: object | undefined;
}

const Image: FC<ImageProps> = ({ src, alt, style }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Box sx={style}>
      {loaded ? null : <Box sx={style} />}
      <Fade in={loaded}>
        <img src={src} alt={alt} onLoad={() => setLoaded(true)} />
      </Fade>
    </Box>
  );
};

export default Image;
