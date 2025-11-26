import { useEffect, useMemo, useState, useContext } from "react";
import Link from "next/link";
import { UserContext } from "../context/UserContext";

// Helpers
const slugify = (s = "") =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Estilos de botones de categorías
function categoryBtnClasses(estilo, borde) {
  const shape =
    borde === "pill"
      ? "rounded-full"
      : borde === "square"
      ? "rounded-none"
      : "rounded-lg";
  if (estilo === "outline") {
    return `inline-block ${shape} border px-4 py-2 text-sm 
            border-[var(--color-primary)] text-[var(--color-primary)] 
            hover:bg-[var(--color-primary)] hover:text-white transition`;
  }
  if (estilo === "ghost") {
    return `inline-block ${shape} px-4 py-2 text-sm 
            text-[var(--color-primary)] hover:bg-black/5 transition`;
  }
  return `inline-block ${shape} px-4 py-2 text-sm 
          bg-[var(--color-primary)] text-[var(--colorTextoBtnSolid)] 
          hover:opacity-90 transition`;
}

// Formato de precio CLP
const precioCLP = (v) =>
  typeof v === "number"
    ? Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(
        v
      )
    : v;

// Imagen por defecto
const img0 = (p) =>
  (Array.isArray(p.imagenes) && p.imagenes[0]) ||
  p.imagen ||
  "/images/default-product.png";

