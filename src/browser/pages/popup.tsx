import { FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import MainLayout from "../components/layout/MainLayout";
import Settings from "../views/Settings";
import Streams from "../views/Streams";
import Snackbar from "../components/misc/Snackbar";
import { SnackbarProvider } from "../common/context/Snackbar";
import { Box } from "@mui/material";
import { usePingError } from "../common/hooks/pingError";
import BackgroundReset from "../components/modals/BackgroundReset";
import useSettings from "../common/hooks/settings";
import Loading from "../components/layout/Loading/Loading";
import { useExpiredPlatform } from "../common/hooks/platform";
import PlatformExpiredModal from "../components/modals/PlatformExpired";

const styles = {
  height: "550px",
  width: "450px",
  fontFamily: "Helvetica",
};

const Popup: FC = () => {
  const [, { isLoading }] = useSettings();
  const [error] = usePingError();
  const expiredPlatform = useExpiredPlatform();

  return (
    <Box id="root" sx={styles}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <SnackbarProvider>
            <MainLayout>
              <Routes>
                <Route index element={<Navigate to="streams" />} />
                <Route path="streams">
                  <Route index element={<Streams />} />
                  <Route path="streams" element={<Streams />} />
                </Route>
                <Route path="settings">
                  <Route index element={<Settings />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
              <Snackbar />
            </MainLayout>
          </SnackbarProvider>
          <BackgroundReset open={!!error} />
          {expiredPlatform && (
            <PlatformExpiredModal open={!!expiredPlatform} platformName={expiredPlatform} />
          )}
        </>
      )}
    </Box>
  );
};

export default Popup;
