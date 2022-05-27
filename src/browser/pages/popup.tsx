import { FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import tw from "@emotion/styled";
import MainLayout from "../components/layout/MainLayout";
import Test1 from "../views/test1";
import Settings from "../views/Settings";
import LiveStreams from "../views/LiveStreams";
import Snackbar from "../components/Snackbar";
import { SnackbarProvider } from "../common/context/Snackbar";

const Wrapper = tw.div`
  height: 500px;
`;

const Popup: FC = () => {
  return (
    <Wrapper>
      <SnackbarProvider>
        <MainLayout>
          <Routes>
            <Route index element={<Navigate to="liveStreams" />} />
            <Route path="liveStreams">
              <Route index element={<LiveStreams />} />
              <Route path="liveStreams" element={<LiveStreams />} />
            </Route>
            <Route path="test1">
              <Route index element={<Test1 />} />
              <Route path="test1" element={<Test1 />} />
            </Route>
            <Route path="settings">
              <Route index element={<Settings />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
          <Snackbar />
        </MainLayout>
      </SnackbarProvider>
    </Wrapper>
  );
};

export default Popup;
