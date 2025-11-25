import { useEffect, useMemo, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Link from "next/link";

export default function Catalogo() {
  // ---------------- estado remoto ----------------
  const [rawItems, setRawItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // ---------- login ----------
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const { user, setUser } = useContext(UserContext);

  // --------- config general -----------
  const [logo, setLogo] = useState("/images/blitz.png");
  const [nombrePagina, setNombrePagina] = useState("Mi E-commerce");
  const [colorHeader, setColorHeader] = useState("#ffffff");
  const [colorFooter, setColorFooter] = useState("#ffffff");

  // --------- config fondo -----------
  const [colorFondo, setColorFondo] = useState("#ffffff");
  const [fondoImagen, setFondoImagen] = useState("");

  // Cargar configuración al iniciar
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedConfig = localStorage.getItem("config");
    
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);

        // Configuración básica
        setLogo(config.logo || "/images/blitz.png");
        setNombrePagina(config.nombrePagina || "Mi E-commerce");
        setColorHeader(config.colorHeader || "#ffffff");
        setColorFooter(config.colorFooter || "#ffffff");

        // Lógica de Fondo (Igual al Index)
        const bgColor = config.colorFondo || "#ffffff";
        const bgImg = config.fondoImagen || "";

        setColorFondo(bgColor);
        setFondoImagen(bgImg);

        // Aplicar al body directamente para persistencia visual
        document.body.style.backgroundColor = "#f3f4f6"; // Color base
        if (bgImg) {
          document.body.style.backgroundImage = `url(${bgImg})`;
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          document.body.style.backgroundAttachment = "fixed";
          document.body.style.backgroundPosition = "center";
        } else {
          document.body.style.backgroundImage = "";
        }

        // Variables CSS para botones (Conservado de tu código)
        const r = document.documentElement.style;
        if (config.btnBg) r.setProperty("--btn-bg", config.btnBg);
        if (config.btnText) r.setProperty("--btn-text", config.btnText);
        if (config.btnBorder) r.setProperty("--btn-border", config.btnBorder);
        if (config.btnHoverBg) r.setProperty("--btn-hover-bg", config.btnHoverBg);
        if (config.btnHoverText) r.setProperty("--btn-hover-text", config.btnHoverText);

      } catch (e) {
        console.error("Error cargando configuración:", e);
      }
    }
  }, []);

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
      console.error("Error al iniciar sesión:", err);
      setLoginError("Ocurrió un error en el servidor.");
    }
  };

  // Traemos productos
  async function cargar() {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`/api/productos?skip=0&take=500`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo cargar el catálogo");
      }
      const data = await res.json();
      setRawItems(Array.isArray(data.items) ? data.items : data);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  // helpers
  const precioCLP = (v) =>
    typeof v === "number"
      ? Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
        }).format(v)
      : v;

  const img0 = (p) =>
    (Array.isArray(p.imagenes) && p.imagenes[0]) ||
    "/images/default-product.png";

  // filtros & orden
  const [q, setQ] = useState("");
  const [categoria, setCategoria] = useState("");
  const [sort, setSort] = useState("alpha_asc");

  const categorias = useMemo(() => {
    const set = new Set(rawItems.map((p) => p.categoria).filter(Boolean));
    return ["Todas", ...Array.from(set)];
  }, [rawItems]);

  const [qDebounced, setQDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setQDebounced(q.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [q]);

  const items = useMemo(() => {
    let list = [...rawItems];

    if (qDebounced) {
      list = list.filter((p) => {
        const titulo = (p.titulo || "").toString().toLowerCase();
        const sku = (p.sku || "").toString().toLowerCase();
        return titulo.includes(qDebounced) || sku.includes(qDebounced);
      });
    }

    if (categoria && categoria !== "Todas") {
      list = list.filter((p) => (p.categoria || "") === categoria);
    }

    list.sort((a, b) => {
      const ta = (a.titulo || "").toString().toLowerCase();
      const tb = (b.titulo || "").toString().toLowerCase();
      const pa = typeof a.precio === "number" ? a.precio : Number(a.precio || 0);
      const pb = typeof b.precio === "number" ? b.precio : Number(b.precio || 0);

      switch (sort) {
        case "alpha_desc":
          return tb.localeCompare(ta, "es");
        case "price_asc":
          return pa - pb;
        case "price_desc":
          return pb - pa;
        case "alpha_asc":
        default:
          return ta.localeCompare(tb, "es");
      }
    });

    return list;
  }, [rawItems, qDebounced, categoria, sort]);

  return (
    <div
      className="min-h-screen flex flex-col relative"
      // ESTE div externo maneja la IMAGEN DE FONDO GLOBAL (Fixed)
      style={{
        backgroundImage: fondoImagen ? `url(${fondoImagen})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "transparent" 
      }}
    >
      {/* 🎨 Estilos globales para botones con variables configurables */}
      <style jsx global>{`
        .btn-primary {
          background: var(--btn-bg, #7e22ce);
          color: var(--btn-text, #ffffff);
          border: 1px solid var(--btn-border, #7e22ce);
          transition: background 0.2s, color 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .btn-primary:hover {
          background: var(--btn-hover-bg, #6b21a8);
          color: var(--btn-hover-text, #ffffff);
          border-color: var(--btn-hover-bg, #6b21a8);
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }
        .btn-outline {
          background: transparent;
          color: var(--btn-bg, #7e22ce);
          border: 1px solid var(--btn-border, #7e22ce);
          transition: background 0.2s, color 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .btn-outline:hover {
          background: var(--btn-hover-bg, #6b21a8);
          color: var(--btn-hover-text, #ffffff);
          border-color: var(--btn-hover-bg, #6b21a8);
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }
      `}</style>

      {/* NAVBAR */}
      <nav
        className="shadow sticky top-0 z-50 transition-colors duration-300"
        style={{ backgroundColor: colorHeader }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* LOGO */}
          <Link href="/" className="logo text-2xl font-bold">
            <img src={logo} alt="logo" className="h-20 w-auto" />
          </Link>

          {/* LINKS */}
          <div className="flex items-center space-x-6">
            <span className="text-2xl font-semibold hidden md:block">{nombrePagina}</span>

            <Link href="/" className="text-gray-700 hover:text-[var(--color-primary)]">
              Inicio
            </Link>

            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-primary)]">
              Catálogo
            </Link>

            <Link href="/carrito" className="text-gray-700 hover:text-[var(--color-primary)]">
              <img src="/images/carrito.png" className="h-11" alt="Carrito" />
            </Link>

            {/* SOLO ADMIN VE EL BOTÓN */}
            {user?.rol === "admin" && (
              <Link
                href="/admin"
                className="text-gray-700 hover:text-[var(--color-primary)] font-semibold"
              >
                Admin
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/mi_cuenta" className="text-gray-700 hover:text-[var(--color-primary)]">
                  Hola, {user.nombre}
                </Link>

                {/* Ver mi cuenta */}
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

      {/* LOGIN MODAL */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-24 z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative animate-[zoomIn_.15s_ease-out]">
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
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
              />

              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Contraseña"
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
              />

              <button type="submit" className="btn-primary w-full py-2 rounded">
                Iniciar Sesión
              </button>
            </form>

            {loginError && (
              <p className="text-red-500 text-sm mt-2 text-center">{loginError}</p>
            )}
            
            <div className="flex flex-col items-center text-sm mt-4 gap-2">
                <Link href="/recuperar_password" className="text-[var(--color-primary)] hover:underline">
                  Olvidé mi contraseña
                </Link>
                <span>
                  ¿No estás registrado?{" "}
                  <Link href="/registro" className="text-[var(--color-secondary)] hover:underline font-semibold">
                    Crear una cuenta
                  </Link>
                </span>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 🚀 CONTENEDOR FLOTANTE CON COLOR SÓLIDO (TARJETA) 🚀 */}
      {/* ================================================================= */}
      <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8 z-10">
        
        {/* Este DIV es la "tarjeta" que lleva el color de fondo configurado (ej: mostaza) */}
        <div 
          className="max-w-7xl mx-auto rounded-xl shadow-2xl overflow-hidden min-h-[50vh] p-6 sm:p-8"
          style={{ backgroundColor: colorFondo }} // <--- AQUI SE APLICA EL COLOR DE FONDO SÓLIDO
        >
          
          {/* Título del Catálogo */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Catálogo</h1>
            <div className="flex items-center gap-2 text-sm">
            </div>
          </div>

          {/* Barra de Filtros (dentro de la tarjeta) */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-3 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buscar por nombre o id
              </label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ej: RTX 3060, POL-BLANCA-M..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>

            <div className="min-w-[220px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                value={categoria || "Todas"}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              >
                {categorias.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-[220px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              >
                <option value="alpha_asc">Alfabético (A → Z)</option>
                <option value="alpha_desc">Alfabético (Z → A)</option>
                <option value="price_asc">Precio (menor → mayor)</option>
                <option value="price_desc">Precio (mayor → menor)</option>
              </select>
            </div>

            <button
              onClick={cargar}
              className="btn-outline px-6 py-2 rounded-lg font-medium"
              title="Recargar desde el servidor"
            >
              Refrescar
            </button>
          </div>

          {loading && <p className="text-gray-800 mb-4 text-center font-medium">Cargando productos…</p>}
          {err && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-center">
              {err}
            </div>
          )}

          {/* Grid de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((p) => (
              <article
                key={p.id}
                className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Cinta STOCK */}
                {p.stock > 0 && (
                  <div className="absolute top-4 left-0 z-10">
                    <span className="bg-[#69b248] text-white text-[10px] font-bold px-3 py-1 rounded-r-full shadow-sm">
                      STOCK
                    </span>
                  </div>
                )}

                {/* Sticker esquina */}
                {p.etiqueta && (
                  <div className="absolute top-0 right-0 z-10">
                    <span className="bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm">
                      {p.etiqueta}
                    </span>
                  </div>
                )}

                {/* Imagen */}
                <div className="bg-gray-50 h-56 w-full p-4 flex items-center justify-center">
                  <img
                    src={img0(p)}
                    alt={p.titulo}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>

                {/* Contenido de la Card */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                    {p.marca ? ` / ${p.marca}` : p.categoria ? ` / ${p.categoria}` : ""}
                  </div>

                  <h3
                    className="text-gray-800 font-bold text-lg leading-tight line-clamp-2 mb-2"
                    title={p.titulo}
                  >
                    {p.titulo}
                  </h3>

                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-end gap-2 mb-3">
                      <span className="text-2xl font-bold text-[#d43a94]">
                        {precioCLP(Number(p.precio))}
                      </span>

                      {Number(p.precioAnterior) > Number(p.precio) && (
                        <div className="flex flex-col items-start leading-none">
                          <span className="text-gray-400 line-through text-xs">
                            {precioCLP(Number(p.precioAnterior))}
                          </span>
                          <span className="text-[10px] font-bold text-[#d43a94]">
                            ({Math.round((1 - Number(p.precio) / Number(p.precioAnterior)) * 100)}% DCTO)
                          </span>
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/detalles?id=${p.id}`}
                      className="btn-outline w-full block text-center py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition"
                    >
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!loading && !err && items.length === 0 && (
            <div className="text-center text-gray-600 py-20 bg-white/30 backdrop-blur-sm rounded-xl border border-gray-200 mt-8">
              <p className="text-xl font-medium">No encontramos productos con esos filtros.</p>
              <button onClick={() => {setQ(""); setCategoria("");}} className="text-blue-600 mt-2 hover:underline font-bold">
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
      {/* FIN DE LA TARJETA FLOTANTE */}

      {/* Footer (Conservado de tu código original) */}
      <footer style={{ backgroundColor: colorFooter }} className="text-black mt-auto relative z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">
          {/* Links principales */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Ayuda</h4>
            <ul className="space-y-2 text-black">
              <li><Link href="/ayuda" className="hover:text-teal-300">Centro de ayuda</Link></li>
              <li><Link href="/seguimiento" className="hover:text-teal-300">Seguimiento de mi compra</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Nosotros</h4>
            <ul className="space-y-2 text-black">
              <li><Link href="/quienes_somos" className="hover:text-teal-300">Quiénes somos</Link></li>
              <li><Link href="/terminos" className="hover:text-teal-300">Términos y Condiciones</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Comunidad Blitz</h4>
            <ul className="space-y-2 text-black">
              <li><a href="https://www.instagram.com/blitz.hardware?igsh=b29mcW00OGthcnM3" target="_blank" className="hover:text-teal-300">Instagram</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-white/10" />

        <div className="bg-black/30 text-center text-xs py-3">
          © 2025–2025 | Desarrollado por Cristopher Garcia, Jesus Lagos e Ignacio Varas, Proyecto Capstone
        </div>
      </footer>
    </div>
  );
}