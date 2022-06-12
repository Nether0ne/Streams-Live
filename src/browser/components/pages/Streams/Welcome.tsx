import { t } from "@/common/helpers";
import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { NavLink } from "react-router-dom";

const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
  gap: 1,
  height: 500,
};

const Welcome: FC = () => {
  return (
    <Box id="welcome" sx={styles}>
      <Typography variant="body2">{t("noProfilesSet")}</Typography>

      <NavLink to="/settings#profiles">
        <Button variant="outlined">
          <Typography variant="body2">{t("goToProfilesSettings")}</Typography>
        </Button>
      </NavLink>
    </Box>
  );
};

export default Welcome;
