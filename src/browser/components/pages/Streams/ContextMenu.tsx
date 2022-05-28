import { t, getLinkForPlatform } from "@/common/helpers";
import { Platform } from "@/common/types/general";
import { Divider, Link, Menu, MenuItem, Typography } from "@mui/material";
import { FC } from "react";
import useContextMenu from "@/browser/common/hooks/contextMenu";

interface StreamContextMenuProps {
  id: string;
  platform: Platform;
}

const styles = {
  menuItem: {
    py: ".25rem",
    px: ".5rem",
    transition: "background-color .5s ease-out",
    "&:hover": {
      transition: "background-color .5s ease-out",
    },
  },
  link: {
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
      open={showMenu !== false}
      anchorReference="anchorPosition"
      anchorPosition={showMenu !== false ? { top: y, left: x } : undefined}
      MenuListProps={contextMenuProps}
    >
      {contextMenuItems.map(({ path, label }) => {
        const href = getLinkForPlatform(platform, `${id}${path}`);

        return (
          <Link href={href} target="_blank" sx={styles.link}>
            <MenuItem sx={styles.menuItem}>
              <Typography>{label}</Typography>
            </MenuItem>
          </Link>
        );
      })}
    </Menu>
  );
};

export default StreamContextMenu;
