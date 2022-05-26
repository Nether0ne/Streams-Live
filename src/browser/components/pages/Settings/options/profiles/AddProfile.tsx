import LoginLink from "@/browser/components/LoginLink";
import { Box, Typography, Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import SettingWrapper from "../Wrapper";
import AddIcon from "@mui/icons-material/Add";
import { FC, useState } from "react";
import { Platform } from "@/common/types/general";
import { t } from "@/common/helpers";

const styles = {
  wrapper: {
    justifyContent: "space-between",
    px: 1,
  },
  icon: {
    fontSize: "1.25rem",
  },
};

interface AddProfileProps {
  readonly options: Platform[];
}

const AddProfile: FC<AddProfileProps> = ({ options }) => {
  const [showProfileSelect, setShowProfileSelect] = useState(false);
  const [profileSelectAnchorEl, setProfileSelectAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setProfileSelectAnchorEl(event.currentTarget);
    setShowProfileSelect(true);
  };

  return (
    <SettingWrapper id="addProfile" customStyles={styles.wrapper} onClick={handleClick}>
      <Typography>{t(`addProfile`)}</Typography>

      <Tooltip title={<Typography>{t("addProfile")}</Typography>} placement="left">
        <IconButton>
          <AddIcon sx={styles.icon} />
        </IconButton>
      </Tooltip>

      <Menu
        open={showProfileSelect}
        onClose={() => setShowProfileSelect(false)}
        anchorEl={profileSelectAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {options.map((option) => (
          <LoginLink key={option} platform={option}>
            <MenuItem>{t(option)}</MenuItem>
          </LoginLink>
        ))}
      </Menu>
    </SettingWrapper>
  );
};

export default AddProfile;
