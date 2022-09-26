import { t, getLinkForPlatform } from "@/common/helpers";
import { Link, Menu, MenuItem, Typography } from "@mui/material";
import { FC } from "react";
import useContextMenu from "@/browser/common/hooks/contextMenu";
import { LinkType } from "@/common/types/general";
import { Stream } from "@/common/types/stream";

interface StreamContextMenuProps {
  stream: Stream;
}

const styles = {
  "& .menuItem": {
    py: ".25rem",
    px: ".5rem",
    transition: "background-color .5s ease-out",
    "&:hover": {
      transition: "background-color .5s ease-out",
    },
  },
  "& .link": {
    color: "inherit",
    textDecoration: "inherit",
  },
};

const contextMenuProps = {
  disablePadding: true,
};

const contextMenuItems = [
  {
    type: LinkType.STREAM,
    label: t("openStream"),
  },
  {
    type: LinkType.POPOUT,
    label: t("openOnlyStream"),
  },
  {
    type: LinkType.CHAT,
    label: t("openOnlyChat"),
  },
  {
    type: LinkType.VIDEOS,
    label: t("openVideos"),
  },
];

const StreamContextMenu: FC<StreamContextMenuProps> = ({ stream }) => {
  const { id, user } = stream;
  const { x, y, showMenu } = useContextMenu(user);

  return (
    <Menu
      id={`${id}ContextMenu`}
      open={showMenu !== false}
      anchorReference="anchorPosition"
      anchorPosition={showMenu !== false ? { top: y, left: x } : undefined}
      MenuListProps={contextMenuProps}
      sx={styles}
    >
      {contextMenuItems.map(({ type, label }) => {
        const href = getLinkForPlatform(stream, type);

        return href !== "" ? (
          <Link className="link" href={href} target="_blank">
            <MenuItem className="menuItem">
              <Typography>{label}</Typography>
            </MenuItem>
          </Link>
        ) : null;
      })}
    </Menu>
  );
};

export default StreamContextMenu;
