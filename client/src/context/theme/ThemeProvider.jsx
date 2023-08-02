import PropTypes from "prop-types";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  useMediaQuery,
} from "@mui/material";
import { createContext, useMemo, useState } from "react";

export const ThemeContext = createContext();

const ThemeProviderContext = ({ children }) => {
  const preferedMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState(() => (preferedMode ? "dark" : "light"));

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProviderContext.propTypes = {
  children: PropTypes.any,
};

export default ThemeProviderContext;
