import { Stream } from "@/common/types/stream";
import { Box, Link, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import Image from "../../misc/Image";
import StreamContextMenu from "../../pages/Streams/ContextMenu";
import PlatformIcon from "../../misc/PlatformIcon";
import { getLinkForPlatform, t } from "@/common/helpers";
import { LinkType } from "@/common/types/general";
import useSettings from "@/browser/common/hooks/settings";
import StreamCardSkeleton from "./Skeleton";
import Uptime from "./Details/Uptime";
import Viewers from "./Details/Viewers";

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
        "& img": {
          width: "96px",
          height: "54px",
        },
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
  const [
    {
      general: { useCustomStreamCard, customStreamCard },
    },
    store,
  ] = useSettings();

  if (store.isLoading) {
    return <StreamCardSkeleton />;
  }

  return (
    <Box sx={styles}>
      <StreamContextMenu stream={stream} />
      <Link
        id={user}
        href={getLinkForPlatform(stream, LinkType.STREAM)}
        target="_blank"
        className="stream"
      >
        {(!useCustomStreamCard || (useCustomStreamCard && customStreamCard.thumbnail)) && (
          <Box className="thumbnail">
            <Box className="thumbnailWrapper">
              <Image src={thumbnail} alt={user} className="image" />

              {startedAt && <Uptime startedAt={startedAt} className="uptime" />}
            </Box>
          </Box>
        )}
        <Box className="info">
          <Box className="mainWrapper">
            <Box className="main">
              {(!useCustomStreamCard || (useCustomStreamCard && customStreamCard.platformIcon)) && (
                <PlatformIcon platformName={platform} />
              )}

              <Typography noWrap variant={"body2"}>
                {user}
              </Typography>
            </Box>

            {(!useCustomStreamCard || (useCustomStreamCard && customStreamCard.viewers)) && (
              <Viewers type={type} count={viewers} />
            )}
          </Box>

          {(!useCustomStreamCard || (useCustomStreamCard && customStreamCard.title)) && (
            <Tooltip
              title={<Typography>{title}</Typography>}
              enterNextDelay={1000}
              followCursor
              arrow
            >
              <Typography noWrap color="text.secondary">
                {title}&nbsp;
              </Typography>
            </Tooltip>
          )}

          {(!useCustomStreamCard || (useCustomStreamCard && customStreamCard.category)) && (
            <Typography className="game" noWrap>
              {game || t("noCategory")}&nbsp;
            </Typography>
          )}
        </Box>
      </Link>
    </Box>
  );
};

export default StreamCard;
