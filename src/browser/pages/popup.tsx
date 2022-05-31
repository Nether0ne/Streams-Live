import { FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import tw from "@emotion/styled";
import MainLayout from "../components/layout/MainLayout";
import Settings from "../views/Settings";
import Streams from "../views/Streams";
import Snackbar from "../components/Snackbar";
import { SnackbarProvider } from "../common/context/Snackbar";
import { Box } from "@mui/material";

const styles = {
  height: "550px",
  width: "450px",
};

const Popup: FC = () => {
  return (
    <Box id="root" sx={styles}>
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
    </Box>
  );
};

export default Popup;
