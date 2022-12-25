import useSettings from "@/browser/common/hooks/settings";
import { t } from "@/common/helpers";
import { Box, Typography, FormGroup, Switch } from "@mui/material";
import { get, set } from "lodash-es";
import { CSSProperties, FC } from "react";
import SettingWrapper from "./Wrapper";
import SettingLoading from "./SettingLoading";

const styles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  "& .left": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
    width: "100%",
    "& .content": {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      "& .text": {
        display: "flex",
        flexDirection: "column",
        gap: ".25rem",
      },
    },
  },
} as CSSProperties;

interface SwitchProps {
  readonly id: string;
  readonly icon: JSX.Element;
  readonly label: string;
  readonly secondaryText?: boolean;
  readonly setting: string;
  readonly onClick?: () => void;
}

const SwitchSettings: FC<SwitchProps> = ({
  id,
  icon,
  label,
  secondaryText,
  setting,
  onClick = () => {},
}) => {
  const [settings, store] = useSettings();
  const state = get(settings, setting);

  const handleSwitchChange = () => {
    set(settings, setting, !state);

    store.set({
      ...settings,
    });

    onClick();
  };

  return (
    <SettingWrapper id={id} customStyles={styles} onClick={handleSwitchChange}>
      {store.isLoading ? (
        <SettingLoading withSwitch {...{ secondaryText, icon }} />
      ) : (
        <Box className="left">
          {icon}
          <Box className="content">
            <Box className="text">
              <Typography variant="body2">{label}</Typography>
              {secondaryText && (
                <Typography color="text.secondary">{t(state ? "enabled" : "disabled")}</Typography>
              )}
            </Box>

            <FormGroup>
              <Switch checked={state} />
            </FormGroup>
          </Box>
        </Box>
      )}
    </SettingWrapper>
  );
};

export default SwitchSettings;
