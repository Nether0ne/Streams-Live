import { useModal } from "@/browser/common/hooks";
import { PropsOf } from "@emotion/react";
import { Box } from "@mui/material";
import { FC } from "react";
import AboutModal from "../../modals/About";
import Sidebar from "../Sidebar";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  main: {
    overflowY: "scroll",
    height: 500,
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
  const { open, toggleModal } = useModal();

  return (
    <Box sx={styles.wrapper}>
      <Sidebar modalToggler={toggleModal} />
      <Box sx={styles.main}>{children}</Box>
      <AboutModal open={open} hide={toggleModal} />
    </Box>
  );
};

export default MainLayout;
