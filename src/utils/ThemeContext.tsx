import {
  createContext,
  useEffect,
  useState,
} from "react";
import type {  ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";

type ThemeContextType = {
  isDay: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderCustom = ({ children }: { children: ReactNode }) => {
  const [isDay, setIsDay] = useState<boolean | null>(null);;

useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDay(savedTheme === 'day');
  }, []);

  useEffect(() => {
    if (isDay !== null) {
      localStorage.setItem('theme', isDay ? 'day' : 'night');
    }
  }, [isDay]);

  const toggleTheme = () => setIsDay((prev) => !prev);

  // ✅ Wait for theme to be loaded before rendering children
  if (isDay === null) return null;

  return (
    <ThemeContext.Provider value={{ isDay, toggleTheme }}>
      <ThemeProvider theme={isDay ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};