import useSettings from "@/browser/common/hooks/settings";
import { t } from "@/common/helpers";
import { Box, Typography, FormGroup, Switch } from "@mui/material";
import { get, set } from "lodash-es";
import { FC } from "react";
import SettingWrapper from "./Wrapper";

const styles = {
  wrapper: {
    justifyContent: "space-between",
  },
  left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
  },
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: ".25rem",
  },
};

interface SwitchProps {
  readonly id: string;
  readonly icon: JSX.Element;
  readonly label: string;
  readonly secondaryText?: boolean;
  readonly setting: string;
}

const SwitchSettings: FC<SwitchProps> = ({ id, icon, label, secondaryText, setting }) => {
  const [settings, store] = useSettings();
  const state = get(settings, setting);

  const handleThemeDivClick = () => {
    set(settings, setting, !state);

    store.set({
      ...settings,
    });
  };

  return (
    <SettingWrapper id={id} customStyles={styles.wrapper} onClick={handleThemeDivClick}>
      <Box sx={styles.left}>
        {icon}
        <Box sx={styles.textWrapper}>
          <Typography variant="body2">{label}</Typography>
          {secondaryText && (
            <Typography color="text.secondary">{t(state ? "enabled" : "disabled")}</Typography>
          )}
        </Box>
      </Box>

      <FormGroup>
        <Switch checked={state} />
      </FormGroup>
    </SettingWrapper>
  );
};

export default SwitchSettings;
