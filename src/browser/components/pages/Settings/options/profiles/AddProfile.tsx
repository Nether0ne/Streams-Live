import LoginLink from "@/browser/components/LoginLink";
import { Typography, Menu, MenuItem } from "@mui/material";
import SettingWrapper from "../Wrapper";
import AddIcon from "@mui/icons-material/Add";
import { FC, useState } from "react";
import { Platform } from "@/common/types/general";
import { t } from "@/common/helpers";

const styles = {
  wrapper: {
    justifyContent: "start",
    px: 1,
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
  const handleClose = () => setShowProfileSelect(false);

  return (
    <SettingWrapper id="addProfile" customStyles={styles.wrapper} onClick={handleClick}>
      <AddIcon />

      <Typography>{t(`addProfile`)}</Typography>

      <Menu
        open={showProfileSelect}
        onClose={handleClose}
        anchorEl={profileSelectAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {options.map((option) => (
          <LoginLink key={option} platform={option}>
            <MenuItem onClick={handleClose}>{t(option)}</MenuItem>
          </LoginLink>
        ))}
      </Menu>
    </SettingWrapper>
  );
};

export default AddProfile;
