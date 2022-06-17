import { FC, useState } from "react";
import SettingWrapper from "@pages/Settings/options/Wrapper";
import { t } from "@common/helpers";
import { Box, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import FactoryResetModal from "@modals/FactoryReset";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: ".25rem",
};

const ResetSetting: FC = () => {
  const [open, setOpenDialog] = useState(false);

  const openDialog = () => setOpenDialog(true);
  const hideDialog = () => setOpenDialog(false);

  return (
    <SettingWrapper id="reset" onClick={openDialog}>
      <ReportProblemIcon />
      <Box sx={styles}>
        <Typography variant="body2">{t("resetSetting")}</Typography>
        <Typography color="text.secondary">{t(`resetSettingDescription`)}</Typography>
      </Box>
      <FactoryResetModal open={open} hide={hideDialog} />
    </SettingWrapper>
  );
};

export default ResetSetting;
