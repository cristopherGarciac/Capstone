import { useEffect, useState } from "react";

const THEMES = {
  claro: "theme-claro",
  oscuro: "theme-oscuro",
  azul: "theme-azul",
  gamer: "theme-gamer",
  pro: "theme-pro"
};

export function useThemeCuenta() {
  const [theme, setTheme] = useState("claro");

  useEffect(() => {
    const saved = localStorage.getItem("cuentaTheme");
    if (saved && THEMES[saved]) setTheme(saved);
  }, []);

  useEffect(() => {
    document.body.classList.remove(...Object.values(THEMES));
    document.body.classList.add(THEMES[theme]);
    localStorage.setItem("cuentaTheme", theme);
  }, [theme]);

  return { theme, setTheme, THEMES };
}
