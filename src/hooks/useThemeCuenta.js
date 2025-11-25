import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const THEMES = {
  claro: "theme-claro",
  oscuro: "theme-oscuro",
  azul: "theme-azul",
  gamer: "theme-gamer",
  pro: "theme-pro"
};

export function useThemeCuenta() {
  const { user, setUser } = useUser();
  const [theme, setThemeState] = useState(user?.themecuenta || "claro");

  // Cargar tema desde el usuario cuando inicia sesión
  useEffect(() => {
    if (user?.themecuenta) {
      setThemeState(user.themecuenta);
    }
  }, [user]);

  // Aplicar theme visual
  useEffect(() => {
    document.body.classList.remove(...Object.values(THEMES));
    document.body.classList.add(THEMES[theme]);
  }, [theme]);

  // Guardar tema en BD
  const setTheme = async (newTheme) => {
    setThemeState(newTheme);

    if (!user?.id) return;

    try {
      const res = await fetch("/api/usuarios/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          theme: newTheme,
        }),
      });

      if (!res.ok) throw new Error("Error actualizando tema");

      const data = await res.json();

      // Actualizar contexto
      setUser((prev) => ({
        ...prev,
        themecuenta: data.themecuenta,
      }));

    } catch (error) {
      console.error("Error guardando tema:", error);
    }
  };

  return { theme, setTheme, THEMES };
}
