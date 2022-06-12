import { usePlatform } from "@/browser/common/hooks/platform";
import { sendRuntimeMessage, t } from "@/common/helpers";
import { FollowedStreamer, PlatformName, PlatformType } from "@/common/types/platform";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { FC, useContext, useState } from "react";
import PlatformWrapper from "../Wrapper";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import UpdateButton from "@/browser/components/misc/UpdateButton";
import { SnackbarContext } from "@/browser/common/context/Snackbar";
import ManageStreamersModal from "@/browser/components/modals/ManageStreamers";

const styles = {
  left: {
    display: "flex",
    flexDirection: "column",
    gap: ".25rem",
    "& .enabled": {
      color: "#27db3c",
    },
  },
};

interface GeneralPlatformProps {
  readonly platformName: PlatformName;
}

const GeneralPlatform: FC<GeneralPlatformProps> = ({ platformName }) => {
  const { setSnackbar } = useContext(SnackbarContext);
  const [open, setOpen] = useState(false);
  const [platform, store] = usePlatform(platformName);

  const manageStreamersToggler = () => setOpen(!open);
  const enablePlatform = async () => {
    await store.set({ ...platform, enabled: true });

    sendRuntimeMessage("updateFollowedStreamers", platform);
  };
  const disablePlatform = async () => {
    await store.set({ ...platform, enabled: false });
  };
  const updateStreamers = async () => {
    try {
      const updatedStreamers: FollowedStreamer[] = await sendRuntimeMessage(
        "updateFollowedStreamers",
        platform
      );

      setSnackbar({
        open: true,
        message: t("platformFollowingChannelsUpdated", [t(platform.name), updatedStreamers.length]),
        variant: "success",
      });
    } catch (e: unknown) {
      setSnackbar({
        open: true,
        message: t("platformFollowingChannelsUpdateFailed", t(platform.name)),
        variant: "error",
      });
    }
  };

  return (
    <PlatformWrapper
      {...{ platformName }}
      leftChildren={
        <Box sx={styles.left}>
          <Typography variant="body2">{t(platformName)}</Typography>
          {platform.enabled && platform.followedStreamers.length > 0 && (
            <Typography color="text.secondary">
              {t("platformFollowingCount", [platform.followedStreamers.length])}
            </Typography>
          )}
        </Box>
      }
      rightChildren={
        platform.enabled ? (
          <>
            <UpdateButton onClick={updateStreamers} tooltip={t("updateFollowingChannels")} />

            {platform.type === PlatformType.LIST && (
              <>
                <Tooltip title={<Typography>Add streamers</Typography>} placement="top">
                  <IconButton onClick={manageStreamersToggler}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <ManageStreamersModal {...{ platformName, open, hide: manageStreamersToggler }} />
              </>
            )}

            <Tooltip title={<Typography>{t("disable", t("platform"))}</Typography>} placement="top">
              <IconButton onClick={disablePlatform}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title={<Typography>{t("enable", t("platform"))}</Typography>} placement="top">
            <IconButton onClick={enablePlatform}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )
      }
    />
  );
};

export default GeneralPlatform;
