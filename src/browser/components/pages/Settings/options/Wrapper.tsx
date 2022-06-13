import { Box, BoxProps, SxProps, Theme } from "@mui/material";
import { CSSProperties } from "@mui/styled-engine";
import { FC } from "react";

const styles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "center",
  gap: "1rem",
  px: 1,
  py: 2,
  transition: "background-color .5s ease-out",
  "&:hover": {
    backgroundColor: "background.paper",
    transition: "background-color .5s ease-out",
  },
  userSelect: "none",
} as CSSProperties;

const clickableStyle = {
  cursor: "pointer",
} as CSSProperties;

interface SettingWrapperProps {
  readonly id: string;
  readonly customStyles?: CSSProperties;
  readonly children: JSX.Element[] | JSX.Element;
  readonly clickable?: boolean;
  readonly onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SettingWrapper: FC<SettingWrapperProps> = ({
  id,
  customStyles = {},
  children,
  clickable = true,
  onClick,
}) => {
  const sx = [{ ...styles }, { ...(clickable ? clickableStyle : undefined) }, { ...customStyles }];

  return (
    <Box id={id} sx={sx} onClick={onClick}>
      {children}
    </Box>
  );
};

export default SettingWrapper;