export default function Home() {
  // Estado de Auth
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

  // Categorías
  const [categorias, setCategorias] = useState([
    "Procesadores",
    "Placas Madre",
    "Tarjetas Gráficas",
    "RAM",
    "Almacenamiento (SSD/HDD)",
  ]);
  const [btnEstilo, setBtnEstilo] = useState("solid");
  const [btnBorde, setBtnBorde] = useState("rounded");

  // Configuración del Footer
  const [footerCfg, setFooterCfg] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("configFooter");
    if (saved) {
      try {
        setFooterCfg(JSON.parse(saved));
      } catch (e) {
        console.error("Error configFooter:", e);
      }
    }
  }, []);

  // Productos Destacados
  const [featuredIdsArr, setFeaturedIdsArr] = useState([]);
  const [productosDestacados, setProductosDestacados] = useState([]);

  // Cargar configuración desde localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("config");
    if (!saved) return;

    try {
      const cfg = JSON.parse(saved);

      setLogo(cfg.logo || "/images/blitz.png");
      setNombrePagina(cfg.nombrePagina || "Mi E-commerce");
      setColorHeader(cfg.colorHeader || "#ffffff");
      setColorFooter(cfg.colorFooter || "#ffffff");

      // Configuración de Fondo (Body y State)
      const bgColor = cfg.colorFondo || "#ffffff";
      const bgImg = cfg.fondoImagen || "";
      
      setColorFondo(bgColor);
      setFondoImagen(bgImg);

      // Aplicar al body para persistencia visual
      document.body.style.backgroundColor = bgColor;
      if (bgImg) {
        document.body.style.backgroundImage = `url(${bgImg})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
      } else {
        document.body.style.backgroundImage = "";
      }

      // Carrusel
      if (cfg.carruselFit) setCarruselFit(cfg.carruselFit);

      if (Array.isArray(cfg.carrusel) && cfg.carrusel.length) {
        const normalized = cfg.carrusel
          .map((item) => {
            if (typeof item === "string") {
              return { url: item, posX: 50, posY: 50, zoom: 100 };
            }
            if (item && typeof item === "object") {
              return {
                url: item.url || item.src || "",
                posX: typeof item.posX === "number" ? item.posX : 50,
                posY: typeof item.posY === "number" ? item.posY : 50,
                zoom: typeof item.zoom === "number" ? item.zoom : 100,
              };
            }
            return null;
          })
          .filter((x) => x && x.url);
        if (normalized.length) {
          setImages(normalized);
          setCurrentSlide(0);
        }
      }

      setAutoPlay(cfg.carruselAuto !== false);
      const ms =
        Number(cfg.carruselDelaySec) > 0
          ? Number(cfg.carruselDelaySec) * 1000
          : 5000;
      setDelayMs(ms);

      // Hero Textos
      if (cfg.heroTitulo) setHeroTitulo(cfg.heroTitulo);
      if (cfg.heroSubtitulo) setHeroSubtitulo(cfg.heroSubtitulo);

      // Estilos Categorías
      if (Array.isArray(cfg.categorias) && cfg.categorias.length)
        setCategorias(cfg.categorias);
      if (cfg.btnEstilo) setBtnEstilo(cfg.btnEstilo);
      if (cfg.btnBorde) setBtnBorde(cfg.btnBorde);

      // IDs Destacados
      if (Array.isArray(cfg.featuredSelectedIds)) {
        setFeaturedIdsArr(cfg.featuredSelectedIds.filter(Boolean));
      } else if (typeof cfg.featuredProductIds === "string") {
        const arr = cfg.featuredProductIds
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        setFeaturedIdsArr(arr);
      }
    } catch (e) {
      console.error("Config inválida:", e);
    }
  }, []);

  // Autoplay Carrusel
  useEffect(() => {
    if (!autoPlay || !images.length || !delayMs) return;
    const t = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % images.length),
      delayMs
    );
    return () => clearInterval(t);
  }, [autoPlay, images, delayMs]);

  // Cargar data de Productos Destacados
  useEffect(() => {
    const loadFeatured = async () => {
      if (!featuredIdsArr.length) {
        setProductosDestacados([]);
        return;
      }

      const idsParam = encodeURIComponent(featuredIdsArr.join(","));

      // 1. Intentar cargar por IDs específicos
      try {
        const res = await fetch(`/api/productos?ids=${idsParam}`);
        if (!res.ok) throw new Error("no-ids-mode");
        const data = await res.json();
        const list = Array.isArray(data.items) ? data.items : data;

        const norm = (list || []).map((p) => ({
          id: p.id ?? p.uuid ?? p._id,
          nombre: p.titulo ?? p.nombre ?? "Producto",
          descripcion: p.descripcion ?? "",
          precio:
            typeof p.precio === "number"
              ? precioCLP(p.precio)
              : p.precio ?? "$0",
          imagen: img0(p),
        }));

        const byId = new Map(norm.map((p) => [String(p.id), p]));
        const ordered = featuredIdsArr
          .map((id) => byId.get(String(id)))
          .filter(Boolean);
        setProductosDestacados(ordered);
        return;
      } catch (e) {
        // Fallback si falla la carga por IDs
      }

      // 2. Cargar catálogo completo y filtrar
      try {
        const resAll = await fetch(`/api/productos?skip=0&take=500`);
        if (!resAll.ok) throw new Error("Error cargando productos");
        const dataAll = await resAll.json();
        const listAll = Array.isArray(dataAll.items)
          ? dataAll.items
          : dataAll;

        const mapAll = new Map(
          (listAll || []).map((p) => [
            String(p.id ?? p.uuid ?? p._id),
            p,
          ])
        );

        const ordered = featuredIdsArr
          .map((id) => mapAll.get(String(id)))
          .filter(Boolean)
          .map((p) => ({
            id: p.id ?? p.uuid ?? p._id,
            nombre: p.titulo ?? p.nombre ?? "Producto",
            descripcion: p.descripcion ?? "",
            precio:
              typeof p.precio === "number"
                ? precioCLP(p.precio)
                : p.precio ?? "$0",
            imagen: img0(p),
          }));

        setProductosDestacados(ordered);
      } catch (err) {
        console.warn("Error resolviendo destacados:", err?.message);
        setProductosDestacados([]);
      }
    };

    loadFeatured();
  }, [featuredIdsArr]);

 

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

  // Promociones Topbar
  const promociones = useMemo(
    () => [
      { texto: "Despacho a Todo Chile", destaque: false },
      { texto: "Marcas Populares", destaque: false },
    ],
    []
  );

  // Slugs para categorías
  const categoriasObjs = useMemo(
    () => categorias.map((nombre) => ({ nombre, slug: slugify(nombre) })),
    [categorias]
  );

  return (
    <main
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundColor: colorFondo,
        backgroundImage: fondoImagen ? `url(${fondoImagen})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Topbar */}
      <div className="bg-[var(--color-secondary)] text-white text-center py-2 text-sm z-10 relative">
        {promociones.map((p, i) => (
          <span
            key={i}
            className={`mx-4 ${p.destaque ? "font-semibold" : ""}`}
          >
            {p.texto}
          </span>
        ))}
      </div>

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

      {/* Contenido Principal */}
      <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8 z-10">
        <div
          className="max-w-7xl mx-auto rounded-xl shadow-2xl overflow-hidden min-h-[50vh]"
          style={{ backgroundColor: colorFondo }} // Mantiene coherencia con el fondo global
        >
          {/* Carrusel */}
          <section className="w-full relative bg-transparent">
            <div className="relative w-full overflow-hidden aspect-video md:aspect-[3/1] lg:aspect-[21/9]">
              {images.length > 0 ? (
                <div
                  className="absolute inset-0 flex transition-transform duration-700 ease-out h-full"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {images.map((img, idx) => {
                    const posX =
                      typeof img.posX === "number" ? img.posX : 50;
                    const posY =
                      typeof img.posY === "number" ? img.posY : 50;
                    const zoom =
                      typeof img.zoom === "number" ? img.zoom : 100;
                    return (
                      <div
                        key={idx}
                        className="w-full h-full flex-shrink-0 bg-transparent"
                      >
                        <img
                          src={img.url}
                          alt={`Slide ${idx + 1}`}
                          className="w-full h-full"
                          style={{
                            objectFit: carruselFit,
                            objectPosition: `${posX}% ${posY}%`,
                            transform: `scale(${zoom / 100})`,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="absolute inset-0 grid place-items-center text-gray-400 bg-transparent font-medium border-2 border-dashed border-gray-200 m-2 rounded-lg">
                  Sin imágenes en el carrusel
                </div>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-3 h-3 rounded-full border border-white/30 shadow-sm transition-all ${
                        i === currentSlide
                          ? "bg-white scale-125"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Grid Productos Destacados */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)] mb-2">
                  {heroTitulo}
                </h2>
                {heroSubtitulo && (
                  <p className="text-gray-600 text-lg">{heroSubtitulo}</p>
                )}
                <div className="h-1 w-20 bg-[var(--color-primary)] mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="flex flex-wrap justify-center gap-8">
                {productosDestacados.length === 0 && (
                  <p className="text-gray-500 py-10">
                    No hay productos destacados seleccionados.
                  </p>
                )}

                {productosDestacados.map((prod) => (
                  <div
                    key={prod.id}
                    className="card w-[280px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    <div className="p-4 bg-gray-50 rounded-t-2xl">
                      <img
                        src={prod.imagen}
                        alt={prod.nombre}
                        className="w-full h-48 object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col text-center">
                      <h3
                        className="font-semibold text-[var(--color-secondary)] text-lg leading-tight line-clamp-2 mb-2"
                        title={prod.nombre}
                      >
                        {prod.nombre}
                      </h3>
                      {prod.descripcion && (
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
                          {prod.descripcion}
                        </p>
                      )}
                      {prod.precio && (
                        <p className="text-xl font-bold text-[var(--color-primary)] mt-auto">
                          {prod.precio}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Grid Categorías */}
          <section className="max-w-6xl mx-auto pb-16 px-4">
            <h3 className="text-center text-xl font-bold text-gray-400 mb-6 uppercase tracking-wider">
              Categorías
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categoriasObjs.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/catalogo?categoria=${cat.slug}`}
                  className="group text-center"
                >
                  <div className="p-2 transition-transform group-hover:scale-105">
                    <span
                      className={
                        categoryBtnClasses(btnEstilo, btnBorde) +
                        " w-full block truncate"
                      }
                    >
                      {cat.nombre}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{ backgroundColor: colorFooter }}
        className="text-black mt-auto relative z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]"
      >
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-800 border-b-2 border-blue-200 inline-block pb-1">
              Ayuda
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  href="/ayuda"
                  className="hover:text-[var(--color-primary)] transition"
                >
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link
                  href="/seguimiento"
                  className="hover:text-[var(--color-primary)] transition"
                >
                  Seguimiento de mi compra
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-800 border-b-2 border-blue-200 inline-block pb-1">
              Nosotros
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  href="/quienes_somos"
                  className="hover:text-[var(--color-primary)] transition"
                >
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="hover:text-[var(--color-primary)] transition"
                >
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-800 border-b-2 border-blue-200 inline-block pb-1">
              Comunidad
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <a
                  href={
                    footerCfg?.instagramLink ||
                    "https://www.instagram.com/blitz.hardware"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--color-primary)] transition flex items-center gap-2"
                >
                  <span>Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.047-1.096-.047-3.232 0-2.136.009-2.388.047-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-black/5 text-center text-xs py-4 text-gray-500">
          © 2025–2025 | Desarrollado por Cristopher Garcia, Jesus Lagos e
          Ignacio Varas
        </div>
      </footer>
    </main>
  );
}