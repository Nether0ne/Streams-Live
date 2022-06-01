import { FC, useState } from "react";
import { Box, Fade, SxProps } from "@mui/material";

interface ImageProps {
  src: string;
  alt: string;
  style?: SxProps;
  className?: string;
}

const Image: FC<ImageProps> = ({ src, alt, style = {}, className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Box sx={style} className={className}>
      {loaded ? null : <Box sx={style} />}
      <Fade in={loaded}>
        <img src={src} alt={alt} onLoad={() => setLoaded(true)} />
      </Fade>
    </Box>
  );
};

export default Image;
