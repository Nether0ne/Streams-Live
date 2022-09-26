import { Stream } from "@/common/types/stream";
import { Box, Link, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import Uptime from "./details/Uptime";
import Image from "../../misc/Image";
import Viewers from "./details/Viewers";
import StreamContextMenu from "../../pages/Streams/ContextMenu";
import PlatformIcon from "../../misc/PlatformIcon";
import { getLinkForPlatform } from "@/common/helpers";
import { LinkType } from "@/common/types/general";

interface StreamCardProps {
  readonly stream: Stream;
}

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
      "& .mainWrapper": {
        display: "flex",
        justifyContent: "space-between",
        "& .main": {
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
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

const StreamCard: FC<StreamCardProps> = ({ stream }) => {
  const { user, viewers, title, game, thumbnail, startedAt, type, platform } = stream;

  return (
    <Box sx={styles}>
      <StreamContextMenu stream={stream} />
      <Link
        id={user}
        href={getLinkForPlatform(stream, LinkType.STREAM)}
        target="_blank"
        className="stream"
      >
        <Box className="thumbnail">
          <Box className="thumbnailWrapper">
            <Image src={thumbnail} alt={user} className="image" />

            {startedAt && <Uptime startedAt={startedAt} className="uptime" />}
          </Box>
        </Box>

        <Box className="info">
          <Box className="mainWrapper">
            <Box className="main">
              <PlatformIcon platformName={platform} />

              <Typography noWrap variant={"body2"}>
                {user}
              </Typography>
            </Box>

            <Viewers type={type} count={viewers} />
          </Box>

          <Tooltip
            title={<Typography>{title}</Typography>}
            enterNextDelay={1000}
            followCursor
            arrow
          >
            <Typography noWrap color="text.secondary">
              {title}
            </Typography>
          </Tooltip>

          {game && (
            <Tooltip
              title={<Typography>{game}</Typography>}
              enterNextDelay={1000}
              followCursor
              arrow
            >
              <Typography className="game" noWrap>
                {game}
              </Typography>
            </Tooltip>
          )}
        </Box>
      </Link>
    </Box>
  );
};

export default StreamCard;
