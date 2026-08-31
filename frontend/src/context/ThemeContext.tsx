import React, { createContext, useContext, useEffect } from "react";
import { useUIStore } from "../store/uiStore";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDark = useUIStore((s) => s.isDark);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const setIsDark = useUIStore((s) => s.setIsDark);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return;
      setIsDark(event.matches);
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [setIsDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  const isDark = useUIStore((s) => s.isDark);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

  if (context) {
    return context;
  }
  return { isDark, toggleTheme };
};
