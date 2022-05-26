import { Box, Typography, Menu, MenuItem, ListItemIcon, Select, TextField } from "@mui/material";
import { FC, useState } from "react";
import { FontSize, Theme } from "@/common/types/settings";
import { capitalize, t } from "@/common/helpers";
import useSettings from "@/browser/common/hooks/settings";
import Check from "@mui/icons-material/Check";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SettingWrapper from "../Wrapper";

const styles = {
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: ".25rem",
  },
  menuItemWrapper: {
    justifyContent: "right",
  },
  menuItemIcon: {
    fontSize: ".75rem",
  },
};

type FontSizeOption = { value: FontSize; label: string };

const fontSizeOptions: FontSizeOption[] = Object.values(FontSize).map((size) => {
  return { value: size, label: t(`${size}FontSize`) };
});

const FontSizeSetting: FC = () => {
  const [settings, store] = useSettings();
  const { general } = settings;
  const { fontSize } = general;

  const [showFontSelect, setShowFontSelect] = useState(false);
  const [fontMenuAnchorEl, setFontMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (value: FontSize, field: string) => {
    store.set({ ...settings, general: { ...general, [field]: value } });
    setShowFontSelect(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setFontMenuAnchorEl(event.currentTarget);
    setShowFontSelect(true);
  };

  return (
    <SettingWrapper id="fontSize" onClick={handleClick}>
      <TextFieldsIcon />
      <Box sx={styles.textWrapper}>
        <Typography variant="body2">{t("fontSize")}</Typography>
        <Typography color="text.secondary">{t(`${fontSize}fontSize`)}</Typography>
      </Box>

      <Menu
        open={showFontSelect}
        onClose={() => setShowFontSelect(false)}
        anchorEl={fontMenuAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {fontSizeOptions.map((option) => (
          <MenuItem
            selected={option.value === fontSize}
            onClick={(_e) => handleMenuClick(option.value, "fontSize")}
          >
            {option.label}

            {option.value === fontSize && (
              <ListItemIcon sx={styles.menuItemWrapper}>
                <Check sx={styles.menuItemIcon} />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </SettingWrapper>
  );
};

export default FontSizeSetting;
