// src/pages/terminos.js
import { useState, useEffect,useContext} from "react";
import Link from "next/link";
import Image from "next/image";
import { UserContext } from "../context/UserContext";

export default function Terminos() {
  const [loginOpen, setLoginOpen] = useState(false);
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [loginError, setLoginError] = useState("");
    const { user, setUser, logout } = useContext(UserContext);
  
    // Configuración general
    const [logo, setLogo] = useState("/images/blitz.png");
    const [nombrePagina, setNombrePagina] = useState("Mi E-commerce");
    const [colorHeader, setColorHeader] = useState("#ffffff");
    const [colorFooter, setColorFooter] = useState("#ffffff");
    
    // Configuración de Fondo
    const [colorFondo, setColorFondo] = useState("#ffffff");
    const [fondoImagen, setFondoImagen] = useState("");
  
    // Carrusel
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const [delayMs, setDelayMs] = useState(5000);
    const [carruselFit, setCarruselFit] = useState("cover");
  
    // Hero y Textos
    const [heroTitulo, setHeroTitulo] = useState("Productos Destacados");
    const [heroSubtitulo, setHeroSubtitulo] = useState("Lo mejor para tu setup");

  const [config, setConfig] = useState(null);
  const [footerCfg, setFooterCfg] = useState(null);
// Manejo de Login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        setLoginOpen(false);
      } else {
        setLoginError(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error login:", err);
      setLoginError("Error del servidor.");
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedConfig = localStorage.getItem("config");
    if (savedConfig) setConfig(JSON.parse(savedConfig));

    const savedFooter = localStorage.getItem("configFooter");
    if (savedFooter) setFooterCfg(JSON.parse(savedFooter));
  }, []);

  const titulo = footerCfg?.terminosTitulo || "Términos y Condiciones";
  const subtitulo = footerCfg?.terminosSubtitulo || "";
  const contenido = footerCfg?.terminosContenido || "";
  const secciones = footerCfg?.terminosSecciones || [];

  return (
    <main
      className="flex flex-col min-h-screen"
      style={{
        backgroundColor: config?.colorFondo || "#ffffff",
        backgroundImage: config?.fondoImagen ? `url(${config.fondoImagen})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar */}
      <nav
        className="shadow sticky top-0 z-50 transition-colors duration-300"
        style={{ backgroundColor: colorHeader }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className="logo text-2xl font-bold">
            <img src={logo} alt="logo" className="h-20 w-auto" />
          </Link>

          {/* Enlaces */}
          <div className="flex items-center space-x-6">
            <span className="text-2xl font-semibold hidden md:block">
              {nombrePagina}
            </span>

            <Link href="/" className="text-gray-700 hover:text-[var(--color-primary)]">
              Inicio
            </Link>

            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-primary)]">
              Catálogo
            </Link>

            <Link href="/carrito" className="text-gray-700 hover:text-[var(--color-primary)]">
              <img src="/images/carrito.png" className="h-11" alt="carrito" />
            </Link>

            {/* Admin Link */}
            {user?.rol === "admin" && (
              <Link
                href="/admin"
                className="text-gray-700 hover:text-[var(--color-primary)] font-semibold"
              >
                Admin
              </Link>
            )}

            {/* Usuario / Login */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/mi_cuenta"
                  className="text-gray-700 hover:text-[var(--color-primary)]"
                >
                  Hola, {user.nombre}
                </Link>

                <Link href="/mi_cuenta" className="flex items-center">
                  <img
                    src={user.fotoperfil || "/images/default-user.jpg"}
                    alt="perfil"
                    className="h-10 w-10 rounded-full object-cover border border-gray-300 cursor-pointer hover:opacity-90"
                  />
                </Link>
                
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="text-gray-700 hover:text-[var(--color-accent)] flex items-center"
              >
                <svg
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A9.001 9.001 0 0112 15a9.001 9.001 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Modal Login */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[100]">
          <div className="bg-white w-96 p-8 rounded-2xl shadow-xl relative animate-[zoomIn_.15s_ease-out]">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-center mb-6 text-[var(--color-secondary)]">
              Iniciar sesión
            </h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Correo electrónico"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
              />

              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Contraseña"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
              />

              <button
                type="submit"
                className="bg-[var(--color-primary)] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
              >
                Iniciar sesión
              </button>

              <div className="flex flex-col items-center gap-2 mt-2 text-sm">
                <Link
                  href="/recuperar_password"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  Olvidé mi contraseña
                </Link>

                <Link
                  href="/register"
                  className="text-[var(--color-secondary)] hover:underline font-semibold"
                >
                  Crear una cuenta
                </Link>
              </div>
            </form>

            {loginError && (
              <p className="text-red-500 text-center text-sm mt-3">
                {loginError}
              </p>
            )}
          </div>
        </div>
      )}

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex-grow">

        {/* Caja estilo Quiénes Somos */}
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-12">
          <h1 className="text-4xl font-bold text-center mb-6">{titulo}</h1>
          <p className="text-lg text-gray-600 mb-4 text-center">{subtitulo}</p>
          <p className="text-lg text-gray-700 whitespace-pre-line mb-8">
            {contenido}
          </p>
        </div>

        {/* Secciones dinámicas */}
        {Array.isArray(secciones) &&
          secciones.map((sec, i) => (
            <div
              key={i}
              className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-8"
            >
              <h2 className="text-2xl font-semibold mb-3">{sec.titulo}</h2>
              <p className="text-gray-700 whitespace-pre-line">{sec.contenido}</p>
            </div>
          ))}
      </div>

      {/* FOOTER */}
      <footer
        className="text-black mt-auto relative z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]"
        style={{ backgroundColor: config?.colorFooter || "#FFD700" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">

          {/* Ayuda */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-800 border-b-2 border-blue-200 inline-block pb-1">
              Ayuda
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link href="/ayuda" className="hover:text-[var(--color-primary)] transition">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link href="/seguimiento" className="hover:text-[var(--color-primary)] transition">
                  Seguimiento de mi compra
                </Link>
              </li>
            </ul>
          </div>

          {/* Nosotros */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-800 border-b-2 border-blue-200 inline-block pb-1">
              Nosotros
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link href="/quienes_somos" className="hover:text-[var(--color-primary)] transition">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-[var(--color-primary)] transition">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-800 border-b-2 border-blue-200 inline-block pb-1">
              Comunidad
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <a
                  href={footerCfg?.instagramLink || "https://www.instagram.com/blitz.hardware"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--color-primary)] transition flex items-center gap-2"
                >
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* LEGAL FOOTER FINAL */}
        <div className="text-center py-3 text-xs">
          {footerCfg?.footerLegal || "© 2024 Mi Tienda — Todos los derechos reservados"}
        </div>

      </footer>
    </main>
  );
}