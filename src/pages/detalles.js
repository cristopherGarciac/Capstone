// src/pages/detalles.js
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Detalles() {
  const router = useRouter();
  const { isReady, query: { id } } = router;

  // ----------- producto -----------
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [qty, setQty] = useState(1);
  const [addedMsg, setAddedMsg] = useState('');

  // ----------- login (navbar modal) -----------
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [user, setUser] = useState(null);

  // ----------- config navbar/footer -----------
  const [logo, setLogo] = useState('/images/blitz.png');
  const [nombrePagina, setNombrePagina] = useState('Mi E-commerce');
  const [colorHeader, setColorHeader] = useState('#ffffff');
  const [colorFooter, setColorFooter] = useState('#ffffff');

  // ----------- cart count (navbar badge) -----------
  const [cartCount, setCartCount] = useState(0);

  const calcCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      return cart.reduce((sum, it) => sum + Number(it.qty || 0), 0);
    } catch {
      return 0;
    }
  };

  useEffect(() => {
    // Cargar config y contador al montar
    const saved = localStorage.getItem('config');
    if (saved) {
      const cfg = JSON.parse(saved);
      setLogo(cfg.logo || '/images/blitz.png');
      setNombrePagina(cfg.nombrePagina || 'Mi E-commerce');
      setColorHeader(cfg.colorHeader || '#ffffff');
      setColorFooter(cfg.colorFooter || '#ffffff');
    }
    setCartCount(calcCartCount());

    // Escuchar cambios del carrito desde otras pestañas
    const onStorage = (e) => {
      if (e.key === 'cart') setCartCount(calcCartCount());
    };
    // Y cambios en esta misma pestaña (evento custom)
    const onCartUpdated = () => setCartCount(calcCartCount());

    window.addEventListener('storage', onStorage);
    window.addEventListener('cart-updated', onCartUpdated);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cart-updated', onCartUpdated);
    };
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await resp.json();
      if (resp.ok) {
        setUser(data);
        setLoginOpen(false);
      } else {
        setLoginError(data.error || 'Credenciales incorrectas');
      }
    } catch (er) {
      console.error(er);
      setLoginError('Ocurrió un error en el servidor.');
    }
  };

  // ----------- helpers -----------
  const precioCLP = (v) =>
    typeof v === 'number'
      ? Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(v)
      : Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Number(v || 0));

  const img0 = useMemo(() => {
    if (!prod) return '/images/default-product.png';
    return (Array.isArray(prod.imagenes) && prod.imagenes[0]) || '/images/default-product.png';
  }, [prod]);

  // Cargar producto por ID
  useEffect(() => {
    if (!isReady || !id) return;
    (async () => {
      setLoading(true);
      setErr('');
      try {
        const res = await fetch(`/api/productos/${id}`);
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error || 'No se pudo cargar el producto');
        }
        const data = await res.json();
        setProd(data);
        // opcional: sumar click/popularidad
        fetch(`/api/productos/${id}/click`, { method: 'POST' }).catch(() => {});
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [isReady, id]);

  const clampQty = (n, max) => Math.max(1, Math.min(n, Math.max(1, max || 1)));
  const incQty = () => setQty((q) => clampQty((Number(q) || 1) + 1, Number(prod?.stock ?? 0)));
  const decQty = () => setQty((q) => clampQty((Number(q) || 1) - 1, Number(prod?.stock ?? 0)));

  // Agregar al carrito en localStorage
  const addToCart = () => {
    if (!prod) return;
    const stock = Number(prod.stock ?? 0);
    const q = clampQty(Number(qty) || 1, stock);

    if (stock < 1) {
      setAddedMsg('Sin stock disponible');
      return;
    }

    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const idx = cart.findIndex((item) => item.id === prod.id);
      if (idx >= 0) {
        const newQty = clampQty((cart[idx].qty || 0) + q, stock);
        cart[idx] = { ...cart[idx], qty: newQty };
      } else {
        cart.push({
          id: prod.id,
          sku: prod.sku,
          titulo: prod.titulo,
          precio: typeof prod.precio === 'number' ? prod.precio : Number(prod.precio || 0),
          imagen: img0,
          categoria: prod.categoria || '',
          qty: q,
          stock,
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      // ✅ actualizar contador local y notificar a TODAS las pestañas
      setCartCount(calcCartCount());
      window.dispatchEvent(new Event('cart-updated'));

      setAddedMsg('Producto añadido al carrito');
      setTimeout(() => setAddedMsg(''), 1500);
    } catch (e) {
      console.error('cart error', e);
      setAddedMsg('No se pudo agregar al carrito');
    }
  };

  // ----------- UI derivadas -----------
  const stockNum = Number(prod?.stock ?? 0);
  const agotado = stockNum < 1;

  const bullets = useMemo(() => {
    if (!prod) return [];
    return Array.isArray(prod.detalles)
      ? prod.detalles
      : (prod.descripcion || '')
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
  }, [prod]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav
        className="shadow sticky top-0 z-50"
        style={{ backgroundColor: colorHeader }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link
            className="logo text-2xl font-bold text-[var(--color-primary)]"
            href="/"
          >
            <img src={logo} alt="Blitz Hardware Logo" className="h-20 w-auto" />
          </Link>

          <div className="flex items-center space-x-6">
            <span className="text-2xl font-semibold">{nombrePagina}</span>

            <Link href="/" className="text-gray-700 hover:text-[var(--color-accent)]">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-accent)]">
              Catálogo
            </Link>

            {/* Carrito con badge */}
            <Link
              href="/carrito"
              className="relative text-gray-700 hover:text-[var(--color-accent)]"
              title="Carrito"
            >
              <img src="/images/carrito.png" alt="Carrito" className="h-11 w-auto" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] leading-none font-bold bg-red-600 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href="/admin" className="text-gray-700 hover:text-[var(--color-accent)]">
              Admin
            </Link>

            {user ? (
              <span className="text-gray-700 flex items-center">
                Hola, {user.nombre}
              </span>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="text-gray-700 hover:text-[var(--color-accent)] flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.001 9.001 0 0112 15a9.001 9.001 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Modal de login */}
      {loginOpen && (
        <div
          className="fixed inset-0 bg-black flex justify-center items-start pt-24 z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
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

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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

            <div className="flex flex-col items-center text-sm mt-4 gap-2">
              <button className="text-blue-600 hover:underline">Olvidé mi contraseña</button>
              <span>
                ¿No estás registrado?{' '}
                <Link href="/register" className="text-blue-600 hover:underline">
                  Regístrate
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto p-6">
        {/* migas */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline">Inicio</Link> <span>/</span>{' '}
          <Link href="/catalogo" className="hover:underline">Catálogo</Link> <span>/</span>{' '}
          <span className="text-gray-700">{prod?.titulo || 'Detalle'}</span>
        </nav>

        {loading ? (
          <p className="text-gray-600">Cargando producto…</p>
        ) : err || !prod ? (
          <>
            <p className="text-red-600">Error: {err || 'Producto no encontrado'}</p>
            <Link href="/catalogo" className="text-blue-600 hover:underline inline-block mt-3">
              ← Volver al catálogo
            </Link>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">
            {/* Columna izquierda: imagen */}
            <div className="relative">
              {!agotado && (
                <div className="absolute left-0 top-0">
                  <span className="inline-flex items-center gap-1 bg-[#69b248] text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg">
                    <span className="w-2 h-2 rounded-full bg-white/90"></span> STOCK
                  </span>
                </div>
              )}
              <div className="border rounded-xl bg-white overflow-hidden">
                <img
                  src={img0}
                  alt={prod.titulo}
                  className="w-full h-[480px] object-contain bg-white"
                />
              </div>

              {Array.isArray(prod.imagenes) && prod.imagenes.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto">
                  {prod.imagenes.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setProd((prev) =>
                          prev ? { ...prev, imagenes: [src, ...prev.imagenes.filter((x) => x !== src)] } : prev
                        )
                      }
                      className="border rounded-lg p-1 bg-white hover:shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
                      title="Ver"
                    >
                      <img src={src} alt={`${prod.titulo} ${idx + 1}`} className="w-20 h-20 object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Columna derecha: info y compra */}
            <div>
              <h1 className="text-2xl md:text-[22px] font-semibold text-gray-900">{prod.titulo}</h1>

              <div className="mt-1 text-sm text-gray-500">
                <span className="uppercase tracking-wide text-gray-600 font-semibold">REF:</span>{' '}
                <span>{prod.sku || '—'}</span>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="text-2xl font-bold text-gray-900">{precioCLP(prod.precio)}</div>
                <span className="text-[11px] font-semibold bg-green-500 text-white px-2 py-1 rounded">
                  IVA NO INCLUIDO
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="inline-flex items-stretch border rounded-lg overflow-hidden">
                  <button onClick={decQty} disabled={agotado} className="px-3 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50" aria-label="Disminuir cantidad">−</button>
                  <input
                    type="number"
                    min={1}
                    max={Math.max(1, stockNum)}
                    value={qty}
                    onChange={(e) => setQty(clampQty(Number(e.target.value) || 1, stockNum))}
                    className="w-16 text-center border-x outline-none"
                    disabled={agotado}
                  />
                  <button onClick={incQty} disabled={agotado} className="px-3 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50" aria-label="Aumentar cantidad">+</button>
                </div>

                <button
                  className="inline-flex items-center justify-center px-6 py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 disabled:opacity-50"
                  disabled={agotado}
                  onClick={addToCart}
                >
                  Añadir al Carrito
                </button>
              </div>

              <div className="mt-8">
                <h2 className="text-sm font-extrabold uppercase text-gray-800">
                  {prod.marca || prod.categoria || 'Detalles'}
                </h2>

                <ul className="mt-3 space-y-2">
                  {bullets.length > 0 ? (
                    bullets.map((line, i) => (
                      <li key={i} className="text-gray-700 text-sm flex gap-2">
                        <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                        <span>
                          {/^(.+?):\s*/.test(line) ? (
                            <>
                              <span className="font-semibold">
                                {line.match(/^(.+?):\s*/)?.[1]}
                              </span>
                              {line.replace(/^(.+?):\s*/, ': ')}
                            </>
                          ) : (
                            line
                          )}
                        </span>
                      </li>
                    ))
                  ) : (
                    prod.descripcion && (
                      <li className="text-gray-700 text-sm whitespace-pre-line">{prod.descripcion}</li>
                    )
                  )}
                </ul>
              </div>

              <div className="mt-4 text-sm">
                <span className="font-medium text-gray-700">Stock:</span>{' '}
                <span className={agotado ? 'text-red-600 font-medium' : 'text-gray-800'}>
                  {stockNum} {agotado ? '(Agotado)' : ''}
                </span>
              </div>

              {addedMsg && <p className="mt-3 text-sm text-green-700">{addedMsg}</p>}

              <div className="mt-6">
                <Link href="/catalogo" className="text-purple-700 hover:underline">
                  ← Volver al catálogo
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

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
    </div>
  );
}