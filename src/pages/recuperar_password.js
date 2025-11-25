import { useState, useEffect } from "react";

export default function RecuperarPassword() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [config, setConfig] = useState({});

  // === Cargar configuración desde localStorage ===
  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = localStorage.getItem("config");
    if (!raw) return;

    try {
      const cfg = JSON.parse(raw);
      setConfig(cfg);

      const r = document.documentElement.style;

      // Color primario global (para usar como var(--color-primary))
      r.setProperty("--color-primary", cfg.colorPrimario || "#facc15");

      // Fondo dinámico
      const body = document.body;
      if (cfg.fondoImagen) {
        body.style.backgroundImage = `url(${cfg.fondoImagen})`;
        body.style.backgroundSize = "cover";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundPosition = "center";
      } else {
        body.style.backgroundImage = "";
        body.style.backgroundColor = cfg.colorFondo || "#ffffff";
      }
    } catch (e) {
      console.error("Error cargando configuración:", e);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const res = await fetch("/api/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMensaje(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Contenedor con efecto vidrio */}
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 w-full max-w-md p-8 rounded-2xl shadow-2xl animate-fade-in">
        {/* Logo dinámico */}
        {config.logo && (
          <img
            src={config.logo}
            alt="Logo"
            className="w-32 mx-auto mb-4 drop-shadow-xl"
          />
        )}

        {/* Título */}
        <h2 className="text-2xl font-extrabold text-center mb-4 text-gray-900 drop-shadow">
          Recuperar{" "}
          <span style={{ color: "var(--color-primary)" }}>Contraseña</span>
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
            className="w-full bg-white/40 backdrop-blur px-4 py-3 rounded-xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
            required
          />

          <button
            type="submit"
            className="w-full text-black font-semibold py-3 rounded-xl shadow-md transition active:scale-95"
            style={{
              backgroundColor: "var(--color-primary)",
            }}
          >
            Enviar enlace
          </button>
        </form>

        {/* Mensaje */}
        {mensaje && (
          <p className="text-center text-sm text-gray-100 mt-4 animate-fade-in drop-shadow">
            {mensaje}
          </p>
        )}
      </div>

      {/* Animación */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
