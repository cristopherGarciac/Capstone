import { useEffect, useMemo, useState, useContext} from "react";
import { UserContext } from "../context/UserContext";
import Link from "next/link";

export default function Catalogo2() {
  // ---------------- estado remoto ----------------
  const [rawItems, setRawItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // ---------- login ----------
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
const { user, setUser } = useContext(UserContext);

  // --------- config fondo -----------
  const [colorFondo, setColorFondo] = useState("#ffffff");
  const [fondo, setFondo] = useState({ colorFondo: "#ffffff", fondoImagen: "" });


  // ---------- config navbar/footer ----------
  const [logo, setLogo] = useState("/images/blitz.png");
  const [nombrePagina, setNombrePagina] = useState("Mi E-commerce");
  const [colorHeader, setColorHeader] = useState("#ffffff");
  const [colorFooter, setColorFooter] = useState("#ffffff");

  useEffect(() => {
    const savedConfig = localStorage.getItem("config");
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      setLogo(config.logo || "/images/blitz.png");
      setNombrePagina(config.nombrePagina || "Mi E-commerce");
      setColorHeader(config.colorHeader || "#ffffff");
      setColorFooter(config.colorFooter || "#ffffff");
      setColorFondo(config.colorFondo || "#ffffff");
      setFondo({
        colorFondo: config.colorFondo || "#ffffff",
        fondoImagen: config.fondoImagen || ""
      });

      // ⬇️ Aplica variables de botón si existen
      const r = document.documentElement.style;
      if (config.btnBg) r.setProperty("--btn-bg", config.btnBg);
      if (config.btnText) r.setProperty("--btn-text", config.btnText);
      if (config.btnBorder) r.setProperty("--btn-border", config.btnBorder);
      if (config.btnHoverBg) r.setProperty("--btn-hover-bg", config.btnHoverBg);
      if (config.btnHoverText) r.setProperty("--btn-hover-text", config.btnHoverText);
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
      className="min-h-screen"
      style={{
        backgroundColor: fondo.fondoImagen ? undefined : fondo.colorFondo,
        backgroundImage: fondo.fondoImagen ? `url(${fondo.fondoImagen})` : undefined,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
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

      <main className="min-h-screen">

      

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

      {/* contenido catálogo */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Catálogo</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">Catálogo</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end gap-3 bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">
              Buscar por nombre o id
            </label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ej: RTX 3060, POL-BLANCA-M..."
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="min-w-[220px]">
            <label className="block text-sm text-gray-600 mb-1">Categoría</label>
            <select
              value={categoria || "Todas"}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-white"
            >
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[220px]">
            <label className="block text-sm text-gray-600 mb-1">Ordenar por</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-white"
            >
              <option value="alpha_asc">Alfabético (A → Z)</option>
              <option value="alpha_desc">Alfabético (Z → A)</option>
              <option value="price_asc">Precio (menor → mayor)</option>
              <option value="price_desc">Precio (mayor → menor)</option>
            </select>
          </div>

          <button
            onClick={cargar}
            className="btn-outline px-4 py-2 rounded"
            title="Recargar desde el servidor"
          >
            Refrescar
          </button>
        </div>

        {loading && <p className="text-gray-600 mb-4">Cargando productos…</p>}
        {err && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700">
            {err}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((p) => (
            <article
              key={p.id}
              className="relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-3 flex flex-col"
            >
              {/* Cinta STOCK */}
              {p.stock > 0 && (
                <div className="absolute -left-1 top-3">
                  <span className="bg-[#69b248] text-white text-[11px] font-bold px-2 py-1 rounded-r">
                    STOCK
                  </span>
                </div>
              )}

              {/* Sticker esquina */}
              {p.etiqueta && (
                <div className="absolute -right-2 -top-2 rotate-12">
                  <span className="bg-purple-600 text-white text-[11px] font-bold px-2 py-1 rounded">
                    {p.etiqueta}
                  </span>
                </div>
              )}

              {/* Imagen */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
                <img
                  src={img0(p)}
                  alt={p.titulo}
                  className="w-full h-52 object-contain bg-white"
                />
              </div>

              {/* Meta */}
              <div className="mt-3 text-[11px] tracking-wide text-purple-600 font-semibold uppercase">
                {p.marca ? ` / ${p.marca}` : p.categoria ? ` / ${p.categoria}` : ""}
              </div>

              {/* Título */}
              <h3
                className="mt-1 text-[17px] font-semibold uppercase text-gray-800 leading-tight line-clamp-2"
                title={p.titulo}
              >
                {p.titulo}
              </h3>

              {/* Precio */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[#d43a94] font-bold text-lg">
                  {precioCLP(Number(p.precio))}
                </span>

                {Number(p.precioAnterior) > Number(p.precio) && (
                  <>
                    <span className="text-gray-400 line-through text-sm">
                      {precioCLP(Number(p.precioAnterior))}
                    </span>
                    <span className="text-[11px] font-bold text-[#d43a94]">
                      ({Math.round(
                        (1 - Number(p.precio) / Number(p.precioAnterior)) * 100
                      )}% DCTO)
                    </span>
                  </>
                )}
              </div>

              {/* Botón */}
              <Link
                href={`/detalles?id=${p.id}`}
                className="mt-3 inline-block text-center btn-outline px-3 py-1.5 rounded font-semibold text-sm"
              >
                Ver detalle
              </Link>
            </article>
          ))}
        </div>

        {!loading && !err && items.length === 0 && (
          <div className="text-center text-gray-500 py-16">
            No encontramos productos con esos filtros.
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: colorFooter }} className="text-black mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </main>
    </div>
    
  );
}