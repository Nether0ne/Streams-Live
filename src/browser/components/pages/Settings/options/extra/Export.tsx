import { FC, useContext } from "react";
import SettingWrapper from "../Wrapper";
import { sendRuntimeMessage, t } from "@/common/helpers";
import { Box, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { SnackbarContext } from "@/browser/common/context/Snackbar";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: ".25rem",
};

const ExportSetting: FC = () => {
  const { setSnackbar } = useContext(SnackbarContext);

  const handleClick = async () => {
    try {
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(await sendRuntimeMessage("backup"))], {
          type: "application/json",
        })
      );

      const anchor = document.createElement("a");

      anchor.setAttribute("download", `StreamsNow_${new Date().toLocaleString()}.json`);
      anchor.setAttribute("href", url);
      anchor.click();

      URL.revokeObjectURL(url);

      setSnackbar({
        open: true,
        message: t("actionSuccess", t("exportSetting")),
        variant: "success",
      });
    } catch (e: unknown) {
      setSnackbar({
        open: true,
        message: t("actionFailed", t("exportSetting")),
        variant: "error",
      });
    }
  };

  return (
    <SettingWrapper id="export" onClick={handleClick}>
      <DownloadIcon />
      <Box sx={styles}>
        <Typography variant="body2">{t("exportSetting")}</Typography>
        <Typography color="text.secondary">{t(`exportSettingDescription`)}</Typography>
      </Box>
    </SettingWrapper>
  );
};

export default ExportSetting;
