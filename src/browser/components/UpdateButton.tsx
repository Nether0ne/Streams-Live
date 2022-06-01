import { IconButton } from "@mui/material";
import { FC, useState } from "react";
import { keyframes } from "@emotion/react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CSSProperties } from "@mui/styled-engine";

interface UpdateButtonProps {
  readonly sx?: CSSProperties;
  readonly className?: string;
  readonly onClick: () => void;
}

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const UpdateButton: FC<UpdateButtonProps> = ({ sx = {}, className = "", onClick }) => {
  const [spin, setSpin] = useState(false);

  return (
    <IconButton
      disabled={spin}
      onClick={() => {
        setSpin(true);
        onClick();
      }}
      onAnimationEnd={() => {
        setSpin(false);
      }}
      sx={{ ...sx, animation: spin ? `${spinAnimation} 1s ease` : undefined }}
    >
      <RefreshIcon className={className} sx={sx} />
    </IconButton>
  );
};

export default UpdateButton;
