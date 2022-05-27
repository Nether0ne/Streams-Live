import { FC, useState } from "react";
import SettingWrapper from "../Wrapper";
import { t } from "@/common/helpers";
import { Box, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import FactoryResetModal from "@/browser/components/modals/FactoryReset";

const styles = {
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: ".25rem",
  },
};

const ResetSetting: FC = () => {
  const [open, setOpenDialog] = useState(false);

  const openDialog = () => setOpenDialog(true);
  const hideDialog = () => setOpenDialog(false);

  return (
    <SettingWrapper id="import" onClick={openDialog}>
      <ReportProblemIcon />
      <Box sx={styles.textWrapper}>
        <Typography variant="body2">{t("resetSetting")}</Typography>
        <Typography color="text.secondary">{t(`resetSettingDescription`)}</Typography>
      </Box>
      <FactoryResetModal open={open} hide={hideDialog} />
    </SettingWrapper>
  );
};

export default ResetSetting;
