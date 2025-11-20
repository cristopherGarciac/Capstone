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

const precioCLP = (v) =>
  typeof v === "number"
    ? Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(v)
    : v;

const img0 = (p) =>
  (Array.isArray(p.imagenes) && p.imagenes[0]) ||
  p.imagen ||
  "/images/default-product.png";

export default function Home() {
  // === Auth ===
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const { user, setUser, logout } = useContext(UserContext);

  // === Config ===
  const [logo, setLogo] = useState("/images/blitz.png");
  const [nombrePagina, setNombrePagina] = useState("Mi E-commerce");
  const [colorHeader, setColorHeader] = useState("#ffffff");
  const [colorFooter, setColorFooter] = useState("#ffffff");

  // === Carrusel ===
  const [images, setImages] = useState([
    { url: "/images/blitzHardware banner.png", posX: 50, posY: 50, zoom: 100 },
    { url: "/images/componentes.png", posX: 50, posY: 50, zoom: 100 },
    { url: "/images/nvidia.png", posX: 50, posY: 50, zoom: 100 },
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [delayMs, setDelayMs] = useState(5000);

  // === HERO ===
  const [heroTitulo, setHeroTitulo] = useState("Productos Destacados");
  const [heroSubtitulo, setHeroSubtitulo] = useState("Lo mejor para tu setup");

  // === Categorías ===
  const [categorias, setCategorias] = useState([
    "Procesadores",
    "Placas Madre",
    "Tarjetas Gráficas",
    "RAM",
    "Almacenamiento (SSD/HDD)",
  ]);
  const [btnEstilo, setBtnEstilo] = useState("solid");
  const [btnBorde, setBtnBorde] = useState("rounded");

  // === Featured ===
  const [featuredIdsArr, setFeaturedIdsArr] = useState([]);
  const [productosDestacados, setProductosDestacados] = useState([]);

  // === LOAD CONFIG FROM localStorage ===
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

      // Carrusel avanzado con posX, posY, zoom
      if (Array.isArray(cfg.carrusel)) {
        const migrated = cfg.carrusel
          .map((item) => {
            if (typeof item === "string")
              return { url: item, posX: 50, posY: 50, zoom: 100 };
            if (typeof item === "object") {
              return {
                url: item.url || item.src,
                posX: item.posX ?? 50,
                posY: item.posY ?? 50,
                zoom: item.zoom ?? 100,
              };
            }
            return null;
          })
          .filter(Boolean);

        if (migrated.length) setImages(migrated);
      }

      setAutoPlay(cfg.carruselAuto !== false);
      setDelayMs(
        Number(cfg.carruselDelaySec) > 0
          ? Number(cfg.carruselDelaySec) * 1000
          : 5000
      );

      if (cfg.heroTitulo) setHeroTitulo(cfg.heroTitulo);
      if (cfg.heroSubtitulo) setHeroSubtitulo(cfg.heroSubtitulo);

      if (Array.isArray(cfg.categorias)) setCategorias(cfg.categorias);
      if (cfg.btnEstilo) setBtnEstilo(cfg.btnEstilo);
      if (cfg.btnBorde) setBtnBorde(cfg.btnBorde);

      if (Array.isArray(cfg.featuredSelectedIds))
        setFeaturedIdsArr(cfg.featuredSelectedIds.filter(Boolean));
    } catch (e) {
      console.error("Config inválida:", e);
    }
  }, []);

  // === AUTOPLAY ===
  useEffect(() => {
    if (!autoPlay || !images.length) return;
    const t = setInterval(
      () => setCurrentSlide((p) => (p + 1) % images.length),
      delayMs
    );
    return () => clearInterval(t);
  }, [images, autoPlay, delayMs]);

  // === DESTACADOS ===
  useEffect(() => {
    const load = async () => {
      if (!featuredIdsArr.length) return setProductosDestacados([]);

      try {
        const res = await fetch(`/api/productos?skip=0&take=500`);
        const data = await res.json();

        const list = Array.isArray(data.items) ? data.items : data;

        const mapAll = new Map(list.map((p) => [String(p.id), p]));

        const ordered = featuredIdsArr
          .map((id) => mapAll.get(String(id)))
          .filter(Boolean)
          .map((p) => ({
            id: p.id,
            nombre: p.titulo,
            descripcion: p.descripcion,
            precio: precioCLP(p.precio),
            imagen: img0(p),
          }));

        setProductosDestacados(ordered);
      } catch (err) {
        setProductosDestacados([]);
      }
    };
    load();
  }, [featuredIdsArr]);

  // === LOGIN HANDLERS (TU CÓDIGO) ===
  const handleLoginChange = (e) =>
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
    } catch {
      setLoginError("Error en el servidor.");
    }
  };

  const nextSlide = () =>
    setCurrentSlide((p) => (p + 1) % images.length);
  const prevSlide = () =>
    setCurrentSlide((p) => (p - 1 + images.length) % images.length);

  const promociones = useMemo(
    () => [
      { texto: "Despacho a Todo Chile" },
      { texto: "Marcas Populares" },
    ],
    []
  );

  const categoriasObjs = useMemo(
    () => categorias.map((nombre) => ({ nombre, slug: slugify(nombre) })),
    [categorias]
  );

  return (
    <main className="min-h-screen">

      {/* TOP BAR */}
      <div className="bg-[var(--color-secondary)] text-white text-center py-2 text-sm">
        {promociones.map((p, i) => (
          <span key={i} className="mx-4">{p.texto}</span>
        ))}
      </div>

      {/* NAVBAR (IGUAL A TU AMIGO, CON LOGIN TUYO) */}
      <nav
        className="shadow sticky top-0 z-50"
        style={{ backgroundColor: colorHeader }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          {/* LOGO */}
          <Link href="/" className="logo text-2xl font-bold">
            <img src={logo} alt="logo" className="h-20 w-auto" />
          </Link>

          {/* LINKS */}
          <div className="flex items-center space-x-6">
            <span className="text-2xl font-semibold">{nombrePagina}</span>

            <Link href="/" className="text-gray-700 hover:text-[var(--color-primary)]">
              Inicio
            </Link>

            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-primary)]">
              Catálogo
            </Link>

            <Link href="/carrito" className="text-gray-700 hover:text-[var(--color-primary)]">
              <img src="/images/carrito.png" className="h-11" />
            </Link>

            <Link href="/admin" className="text-gray-700 hover:text-[var(--color-primary)]">
              Admin
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/mi_cuenta"
                  className="text-gray-700 hover:text-[var(--color-primary)]"
                >
                  Hola, {user.nombre}
                </Link>

                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-[var(--color-accent)] flex items-center"
                >
                  <svg
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="text-gray-700 hover:text-[var(--color-accent)] flex items-center"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M5.121 17.804A9.001 9.001 0 0112 15a9.001 9.001 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* LOGIN MODAL — TU LOGIN */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-24 z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-4 text-center">
              Iniciar Sesión
            </h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Correo electrónico"
                className="border p-2 rounded"
                required
              />

              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Contraseña"
                className="border p-2 rounded"
                required
              />

              <button type="submit" className="btn-primary w-full">
                Iniciar Sesión
              </button>
            </form>

            {loginError && (
              <p className="text-red-500 text-sm mt-2 text-center">{loginError}</p>
            )}
          </div>
        </div>
      )}

      {/* CARRUSEL FULL */}
      <section className="w-full">
        <div className="relative w-full overflow-hidden">

          <div className="relative w-full aspect-[21/9] sm:aspect-video md:aspect-[5/2]">
            {images.length > 0 ? (
              <img
                src={images[currentSlide].url}
                alt="slide"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: `${images[currentSlide].posX}% ${images[currentSlide].posY}%`,
                  transform: `scale(${images[currentSlide].zoom / 100})`,
                }}
              />
            ) : (
              <div className="absolute inset-0 bg-gray-100 grid place-items-center">
                Sin imágenes
              </div>
            )}
          </div>

          {images.length > 1 && (
            <>
              <button
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
                onClick={prevSlide}
              >
                &#10094;
              </button>

              <button
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
                onClick={nextSlide}
              >
                &#10095;
              </button>
            </>
          )}
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--color-secondary)]">
              {heroTitulo}
            </h2>
            {heroSubtitulo && (
              <p className="text-gray-600 mt-1">{heroSubtitulo}</p>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {productosDestacados.length === 0 && (
              <p className="text-gray-500">No hay productos destacados.</p>
            )}

            {productosDestacados.map((prod) => (
              <div
                key={prod.id}
                className="card w-[260px] bg-white rounded-2xl border shadow-sm"
              >
                <img
                  src={prod.imagen}
                  className="rounded-t-2xl w-full h-40 object-contain"
                />

                <div className="p-4 text-center">
                  <h3 className="font-semibold text-[var(--color-secondary)]">
                    {prod.nombre}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {prod.descripcion}
                  </p>

                  <p className="text-lg font-bold text-[var(--color-primary)] mt-2">
                    {prod.precio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="max-w-6xl mx-auto py-12 grid grid-cols-2 md:grid-cols-5 gap-6 px-4">
        {categoriasObjs.map((cat) => (
          <Link key={cat.slug} href={`/catalogo?categoria=${cat.slug}`}>
            <span className={categoryBtnClasses(btnEstilo, btnBorde)}>
              {cat.nombre}
            </span>
          </Link>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: colorFooter }} className="text-black mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 pl-3">
              Ayuda
            </h4>
            <ul className="space-y-2">
              <li><Link href="/ayuda">Centro de ayuda</Link></li>
              <li><Link href="/seguimiento">Seguimiento de mi compra</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 pl-3">Nosotros</h4>
            <ul className="space-y-2">
              <li><Link href="/quienes_somos">Quiénes somos</Link></li>
              <li><Link href="/terminos">Términos y condiciones</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 pl-3">
              Comunidad
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.instagram.com/blitz.hardware" target="_blank">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-black/10" />

        <div className="bg-black/5 text-center text-xs py-3">
          © 2025 – Proyecto Capstone — Cristopher García & equipo
        </div>
      </footer>
    </main>
  );
}
