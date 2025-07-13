import { create } from "zustand";

const useDarkMode = create((set) => ({
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,

  setIsDarkMode: () => {
    const themeChange = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const handleThemeChange = () => {
      set({
        isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      });
    };

    themeChange.addEventListener("change", handleThemeChange);
    return () => themeChange.removeEventListener("change", handleThemeChange);
  },
}));

export default useDarkMode;
