// src/pages/carrito.js
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export default function Carrito() {
  // ----------- config navbar/footer -----------
  const [logo, setLogo] = useState('/images/blitz.png');
  const [nombrePagina, setNombrePagina] = useState('Mi E-commerce');
  const [colorHeader, setColorHeader] = useState('#ffffff');
  const [colorFooter, setColorFooter] = useState('#ffffff');

  // ----------- login (opcional en navbar) -----------
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [user, setUser] = useState(null);

  // ----------- carrito -----------
  const [items, setItems] = useState([]);           // [{id, titulo, precio, qty, imagen, ...}]
  const [cartCount, setCartCount] = useState(0);

  const IVA = 0.19;

  // helpers
  const precioCLP = (v) =>
    Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Number(v || 0));

  const calcCartCount = (arr) =>
    (arr || []).reduce((sum, it) => sum + Number(it.qty || 0), 0);

  const loadCart = () => {
    try {
      const c = JSON.parse(localStorage.getItem('cart') || '[]');
      setItems(c);
      setCartCount(calcCartCount(c));
    } catch {
      setItems([]);
      setCartCount(0);
    }
  };

  // init
  useEffect(() => {
    // Config
    const saved = localStorage.getItem('config');
    if (saved) {
      const cfg = JSON.parse(saved);
      setLogo(cfg.logo || '/images/blitz.png');
      setNombrePagina(cfg.nombrePagina || 'Mi E-commerce');
      setColorHeader(cfg.colorHeader || '#ffffff');
      setColorFooter(cfg.colorFooter || '#ffffff');
    }
    // Carrito
    loadCart();

    // sincronización entre pestañas
    const onStorage = (e) => {
      if (e.key === 'cart') loadCart();
    };
    const onCartUpdated = () => loadCart();

    window.addEventListener('storage', onStorage);
    window.addEventListener('cart-updated', onCartUpdated);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cart-updated', onCartUpdated);
    };
  }, []);

  // totales
  const { total, subtotal, impuestos } = useMemo(() => {
    const totalBruto = items.reduce(
      (sum, it) => sum + Number(it.precio || 0) * Number(it.qty || 0),
      0
    );
    // tomamos precio con IVA incluido, calculamos neto aprox:
    const neto = Math.round(totalBruto / (1 + IVA));
    return {
      total: totalBruto,
      subtotal: neto,
      impuestos: totalBruto - neto,
    };
  }, [items]);

  // acciones carrito
  const persist = (next) => {
    localStorage.setItem('cart', JSON.stringify(next));
    setItems(next);
    setCartCount(calcCartCount(next));
    // notificar a todas las páginas
    window.dispatchEvent(new Event('cart-updated'));
  };

  const clampQty = (n, max = 999) => Math.max(1, Math.min(Number(n) || 1, max));

  const setQty = (id, qty, stock = 999) => {
    const q = clampQty(qty, Number(stock || 999));
    const next = items.map((it) => (it.id === id ? { ...it, qty: q } : it));
    persist(next);
  };

  const inc = (id, stock) => {
    const next = items.map((it) =>
      it.id === id ? { ...it, qty: clampQty((Number(it.qty) || 1) + 1, stock) } : it
    );
    persist(next);
  };

  const dec = (id, stock) => {
    const next = items.map((it) =>
      it.id === id ? { ...it, qty: clampQty((Number(it.qty) || 1) - 1, stock) } : it
    );
    persist(next);
  };

  const removeItem = (id) => {
    const next = items.filter((it) => it.id !== id);
    persist(next);
  };

  // ----------- login handlers (opcional) -----------
  const handleLoginChange = (e) =>
    setLoginData((p) => ({ ...p, [e.target.name]: e.target.value }));

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
      setLoginError('Ocurrió un error en el servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="shadow sticky top-0 z-50" style={{ backgroundColor: colorHeader }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link className="logo text-2xl font-bold text-[var(--color-primary)]" href="/">
            <img src={logo} alt="Blitz Hardware Logo" className="h-20 w-auto" />
          </Link>

          <div className="flex items-center space-x-6">
            <span className="text-2xl font-semibold">{nombrePagina}</span>
            <Link href="/" className="text-gray-700 hover:text-[var(--color-accent)]">Inicio</Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-accent)]">Catálogo</Link>

            {/* Carrito con badge */}
            <Link href="/carrito" className="relative text-gray-700 hover:text-[var(--color-accent)]">
              <img src="/images/carrito.png" alt="Carrito" className="h-11 w-auto" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] leading-none font-bold bg-red-600 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href="/admin" className="text-gray-700 hover:text-[var(--color-accent)]">Admin</Link>

            {user ? (
              <span className="text-gray-700 flex items-center">Hola, {user.nombre}</span>
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

      {/* Modal de login (opcional) */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black flex justify-center items-start pt-24 z-50" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button onClick={() => setLoginOpen(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">✕</button>
            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-4 text-center">Iniciar Sesión</h2>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="Correo electrónico" className="border p-2 rounded" required />
              <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Contraseña" className="border p-2 rounded" required />
              <button type="submit" className="btn-primary w-full">Iniciar Sesión</button>
            </form>
            {loginError && <p className="text-red-500 text-sm mt-2 text-center">{loginError}</p>}
          </div>
        </div>
      )}

      {/* Contenido */}
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Carrito de compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* Lista de items */}
          <section className="bg-white rounded-lg shadow overflow-hidden">
            {/* encabezado */}
            <div className="flex bg-gray-800 text-white text-sm font-semibold px-4 py-3">
              <div className="flex-1">Producto</div>
              <div className="w-40 text-center">Cantidad</div>
              <div className="w-36 text-right">Precio</div>
            </div>

            {items.length === 0 ? (
              <div className="p-6 text-gray-500">
                Tu carrito está vacío.
                <Link className="text-purple-700 hover:underline ml-2" href="/catalogo">
                  Ir al catálogo
                </Link>
              </div>
            ) : (
              <ul className="divide-y">
                {items.map((it) => {
                  const lineTotal = Number(it.precio || 0) * Number(it.qty || 0);
                  return (
                    <li key={it.id} className="flex items-center px-4 py-4">
                      {/* producto */}
                      <div className="flex-1 flex gap-4">
                        <img
                          src={it.imagen || '/images/default-product.png'}
                          alt={it.titulo}
                          className="w-16 h-16 object-contain"
                        />
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900">{it.titulo}</p>
                          {it.sku && <p className="text-gray-500">SKU: {it.sku}</p>}
                          {it.categoria && <p className="text-gray-500">Categoría: {it.categoria}</p>}
                          <button
                            onClick={() => removeItem(it.id)}
                            className="mt-2 text-xs text-red-600 hover:underline"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>

                      {/* cantidad */}
                      <div className="w-40 flex justify-center">
                        <div className="inline-flex items-stretch border rounded-lg overflow-hidden">
                          <button
                            onClick={() => dec(it.id, it.stock)}
                            className="px-3 py-2 text-gray-700 hover:bg-gray-50"
                            aria-label="Disminuir"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={it.qty}
                            onChange={(e) => setQty(it.id, e.target.value, it.stock)}
                            className="w-16 text-center border-x outline-none"
                          />
                          <button
                            onClick={() => inc(it.id, it.stock)}
                            className="px-3 py-2 text-gray-700 hover:bg-gray-50"
                            aria-label="Aumentar"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* precio */}
                      <div className="w-36 text-right font-semibold text-gray-900">
                        {precioCLP(lineTotal)}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* acciones inferiores */}
            <div className="flex justify-between items-center px-4 py-4">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold px-3 py-2 rounded"
              >
                <span>◀</span> Seguir comprando
              </Link>

              {items.length > 0 && (
                <button className="bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold px-4 py-2 rounded">
                  Pagar ahora
                </button>
              )}
            </div>
          </section>

          {/* Totales */}
          <aside className="bg-white rounded-lg shadow p-5 h-max">
            <h2 className="text-xl font-bold mb-4">Total del pedido</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{precioCLP(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impuestos:</span>
                <span className="font-medium">{precioCLP(impuestos)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-base font-bold">
                <span>Total:</span>
                <span>{precioCLP(total)}</span>
              </div>

              <button className="mt-4 text-purple-700 hover:underline text-sm">
                Tengo un código promocional
              </button>

              <button className="mt-3 w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold px-4 py-2 rounded">
                Pagar ahora
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: colorFooter }} className="text-black mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
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