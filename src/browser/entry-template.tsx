import { createRoot } from "react-dom/client";
import { EntryWrapper } from "@seldszar/yael";
import { ExoticComponent, FC } from "react";
import { HashRouter } from "react-router-dom";
import { GlobalStyles } from "twin.macro";
import useSettings from "./common/hooks/settings";
import { getTheme } from "./common/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";

const wrapper: EntryWrapper<ExoticComponent> = (Component) => {
  const root = createRoot(document.body);

  const App: FC = () => {
    const [settings] = useSettings();
    const { theme, fontSize } = settings.general;
    const currentTheme = getTheme(theme, fontSize);

    return (
      <HashRouter>
        <ThemeProvider theme={currentTheme}>
          <CssBaseline />
          <GlobalStyles />

          <Component />
        </ThemeProvider>
      </HashRouter>
    );
  };

  root.render(<App />);
};

export default wrapper;
