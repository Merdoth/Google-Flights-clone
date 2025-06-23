import { useContext } from "react";
import { ThemeContext } from "../utils/ThemeContext";

 const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within ThemeProviderCustom");
  }
  return context;
};

export default useThemeMode;