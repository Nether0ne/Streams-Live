import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { FC, useState } from "react";
import { keyframes } from "@emotion/react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CSSProperties } from "@mui/styled-engine";
import { t } from "@/common/helpers";

interface UpdateButtonProps {
  readonly sx?: CSSProperties;
  readonly className?: string;
  readonly tooltip?: string;
  readonly tooltipPlacement?: "top" | "bottom" | "left" | "right";
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

const UpdateButton: FC<UpdateButtonProps> = ({
  sx = {},
  className = "",
  tooltip,
  tooltipPlacement,
  onClick,
}) => {
  const [spin, setSpin] = useState(false);

  return (
    <Tooltip
      title={<Typography>{tooltip ? tooltip : t("refresh")}</Typography>}
      placement={tooltipPlacement || "top"}
    >
      <span>
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
      </span>
    </Tooltip>
  );
};

export default UpdateButton;
