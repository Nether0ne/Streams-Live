import { FC, useContext } from "react";
import SettingWrapper from "../Wrapper";
import UploadIcon from "@mui/icons-material/Upload";
import { sendRuntimeMessage, t } from "@/common/helpers";
import { Box, Typography } from "@mui/material";
import { SnackbarContext } from "@/browser/common/context/Snackbar";

const styles = {
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: ".25rem",
  },
};

const ImportSetting: FC = () => {
  const { setSnackbar } = useContext(SnackbarContext);

  const handleClick = () => {
    const input = document.createElement("input");

    input.addEventListener("change", async () => {
      const file = input.files?.item(0);

      if (file?.type === "application/json") {
        await sendRuntimeMessage("restore", JSON.parse(await file.text()));
        setSnackbar({
          open: true,
          message: t("actionSuccess", t("importSetting")),
          variant: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: t("invalidFile"),
          variant: "error",
        });
      }
    });

    input.setAttribute("type", "file");
    input.click();
  };

  return (
    <SettingWrapper id="import" onClick={handleClick}>
      <UploadIcon />
      <Box sx={styles.textWrapper}>
        <Typography variant="body2">{t("importSetting")}</Typography>
        <Typography color="text.secondary">{t(`importSettingDescription`)}</Typography>
      </Box>
    </SettingWrapper>
  );
};

export default ImportSetting;
