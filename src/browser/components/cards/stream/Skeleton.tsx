import { Box, Link, Skeleton, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import { getLinkForPlatform, t } from "@/common/helpers";
import { LinkType } from "@/common/types/general";
import useSettings from "@/browser/common/hooks/settings";

const styles = {
  "& .stream": {
    color: "inherit",
    textDecoration: "inherit",
    display: "flex",
    flexDirection: "row",
    p: 1,
    px: 2,
    transition: "background-color .5s ease-out",
    "&:hover": {
      backgroundColor: "background.paper",
      transition: "background-color .5s ease-out",
    },
    "& .thumbnail": {
      display: "flex",
      mr: "1rem",
      alignSelf: "center",
      "& .thumbnailWrapper": {
        position: "relative",
        overflow: "hidden",
        borderRadius: ".25rem",
        width: "6rem",
        height: "3.35rem",
      },
      "& .image": {
        position: "absolute",
        backgroundColor: "background.paper",
      },
    },
    "& .uptime": {
      color: "#D2D3D3",
      position: "absolute",
      right: 0,
      bottom: 0,
      borderTopLeftRadius: ".25rem",
      backgroundColor: "RGB(0, 0, 0, 0.7)",
      paddingLeft: ".25rem",
      paddingRight: ".25rem",
    },
    "& .info": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden",
      width: "100%",
      gap: 0.5,
      "& .mainWrapper": {
        display: "flex",
        justifyContent: "space-between",
        "& .main": {
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 0.5,
          "& svg": {
            mr: ".5rem",
            fontSize: "1rem",
          },
          "& .name": {
            fontWeight: 600,
            maxWidth: "14rem",
          },
        },
      },
    },
    "& .game": {
      color: "#266798",
    },
  },
};

const StreamCardSkeleton: FC = () => {
  const [
    {
      general: { useCustomStreamCard, customStreamCard },
    },
    store,
  ] = useSettings();

  if (store.isLoading) {
    return null;
  }

  return (
    <Box sx={styles}>
      <Box className={"stream"}>
        {(!useCustomStreamCard || (useCustomStreamCard && customStreamCard.thumbnail)) && (
          <Box className="thumbnail">
            <Box className="thumbnailWrapper">
              <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
            </Box>
          </Box>
        )}
        <Box className="info">
          <Box className="mainWrapper">
            <Box className="main">
              {(!useCustomStreamCard || (useCustomStreamCard && customStreamCard.platformIcon)) && (
                <Skeleton variant="circular" width={"20px"} height={"20px"} />
              )}

              <Skeleton variant="rectangular" width={"80px"} height={"14px"} />
            </Box>

            {(!useCustomStreamCard || (useCustomStreamCard && customStreamCard.viewers)) && (
              <Skeleton variant="rectangular" width={"60px"} height={"14px"} />
            )}
          </Box>

          {(!useCustomStreamCard || (useCustomStreamCard && customStreamCard.title)) && (
            <Skeleton variant="rectangular" width={"100"} height={"12px"} />
          )}

          {(!useCustomStreamCard || (useCustomStreamCard && customStreamCard.category)) && (
            <Skeleton variant="rectangular" width={"100"} height={"12px"} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StreamCardSkeleton;
