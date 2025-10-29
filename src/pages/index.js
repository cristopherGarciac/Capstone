import { useEffect, useMemo, useState,useContext } from "react";
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

// Botones de categorías
function categoryBtnClasses(estilo, borde) {
  const shape =
    borde === "pill" ? "rounded-full" : borde === "square" ? "rounded-none" : "rounded-lg";
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

// ——— helpers de productos (compatibles con Catálogo)
const precioCLP = (v) =>
  typeof v === "number"
    ? Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(v)
    : v;
const img0 = (p) => (Array.isArray(p.imagenes) && p.imagenes[0]) || p.imagen || "/images/default-product.png";

export default function Home() {
  // —— UI/Auth
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const { user, setUser, logout } = useContext(UserContext);

  // —— Config derivada del localStorage
  const [logo, setLogo] = useState("/images/blitz.png");
  const [nombrePagina, setNombrePagina] = useState("Mi E-commerce");
  const [colorHeader, setColorHeader] = useState("#ffffff");
  const [colorFooter, setColorFooter] = useState("#ffffff");

  // Carrusel
  const [images, setImages] = useState([
    "/images/blitzHardware banner.png",
    "/images/componentes.png",
    "/images/nvidia.png",
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [delayMs, setDelayMs] = useState(5000);

  // HERO / destacados
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

  // Destacados
  const [featuredIdsArr, setFeaturedIdsArr] = useState([]); // <- leemos featuredSelectedIds (array)
  const [productosDestacados, setProductosDestacados] = useState([]);

  // —— Cargar configuración guardada
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

      // Carrusel
      if (Array.isArray(cfg.carrusel) && cfg.carrusel.length) {
        setImages(cfg.carrusel);
        setCurrentSlide(0);
      }
      setAutoPlay(cfg.carruselAuto !== false);
      const ms = Number(cfg.carruselDelaySec) > 0 ? Number(cfg.carruselDelaySec) * 1000 : 5000;
      setDelayMs(ms);

      // HERO
      if (cfg.heroTitulo) setHeroTitulo(cfg.heroTitulo);
      if (cfg.heroSubtitulo) setHeroSubtitulo(cfg.heroSubtitulo);

      // Categorías y botones
      if (Array.isArray(cfg.categorias) && cfg.categorias.length) setCategorias(cfg.categorias);
      if (cfg.btnEstilo) setBtnEstilo(cfg.btnEstilo);
      if (cfg.btnBorde) setBtnBorde(cfg.btnBorde);

      // Featured (nuevo)
      if (Array.isArray(cfg.featuredSelectedIds)) {
        setFeaturedIdsArr(cfg.featuredSelectedIds.filter(Boolean));
      } else if (typeof cfg.featuredProductIds === "string") {
        // migración legacy si quedara
        const arr = cfg.featuredProductIds.split(",").map((s) => s.trim()).filter(Boolean);
        setFeaturedIdsArr(arr);
      }
    } catch (e) {
      console.error("Config inválida:", e);
    }
  }, []);

  // —— Autoplay del carrusel
  useEffect(() => {
    if (!autoPlay || !images.length || !delayMs) return;
    const t = setInterval(() => setCurrentSlide((prev) => (prev + 1) % images.length), delayMs);
    return () => clearInterval(t);
  }, [autoPlay, images, delayMs]);

  // —— Cargar Productos Destacados desde BD según featuredSelectedIds
  useEffect(() => {
    const loadFeatured = async () => {
      if (!featuredIdsArr.length) {
        setProductosDestacados([]); // si no seleccionaste, no mostramos fallback para que sea 100% real
        return;
      }

      const idsParam = encodeURIComponent(featuredIdsArr.join(","));

      // 1) Intento con soporte de IDs en backend
      try {
        const res = await fetch(`/api/productos?ids=${idsParam}`);
        if (!res.ok) throw new Error("no-ids-mode");
        const data = await res.json();
        const list = Array.isArray(data.items) ? data.items : data;

        const norm = (list || []).map((p) => ({
          id: p.id ?? p.uuid ?? p._id,
          nombre: p.titulo ?? p.nombre ?? "Producto",
          descripcion: p.descripcion ?? "",
          precio: typeof p.precio === "number" ? precioCLP(p.precio) : p.precio ?? "$0",
          imagen: img0(p),
        }));

        // Mantener el orden como en featuredIdsArr
        const byId = new Map(norm.map((p) => [String(p.id), p]));
        const ordered = featuredIdsArr.map((id) => byId.get(String(id))).filter(Boolean);
        setProductosDestacados(ordered);
        return;
      } catch (e) {
        // sigue al fallback abajo
      }

      // 2) Fallback: cargo todo y filtro en cliente
      try {
        const resAll = await fetch(`/api/productos?skip=0&take=500`);
        if (!resAll.ok) throw new Error("No se pudo cargar productos");
        const dataAll = await resAll.json();
        const listAll = Array.isArray(dataAll.items) ? dataAll.items : dataAll;

        const mapAll = new Map(
          (listAll || []).map((p) => [String(p.id ?? p.uuid ?? p._id), p])
        );

        const ordered = featuredIdsArr
          .map((id) => mapAll.get(String(id)))
          .filter(Boolean)
          .map((p) => ({
            id: p.id ?? p.uuid ?? p._id,
            nombre: p.titulo ?? p.nombre ?? "Producto",
            descripcion: p.descripcion ?? "",
            precio: typeof p.precio === "number" ? precioCLP(p.precio) : p.precio ?? "$0",
            imagen: img0(p),
          }));

        setProductosDestacados(ordered);
      } catch (err) {
        console.warn("No se pudieron resolver destacados:", err?.message);
        setProductosDestacados([]);
      }
    };

    loadFeatured();
  }, [featuredIdsArr]);

  // Integrar chat de N8N
  useEffect(() => {
    import('@n8n/chat/style.css');  // Importa el CSS necesario para N8N Chat
    import('@n8n/chat').then(({ createChat }) => {
      createChat({
        webhookUrl: 'https://blitzecommerce.app.n8n.cloud/webhook/c29af5d5-e7da-4f6e-a6be-194671bf2ac2/chat', // Reemplaza con tu URL del webhook de N8N
      });
    });
  }, []);

  // —— Login handlers
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
          setUser(data); // Actualiza contexto y localStorage automáticamente
  setLoginOpen(false);
      } else {
        setLoginError(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setLoginError("Ocurrió un error en el servidor.");
    }
  };


  // —— Carrusel controls
  const nextSlide = () => images.length && setCurrentSlide((p) => (p + 1) % images.length);
  const prevSlide = () => images.length && setCurrentSlide((p) => (p - 1 + images.length) % images.length);

  // —— Promos fijas
  const promociones = useMemo(
    () => [
      { texto: "Despacho a Todo Chile", destaque: false },
      { texto: "Marcas Populares", destaque: false },
    ],
    []
  );

  // Slugs categorías
  const categoriasObjs = useMemo(
    () => categorias.map((nombre) => ({ nombre, slug: slugify(nombre) })),
    [categorias]
  );

  return (
    <main className="min-h-screen">
      {/* Barra superior */}
      <div className="bg-[var(--color-secondary)] text-white text-center py-2 text-sm">
        {promociones.map((p, i) => (
          <span key={i} className={`mx-4 ${p.destaque ? "font-semibold" : ""}`}>
            {p.texto}
          </span>
        ))}
      </div>

      {/* Navbar */}
      <nav className="shadow sticky top-0 z-50" style={{ backgroundColor: colorHeader }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link className="logo text-2xl font-bold text-[var(--color-primary)]" href="/">
            <img src={logo} alt="Blitz Hardware Logo" className="h-20 w-auto" />
          </Link>

          <div className="flex items-center space-x-6">
            <span className="text-2xl font-semibold">{nombrePagina}</span>
            <Link href="/" className="text-gray-700 hover:text-[var(--color-primary)]">Inicio</Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-primary)]">Catálogo</Link>
            <Link href="/carrito" className="text-gray-700 hover:text-[var(--color-primary)]">
              <img src="/images/carrito.png" alt="Carrito" className="h-11 w-auto" />
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-[var(--color-primary)]">Admin</Link>

            {user ? (
  <div className="flex items-center space-x-3">
    <span className="text-gray-700 flex items-center">
      Hola, {user.nombre}
    </span>
    <button
      onClick={logout}
      className="text-gray-700 hover:text-[var(--color-accent)] flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
        />
      </svg>
      Cerrar sesión
    </button>
  </div>

            ) : (
              
             <button
                  onClick={() => setLoginOpen(true)}
                  className="text-gray-700 hover:text-[var(--color-accent)] flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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

      {/* Modal de login */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black flex justify-center items-start pt-24 z-50" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button onClick={() => setLoginOpen(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">✕</button>
            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-4 text-center">Iniciar Sesión</h2>

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="Correo electrónico" className="border p-2 rounded" required />
              <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Contraseña" className="border p-2 rounded" required />
              <button type="submit" className="btn-primary w-full">Iniciar Sesión</button>
            </form>

            {loginError && <p className="text-red-500 text-sm mt-2 text-center">{loginError}</p>}

            <div className="flex flex-col items-center text-sm mt-4 gap-2">
              <button className="text-blue-600 hover:underline">Olvidé mi contraseña</button>
              <span>¿No estás registrado?{" "}
                <Link href="/register" className="text-blue-600 hover:underline">Regístrate</Link>
              </span>
            </div>
          </div>
        </div>
      )}


      {/* Carrusel responsivo full-bleed */}
      <section className="w-full">
        <div className="relative w-full overflow-hidden">
          {/* contenedor con aspecto: 21:9 en móviles, 16:9 en sm+, 5:2 en md+ */}
          <div className="relative w-full aspect-[21/9] sm:aspect-video md:aspect-[5/2]">
            {images.length > 0 ? (
              <img
                src={images[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-gray-500 bg-gray-100">
                Sin imágenes
              </div>
            )}
          </div>

          {/* Controles */}
          {images.length > 1 && (
            <>
              <button
                aria-label="Anterior"
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
                onClick={prevSlide}
              >
                &#10094;
              </button>
              <button
                aria-label="Siguiente"
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
                onClick={nextSlide}
              >
                &#10095;
              </button>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Ir al slide ${i + 1}`}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2.5 h-2.5 rounded-full ${i === currentSlide ? "bg-white" : "bg-white/50"} border border-black/10`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Productos destacados (centrados y ordenados) */}
      <section className="py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--color-secondary)]">{heroTitulo}</h2>
            {heroSubtitulo && <p className="text-gray-600 mt-1">{heroSubtitulo}</p>}
          </div>

          {/* Flex wrap + justify-center: 1 se centra; 2 quedan lado a lado y centrados; 3+ llenan filas */}
          <div className="flex flex-wrap justify-center gap-6">
            {productosDestacados.length === 0 && (
              <p className="text-gray-500">No hay productos destacados seleccionados.</p>
            )}

            {productosDestacados.map((prod) => (
              <div
                key={prod.id}
                className="card w-[260px] bg-white/90 backdrop-blur rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className="rounded-t-2xl w-full h-40 object-contain mx-auto"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-[var(--color-secondary)]">{prod.nombre}</h3>
                  {prod.descripcion && (
                    <p className="text-sm text-gray-500 line-clamp-2">{prod.descripcion}</p>
                  )}
                  {prod.precio && (
                    <p className="text-lg font-bold text-[var(--color-primary)] mt-2">
                      {prod.precio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-6xl mx-auto py-12 grid grid-cols-2 md:grid-cols-5 gap-6 px-4">
        {categoriasObjs.map((cat) => (
          <Link key={cat.slug} href={`/catalogo?categoria=${cat.slug}`} className="card text-center p-4">
            <span className={categoryBtnClasses(btnEstilo, btnBorde)}>{cat.nombre}</span>
          </Link>
        ))}
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: colorFooter }} className="text-black mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Ayuda</h4>
            <ul className="space-y-2 text-black">
              <li><Link href="/ayuda" className="hover:text-teal-700">Centro de ayuda</Link></li>
              <li><Link href="/seguimiento" className="hover:text-teal-700">Seguimiento de mi compra</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Nosotros</h4>
            <ul className="space-y-2 text-black">
              <li><Link href="/quienes_somos" className="hover:text-teal-700">Quiénes somos</Link></li>
              <li><Link href="/terminos" className="hover:text-teal-700">Términos y Condiciones</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Comunidad Blitz</h4>
            <ul className="space-y-2 text-black">
              <li>
                <a href="https://www.instagram.com/blitz.hardware?igsh=b29mcW00OGthcnM3" target="_blank" rel="noreferrer" className="hover:text-teal-700">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-black/10" />
        <div className="bg-black/5 text-center text-xs py-3">
          © 2025–2025 | Desarrollado por Cristopher Garcia, Jesus Lagos e Ignacio Varas, Proyecto Capstone
        </div>
      </footer>
    </main>
  );
}