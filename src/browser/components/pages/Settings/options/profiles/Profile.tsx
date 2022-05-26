import { CSSProperties, FC, useContext } from "react";
import { Box, Typography, Tooltip, IconButton, Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { SnackbarContext } from "@/browser/common/context/Snackbar";
import { useProfile } from "@/browser/common/hooks/profile";
import UpdateButton from "@/browser/components/UpdateButton";
import { Platform } from "@/common/types/general";
import { Profile } from "@/common/types/profile";
import { capitalize, sendRuntimeMessage, t } from "@/common/helpers";
import SettingWrapper from "../Wrapper";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem .5rem",
  } as CSSProperties,
  infoWrapper: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "right",
    alignItems: "center",
    gap: 1,
  },
  name: { paddingRight: ".5rem", maxWidth: "8rem" },
  button: { fontSize: "1.25rem" },
  // TODO: no token style
  noToken: {},
};

interface ProfileProps {
  platform: Platform;
}

const ProfileSettings: FC<ProfileProps> = ({ platform }) => {
  const [profile, store] = useProfile(platform);
  const { accessToken, name, avatar } = profile;

  const { setSnackbar } = useContext(SnackbarContext);

  const updateProfile = async () => {
    const profile: Profile = await sendRuntimeMessage(`updateProfile`);

    if (profile && profile.name) {
      setSnackbar({
        open: true,
        message: t("platformProfileUpdated", [profile.name, t(platform)]),
        variant: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: t("platformProfileUpdateFailed", t(platform)),
        variant: "error",
      });
    }
  };

  const logout = () => {
    store.set({
      id: null,
      accessToken: null,
      name: null,
      avatar: null,
      platform,
    });
  };

  return (
    <SettingWrapper id={`${platform}Profile`} customStyles={styles.wrapper} clickable={false}>
      <Typography>{t("platformProfile", t(platform))}</Typography>
      <Box sx={styles.infoWrapper}>
        <Typography noWrap sx={styles.name}>
          {name}
        </Typography>
        {avatar !== null ? (
          <Avatar alt={name as string} src={avatar} />
        ) : (
          <Avatar>{name ? capitalize(name[0]) : "U"}</Avatar>
        )}
        {/* TODO: if no access token -> apply noToken style and update token on refresh */}
        <Tooltip title={<Typography>{t("refreshProfile")}</Typography>} placement="top">
          <Box>
            <UpdateButton sx={styles.button} onClick={updateProfile} />
          </Box>
        </Tooltip>

        <Tooltip title={<Typography>{t("logout")}</Typography>} placement="top">
          <Box>
            <IconButton onClick={logout} sx={styles.button}>
              <LogoutIcon sx={styles.button} />
            </IconButton>
          </Box>
        </Tooltip>
      </Box>
    </SettingWrapper>
  );
};

export default ProfileSettings;
