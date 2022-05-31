import { Stream } from "@/common/types/stream";
import { Box, Link, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import Uptime from "./Details/Uptime";
import Image from "../../Image";
import Viewers from "./Details/Viewers";
import StreamContextMenu from "../../pages/Streams/ContextMenu";
import PlatformIcon from "../../PlatformIcon";
import { getLinkForPlatform } from "@/common/helpers";
import { LinkType } from "@/common/types/general";

interface StreamCardProps {
  stream: Stream;
}

const styles = {
  wrapper: {
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
  },
  thumbnail: {
    inner: {
      display: "flex",
      mr: "1rem",
      alignSelf: "center",
    },
    wrapper: {
      position: "relative",
      overflow: "hidden",
      borderRadius: ".25rem",
      width: "6rem",
      height: "3.35rem",
    },
    image: {
      position: "absolute",
      backgroundColor: "background.paper",
    },
    uptime: {
      color: "#D2D3D3",
      position: "absolute",
      right: 0,
      bottom: 0,
      borderTopLeftRadius: ".25rem",
      backgroundColor: "RGB(0, 0, 0, 0.7)",
      paddingLeft: ".25rem",
      paddingRight: ".25rem",
    },
  },
  info: {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden",
      width: "100%",
    },
    heading: { display: "flex", justifyContent: "space-between" },
    nameAndIcon: { display: "flex", alignItems: "center", flexDirection: "row" },
    name: {
      fontWeight: 600,
      maxWidth: "14rem",
    },
    game: {
      color: "#266798",
    },
    icon: {
      mr: ".5rem",
      fontSize: "1rem",
    },
  },
};

const StreamCard: FC<StreamCardProps> = ({ stream }) => {
  const { user, userLogin, viewers, title, game, thumbnail, startedAt, type, platform } = stream;

  return (
    <Box>
      <StreamContextMenu id={user} platform={platform} />
      <Link
        id={user}
        href={getLinkForPlatform(platform, userLogin, LinkType.STREAM)}
        target="_blank"
        sx={styles.wrapper}
      >
        <Box sx={styles.thumbnail.inner}>
          <Box sx={styles.thumbnail.wrapper}>
            <Image
              src={thumbnail.replace("{width}", "96").replace("{height}", "54")}
              alt={user}
              style={styles.thumbnail.image}
            />

            <Uptime startedAt={startedAt} styles={styles.thumbnail.uptime} />
          </Box>
        </Box>

        <Box sx={styles.info.wrapper}>
          <Box sx={styles.info.heading}>
            <Box sx={styles.info.nameAndIcon}>
              <PlatformIcon platform={platform} sx={styles.info.icon} />

              <Typography noWrap variant={"body2"} sx={styles.info.name}>
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
              <Typography noWrap sx={styles.info.game}>
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
