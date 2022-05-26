import { AlertColor } from "@mui/material";
import { FC, useState, createContext } from "react";

interface SnackbarProps {
  children: JSX.Element;
}

interface SnackbarState {
  open: boolean;
  message?: string | null;
  variant?: AlertColor | undefined;
}

export const SnackbarContext = createContext({
  snackbar: { open: false, message: "", variant: undefined } as SnackbarState,
  setSnackbar: (state: SnackbarState) => {},
});

export const SnackbarProvider: FC<SnackbarProps> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    variant: undefined,
  });

  const handleSnackbarSet = (state: SnackbarState) => {
    setSnackbar({ ...snackbar, ...state });
  };

  const contextValue = {
    snackbar,
    setSnackbar: handleSnackbarSet,
  };

  return <SnackbarContext.Provider value={contextValue}>{children}</SnackbarContext.Provider>;
};
