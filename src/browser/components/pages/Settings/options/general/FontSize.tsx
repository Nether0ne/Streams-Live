import { Box, Typography, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { FC, useState } from "react";
import { FontSize } from "@/common/types/settings";
import { t } from "@/common/helpers";
import useSettings from "@/browser/common/hooks/settings";
import Check from "@mui/icons-material/Check";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SettingWrapper from "../Wrapper";
import SettingLoading from "../SettingLoading";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: ".25rem",
};

const menuItem = {
  "& .icon": {
    display: "flex",
    justifyContent: "right",
    "& svg": { fontSize: ".75rem" },
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
      {store.isLoading ? (
        <SettingLoading />
      ) : (
        <Box sx={styles}>
          <Typography variant="body2">{t("fontSize")}</Typography>
          <Typography color="text.secondary">{t(`${fontSize}fontSize`)}</Typography>

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
                sx={menuItem}
                selected={option.value === fontSize}
                onClick={(_e) => handleMenuClick(option.value, "fontSize")}
              >
                <Typography>{option.label}</Typography>

                {option.value === fontSize && (
                  <ListItemIcon className="icon">
                    <Check />
                  </ListItemIcon>
                )}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
    </SettingWrapper>
  );
};

export default FontSizeSetting;
