import { FC, SyntheticEvent, useContext } from "react";
import { Alert, IconButton, Snackbar as MuiSnackbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarContext } from "../../common/context/Snackbar";

const styles = {
  "& svg": {
    fontSize: "1rem",
  },
};

const Snackbar: FC = () => {
  const { snackbar, setSnackbar } = useContext(SnackbarContext);
  const { open, message, variant } = snackbar;

  const handleClose = (_event: Event | SyntheticEvent<any, Event>, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ open: false });
  };

  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={<Typography>{message}</Typography>}
      sx={styles}
    >
      <Alert
        severity={variant}
        action={[
          <IconButton size="small" key="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
