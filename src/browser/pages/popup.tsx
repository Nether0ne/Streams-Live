import { FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import MainLayout from "@layout/MainLayout";
import Settings from "@views/Settings";
import Streams from "@views/Streams";
import Snackbar from "@misc/Snackbar";
import { SnackbarProvider } from "@context/Snackbar";
import { Box } from "@mui/material";
import { usePingError } from "@hooks/pingError";
import BackgroundReset from "@modals/BackgroundReset";
import useSettings from "@hooks/settings";
import Loading from "@layout/Loading";

const styles = {
  height: "550px",
  width: "450px",
  fontFamily: "Helvetica",
};

const Popup: FC = () => {
  const [, { isLoading }] = useSettings();
  const [error] = usePingError();

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
          <BackgroundReset isOpen={!!error} />
        </>
      )}
    </Box>
  );
};

export default Popup;
