import { useState, useContext, useEffect, useMemo } from "react";
import Link from "next/link";
import { UserContext } from "../context/UserContext";

export default function Seguimiento() {
  // --- 1. ESTADOS GLOBALES Y DE DISEÑO (Traídos del Home) ---
  const { user, setUser, logout } = useContext(UserContext);
  
  // Auth States
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // Configuración Visual
  const [logo, setLogo] = useState("/images/blitz.png");
  const [nombrePagina, setNombrePagina] = useState("Mi E-commerce");
  const [colorHeader, setColorHeader] = useState("#ffffff");
  const [colorFooter, setColorFooter] = useState("#ffffff");
  const [colorFondo, setColorFondo] = useState("#ffffff");
  const [fondoImagen, setFondoImagen] = useState("");
  const [footerCfg, setFooterCfg] = useState(null);

  // --- 2. ESTADOS DE LA LÓGICA DE SEGUIMIENTO ---
  const [busqueda, setBusqueda] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [buscando, setBuscando] = useState(false);

  // --- 3. EFECTOS: Cargar Configuración Visual (LocalStorage) ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Cargar config general
    const saved = localStorage.getItem("config");
    if (saved) {
      try {
        const cfg = JSON.parse(saved);
        setLogo(cfg.logo || "/images/blitz.png");
        setNombrePagina(cfg.nombrePagina || "Mi E-commerce");
        setColorHeader(cfg.colorHeader || "#ffffff");
        setColorFooter(cfg.colorFooter || "#ffffff");
        
        const bgColor = cfg.colorFondo || "#ffffff";
        setColorFondo(bgColor);
        setFondoImagen(cfg.fondoImagen || "");

        // Aplicar al body
        document.body.style.backgroundColor = bgColor;
        if (cfg.fondoImagen) {
            document.body.style.backgroundImage = `url(${cfg.fondoImagen})`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundAttachment = "fixed";
        }
      } catch (e) {
        console.error("Config inválida:", e);
      }
    }

    // Cargar config footer
    const savedFooter = localStorage.getItem("configFooter");
    if (savedFooter) {
      try {
        setFooterCfg(JSON.parse(savedFooter));
      } catch (e) {
        console.error("Error configFooter:", e);
      }
    }
  }, []);

  // --- 4. LÓGICA DE SEGUIMIENTO (Backend Fetch) ---
  const buscarPedidos = async () => {
    if (!busqueda && !user) return;
    setBuscando(true);
    try {
      const params = new URLSearchParams();
      if (user?.email) params.append("email", user.email);
      if (busqueda) params.append("q", busqueda);

      const res = await fetch(`/api/obtener_pedidos?${params.toString()}`);
      const data = await res.json();
      
      const todosLosPedidos = data.pedidos || [];

      // Filtrado estricto en frontend
      if (busqueda.trim() !== "") {
        const termino = busqueda.toLowerCase();
        const pedidosFiltrados = todosLosPedidos.filter((pedido) => {
          const coincideId = pedido.id?.toString().toLowerCase().includes(termino);
          const coincideTracking = pedido.trackingNumber?.toLowerCase().includes(termino);
          const coincideProducto = pedido.pedido_items?.some((item) => 
            item.productos?.titulo.toLowerCase().includes(termino)
          );
          return coincideId || coincideTracking || coincideProducto;
        });
        setPedidos(pedidosFiltrados);
      } else {
        setPedidos(todosLosPedidos);
      }
    } catch (error) {
      console.error("Error al buscar pedidos:", error);
      setPedidos([]);
    } finally {
      setBuscando(false);
    }
  };

  // Carga automática inicial de pedidos
  useEffect(() => {
    if (user && user.email) {
      buscarPedidos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // --- 5. LÓGICA DE AUTH (Login) ---
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

  // --- RENDERIZADO ---
  return (
    <main
      className="min-h-screen flex flex-col relative font-[Inter]"
      style={{
        backgroundColor: colorFondo,
        backgroundImage: fondoImagen ? `url(${fondoImagen})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Estilos específicos para la tarjeta de seguimiento */}
      <style>{`
        .text-indigo-600 { color: #4f46e5; }
        .bg-indigo-600 { background-color: #4f46e5; }
        .hover\\:bg-indigo-700:hover { background-color: #4338ca; }
        .text-indigo-700 { color: #4338ca; }
        .bg-indigo-50 { background-color: #eef2ff; }
      `}</style>

      {/* 1. TOPBAR */}
      <div className="bg-[var(--color-secondary)] text-white text-center py-2 text-sm z-10 relative">
        {promociones.map((p, i) => (
          <span key={i} className={`mx-4 ${p.destaque ? "font-semibold" : ""}`}>
            {p.texto}
          </span>
        ))}
      </div>

      {/* 2. NAVBAR */}
      <nav
        className="shadow sticky top-0 z-50 transition-colors duration-300"
        style={{ backgroundColor: colorHeader }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="logo text-2xl font-bold">
            <img src={logo} alt="logo" className="h-20 w-auto" />
          </Link>

          <div className="flex items-center space-x-6">
            <span className="text-2xl font-semibold hidden md:block">{nombrePagina}</span>
            <Link href="/" className="text-gray-700 hover:text-[var(--color-primary)]">Inicio</Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-primary)]">Catálogo</Link>
            <Link href="/carrito" className="text-gray-700 hover:text-[var(--color-primary)]">
              <img src="/images/carrito.png" className="h-11" alt="carrito" />
            </Link>

            {user?.rol === "admin" && (
              <Link href="/admin" className="text-gray-700 hover:text-[var(--color-primary)] font-semibold">Admin</Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/mi_cuenta" className="text-gray-700 hover:text-[var(--color-primary)]">Hola, {user.nombre}</Link>
                <Link href="/mi_cuenta" className="flex items-center">
                  <img src={user.fotoperfil || "/images/default-user.jpg"} alt="perfil" className="h-10 w-10 rounded-full object-cover border border-gray-300 cursor-pointer hover:opacity-90" />
                </Link>
              </div>
            ) : (
              <button onClick={() => setLoginOpen(true)} className="text-gray-700 hover:text-[var(--color-accent)] flex items-center">
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.001 9.001 0 0112 15a9.001 9.001 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* 3. MODAL LOGIN */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[100]">
          <div className="bg-white w-96 p-8 rounded-2xl shadow-xl relative animate-[zoomIn_.15s_ease-out]">
            <button onClick={() => setLoginOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl">✕</button>
            <h2 className="text-3xl font-bold text-center mb-6 text-[var(--color-secondary)]">Iniciar sesión</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="Correo electrónico" className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" required />
              <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Contraseña" className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" required />
              <button type="submit" className="bg-[var(--color-primary)] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition">Iniciar sesión</button>
              <div className="flex flex-col items-center gap-2 mt-2 text-sm">
                <Link href="/recuperar_password" className="text-[var(--color-primary)] hover:underline">Olvidé mi contraseña</Link>
                <Link href="/registro" className="text-[var(--color-secondary)] hover:underline font-semibold">Crear una cuenta</Link>
              </div>
            </form>
            {loginError && <p className="text-red-500 text-center text-sm mt-3">{loginError}</p>}
          </div>
        </div>
      )}

      {/* 4. CONTENIDO PRINCIPAL (Seguimiento) */}
      <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-10 z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
            
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight bg-white/80 p-4 rounded-xl shadow-sm backdrop-blur-sm">
                Seguimiento de mi compra
            </h1>

            {/* SECCIÓN DE BÚSQUEDA */}
            <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-2xl border border-gray-100 mb-8">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                Buscar pedido
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="N° pedido, tracking o producto..."
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && buscarPedidos()}
                />
                <button
                    onClick={buscarPedidos}
                    disabled={buscando}
                    className="px-6 py-3 rounded-lg text-white font-bold bg-indigo-600 hover:bg-indigo-700 transition duration-300 shadow-md flex justify-center items-center min-w-[120px]"
                >
                    {buscando ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    ) : (
                    "Buscar"
                    )}
                </button>
                </div>
                {busqueda && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                    Mostrando solo coincidencias para: <span className="font-bold text-indigo-600">"{busqueda}"</span>
                    </p>
                )}
            </div>

            {/* LISTA DE PEDIDOS */}
            {pedidos.length > 0 && (
                <div className="w-full space-y-8">
                    <h2 className="text-2xl font-extrabold text-gray-800 border-b pb-3 bg-white/50 p-2 rounded">
                    Resultados ({pedidos.length})
                    </h2>
                    
                    {pedidos.map((pedido, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-2xl p-6 border border-gray-100 hover:border-indigo-300 transition duration-300">
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4">
                        <p className="font-extrabold text-xl text-indigo-700">
                        Pedido #{pedido.id}
                        </p>
                        <div className="text-sm font-medium text-gray-500 mt-2 md:mt-0">
                        Fecha: <span className="font-semibold text-gray-700">{new Date(pedido.fecha).toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <span className="font-semibold text-gray-600 block text-sm uppercase tracking-wide">Estado</span>
                            <span className={`text-lg font-bold ${
                            pedido.estado === "Entregado" ? "text-green-600" :
                            pedido.estado === "Enviado" ? "text-yellow-600" :
                            "text-blue-600"
                            }`}>
                            {pedido.estado}
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-600 block text-sm uppercase tracking-wide">Tracking</span>
                            <span className="text-lg font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded inline-block mt-1">
                                {pedido.trackingNumber || "N/A"}
                            </span>
                        </div>
                        <div className="md:text-right">
                            <span className="font-semibold text-gray-600 block text-sm uppercase tracking-wide">Total</span>
                            <span className="text-2xl font-extrabold text-green-700">
                            ${pedido.total?.toLocaleString('es-CL')}
                            </span>
                        </div>
                    </div>

                    {pedido.direcciones && (
                        <div className="text-sm text-gray-700 mb-6 bg-indigo-50 p-4 rounded-lg border border-indigo-200 flex items-start">
                        <span className="font-extrabold text-indigo-700 mr-2">📍 Envío:</span> 
                        <span>
                            {pedido.direcciones.calle}, {pedido.direcciones.numero}, {pedido.direcciones.comuna}, {pedido.direcciones.region}
                        </span>
                        </div>
                    )}

                    <h3 className="font-bold text-gray-800 mb-3 text-lg">Detalle de Productos</h3>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider text-left">
                            <th className="p-3 border-r font-semibold">Producto</th>
                            <th className="p-3 text-center border-r font-semibold w-24">Cant.</th>
                            <th className="p-3 text-right font-semibold w-32">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedido.pedido_items.map((item, i) => {
                            const coincide = busqueda && item.productos?.titulo.toLowerCase().includes(busqueda.toLowerCase());
                            return (
                                <tr key={i} className={`border-t transition duration-150 ${coincide ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
                                <td className="p-3 font-medium text-gray-800">
                                    {item.productos?.titulo}
                                    {coincide && <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-1 rounded font-bold">Encontrado</span>}
                                </td>
                                <td className="p-3 text-center text-gray-600">{item.cantidad}</td>
                                <td className="p-3 text-right font-bold text-gray-800">
                                    ${(item.precio_unit * item.cantidad).toLocaleString('es-CL')}
                                </td>
                                </tr>
                            );
                            })}
                        </tbody>
                        </table>
                    </div>
                    </div>
                ))}
                </div>
            )}

            {pedidos.length === 0 && !buscando && (
                <div className="text-center mt-8">
                    <p className="text-gray-500 bg-white px-6 py-4 rounded-lg shadow">
                        {busqueda 
                            ? `No se encontraron resultados para "${busqueda}".` 
                            : "Ingresa tu código de seguimiento o nombre de producto."}
                    </p>
                </div>
            )}

        </div>
      </div>

      {/* 5. FOOTER */}
      <footer style={{ backgroundColor: colorFooter }} className="text-black mt-auto relative z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-800 border-b-2 border-blue-200 inline-block pb-1">Ayuda</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/ayuda" className="hover:text-[var(--color-primary)] transition">Centro de ayuda</Link></li>
              <li><Link href="/seguimiento" className="hover:text-[var(--color-primary)] transition">Seguimiento de mi compra</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-800 border-b-2 border-blue-200 inline-block pb-1">Nosotros</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/quienes_somos" className="hover:text-[var(--color-primary)] transition">Quiénes somos</Link></li>
              <li><Link href="/terminos" className="hover:text-[var(--color-primary)] transition">Términos y Condiciones</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-800 border-b-2 border-blue-200 inline-block pb-1">Comunidad</h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <a href={footerCfg?.instagramLink || "https://www.instagram.com/blitz.hardware"} target="_blank" rel="noreferrer" className="hover:text-[var(--color-primary)] transition flex items-center gap-2">
                  <span>Instagram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.047-1.096-.047-3.232 0-2.136.009-2.388.047-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-black/5 text-center text-xs py-4 text-gray-500">
          © 2025–2025 | Desarrollado por Cristopher Garcia, Jesus Lagos e Ignacio Varas
        </div>
      </footer>
    </main>
  );
}