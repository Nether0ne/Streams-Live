import { t, getLinkForPlatform } from "@/common/helpers";
import { Platform } from "@/common/types/general";
import { Link, Menu, MenuItem, Typography } from "@mui/material";
import { FC } from "react";
import useContextMenu from "@/browser/common/hooks/contextMenu";

interface StreamContextMenuProps {
  id: string;
  platform: Platform;
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
    path: "/",
    label: t("openStream"),
  },
  {
    path: "/popout",
    label: t("openOnlyStream"),
  },
  {
    path: "/chat",
    label: t("openOnlyChat"),
  },
  {
    path: "/videos",
    label: t("openVideos"),
  },
];

const StreamContextMenu: FC<StreamContextMenuProps> = ({ id, platform }) => {
  const { x, y, showMenu } = useContextMenu(id);

  return (
    <Menu
      id={`${id}ContextMenu`}
      open={showMenu !== false}
      anchorReference="anchorPosition"
      anchorPosition={showMenu !== false ? { top: y, left: x } : undefined}
      MenuListProps={contextMenuProps}
      sx={styles}
    >
      {contextMenuItems.map(({ path, label }) => {
        const href = getLinkForPlatform(platform, `${id}${path}`);

        return (
          <Link className="link" href={href} target="_blank">
            <MenuItem className="menuItem">
              <Typography>{label}</Typography>
            </MenuItem>
          </Link>
        );
      })}
    </Menu>
  );
};

export default StreamContextMenu;
