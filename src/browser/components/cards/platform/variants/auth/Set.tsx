import UpdateButton from "@/browser/components/misc/UpdateButton";
import { Platform, PlatformName } from "@/common/types/platform";
import { Avatar, Box, capitalize, IconButton, Tooltip, Typography } from "@mui/material";
import { FC, useContext } from "react";
import PlatformWrapper from "../Wrapper";
import LogoutIcon from "@mui/icons-material/Logout";
import { SnackbarContext } from "@/browser/common/context/Snackbar";
import { defaultPlatformState, sendRuntimeMessage, t } from "@/common/helpers";
import { usePlatform } from "@/browser/common/hooks/platform";

interface SetAuthProfileProps {
  readonly platformName: PlatformName;
}

const SetAuthProfile: FC<SetAuthProfileProps> = ({ platformName }) => {
  const { setSnackbar } = useContext(SnackbarContext);
  const [platform, store] = usePlatform(platformName);
  const { accessToken, data } = platform;
  const { name, avatar } = data || {};

  const updateProfile = async () => {
    const updatedPlatform: Platform = await sendRuntimeMessage(`updatePlatform`, platform);

    if (updatedPlatform && updatedPlatform.data && updatedPlatform.data.name) {
      setSnackbar({
        open: true,
        message: t("platformProfileUpdated", [updatedPlatform.data.name, t(platform.name)]),
        variant: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: t("platformProfileUpdateFailed", t(platform.name)),
        variant: "error",
      });
    }
  };

  const logout = async () => {
    store.set(defaultPlatformState(platform.name, platform.type));
  };

  return (
    <PlatformWrapper
      {...{ platformName }}
      leftChildren={
        <>
          {avatar !== null ? (
            <Avatar alt={name as string} src={avatar} />
          ) : (
            <Avatar>{name ? capitalize(name[0]) : "U"}</Avatar>
          )}

          <Typography noWrap>{name}</Typography>
        </>
      }
      rightChildren={
        <>
          <UpdateButton onClick={updateProfile} tooltip={t("refreshProfile")} />
          <Tooltip title={<Typography>{t("logout")}</Typography>} placement="top">
            <Box>
              <IconButton onClick={logout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Tooltip>
        </>
      }
    />
  );
};

export default SetAuthProfile;
