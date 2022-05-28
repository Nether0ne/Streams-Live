import { PropsOf } from "@emotion/react";
import { Box } from "@mui/material";
import { FC, useState } from "react";
import AboutModal from "../../modals/About";
import DonateModal from "../../modals/Donate";
import Sidebar from "../Sidebar";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  main: {
    overflowY: "scroll",
    height: 550,
    width: 450,

    "::-webkit-scrollbar": {
      width: 5,
    },

    "::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 1px gray",
      borderRadius: 2,
    },

    "::-webkit-scrollbar-thumb": {
      background: "#3f51b5",
      borderRadius: 5,
    },

    "::-webkit-scrollbar-thumb:hover": {
      background: "#344397",
      borderRadius: 10,
    },
  },
};

const MainLayout: FC<PropsOf<any>> = ({ children }) => {
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const aboutModalToggler = () => setAboutModalOpen(!aboutModalOpen);
  const donateModalToggler = () => setDonateModalOpen(!donateModalOpen);

  return (
    <Box sx={styles.wrapper}>
      <Sidebar {...{ aboutModalToggler, donateModalToggler }} />
      <Box sx={styles.main}>{children}</Box>
      <AboutModal open={aboutModalOpen} hide={aboutModalToggler} />
      <DonateModal open={donateModalOpen} hide={donateModalToggler} />
    </Box>
  );
};

export default MainLayout;
