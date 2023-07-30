import { ThemeContext } from "./ThemeProvider";
import { useContext } from "react";

export const useToggleMode = () => {
  const options = useContext(ThemeContext);
  return options;
};
