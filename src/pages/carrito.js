// src/pages/carrito.js
import { useEffect, useMemo, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Link from "next/link";

export default function Carrito() {
  // ----------- config navbar/footer -----------
  const [logo, setLogo] = useState("/images/blitz.png");
  const [nombrePagina, setNombrePagina] = useState("Mi E-commerce");
  const [colorHeader, setColorHeader] = useState("#ffffff");
  const [colorFooter, setColorFooter] = useState("#ffffff");

  // ----------- login -----------
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const { user, setUser } = useContext(UserContext);

  //----------- config fondo-----------
  const [fondo, setFondo] = useState({
    colorFondo: "#ffffff",
    fondoImagen: "",
  });

  // ----------- carrito -----------
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const IVA = 0.19;

  // ----------- modal de pago -----------
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // ----------- cupones -----------
  const [cuponIngresado, setCuponIngresado] = useState("");
  const [errorCupon, setErrorCupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // ← AGREGADO

  // helpers
  const precioCLP = (v) =>
    Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(Number(v || 0));

  const calcCartCount = (arr) =>
    arr.reduce((sum, it) => sum + Number(it.qty || 0), 0);

  const loadCart = () => {
    try {
      const c = JSON.parse(localStorage.getItem("cart") || "[]");
      setItems(c);
      setCartCount(calcCartCount(c));
    } catch {
      setItems([]);
      setCartCount(0);
    }
  };

  // -------------------------------------------
  //   MERCADO PAGO
  // -------------------------------------------
  const handlePayMP = async () => {
    try {
      const itemsMP = items.map((it) => ({
        title: it.titulo,
        unit_price: Number(it.precio),
        quantity: Number(it.qty),
      }));

      const resp = await fetch("/api/mercadopago/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsMP }),
      });

      const data = await resp.json();

      if (resp.ok && data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert(data.error || "Error al iniciar pago con Mercado Pago");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con Mercado Pago");
    }
  };

  // -------------------------------------------
  //   CUPONES
  // -------------------------------------------
const aplicarCupon = async () => {
  if (!cuponIngresado) return;

  try {
    const res = await fetch(`/api/cupones/${cuponIngresado}`);
    const data = await res.json();

    if (!res.ok) {
      setErrorCupon(data.error);
      setAppliedCoupon(null);
      return;
    }

    setErrorCupon("");
    setAppliedCoupon(data); // ← guarda cupón completo

  } catch (err) {
    console.error(err);
    setErrorCupon("Error al aplicar cupón");
  }
};


  // -------------------------------------------
  //   WEBPAY
  // -------------------------------------------
  const handlePay = async () => {
    try {
      const origin =
        typeof window !== "undefined"
          ? `${window.location.protocol}//${window.location.hostname}${
              window.location.port ? `:${window.location.port}` : ""
            }`
          : "http://localhost:3000";

      const returnUrl = `${origin}/api/webpay/commit`;

      const resp = await fetch("/api/webpay/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(total),
          sessionId: "sesion-usuario-123",
          returnUrl,
        }),
      });

      const data = await resp.json();

      if (resp.ok && data.url && data.token) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.url;

        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "token_ws";
        input.value = data.token;

        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
      } else {
        alert(data.error || "Error al iniciar el pago");
      }
    } catch (error) {
      console.error("Error iniciando pago:", error);
      alert("Error de conexión con Webpay");
    }
  };

  // -------------------------------------------
  //   INIT
  // -------------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem("config");
    if (saved) {
      const cfg = JSON.parse(saved);
      setLogo(cfg.logo || "/images/blitz.png");
      setNombrePagina(cfg.nombrePagina || "Mi E-commerce");
      setColorHeader(cfg.colorHeader || "#ffffff");
      setColorFooter(cfg.colorFooter || "#ffffff");

      setFondo({
        colorFondo: cfg.colorFondo || "#ffffff",
        fondoImagen: cfg.fondoImagen || "",
      });
    }

    loadCart();

    const onStorage = (e) => {
      if (e.key === "cart") loadCart();
    };
    const onCartUpdated = () => loadCart();

    window.addEventListener("storage", onStorage);
    window.addEventListener("cart-updated", onCartUpdated);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart-updated", onCartUpdated);
    };
  }, []);

  // -------------------------------------------
  //   TOTALES
  // -------------------------------------------
  const { subtotal, impuestos, total, descuento } = useMemo(() => {
    const subtotal = items.reduce(
      (sum, it) => sum + Number(it.precio || 0) * Number(it.qty || 0),
      0
    );

    let descuento = 0;
    if (appliedCoupon) {
      descuento = Math.round(
        subtotal * (Number(appliedCoupon.descuento) / 100)
      );
    }

    const impuestos = Math.round(subtotal * IVA);
    const total = subtotal + impuestos - descuento;

    return { subtotal, impuestos, total, descuento };
  }, [items, appliedCoupon]);

  // -------------------------------------------
  //   ACCIONES CARRITO
  // -------------------------------------------
  const persist = (next) => {
    localStorage.setItem("cart", JSON.stringify(next));
    setItems(next);
    setCartCount(calcCartCount(next));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const clampQty = (n, max = 999) =>
    Math.max(1, Math.min(Number(n) || 1, max));

  const setQty = (id, qty, stock = 999) => {
    const q = clampQty(qty, Number(stock || 999));
    const next = items.map((it) => (it.id === id ? { ...it, qty: q } : it));
    persist(next);
  };

  const inc = (id, stock) => {
    const next = items.map((it) =>
      it.id === id
        ? { ...it, qty: clampQty((Number(it.qty) || 1) + 1, stock) }
        : it
    );
    persist(next);
  };

  const dec = (id, stock) => {
    const next = items.map((it) =>
      it.id === id
        ? { ...it, qty: clampQty((Number(it.qty) || 1) - 1, stock) }
        : it
    );
    persist(next);
  };

  const removeItem = (id) => {
    const next = items.filter((it) => it.id !== id);
    persist(next);
  };

  // -------------------------------------------
  //   LOGIN
  // -------------------------------------------
  const handleLoginChange = (e) =>
    setLoginData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await resp.json();

      if (resp.ok) {
        setUser(data);
        setLoginOpen(false);
      } else {
        setLoginError(data.error || "Credenciales incorrectas");
      }
    } catch (er) {
      setLoginError("Ocurrió un error en el servidor.");
    }
  };

  // -------------------------------------------
  //   RENDER
  // -------------------------------------------
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: fondo.fondoImagen ? undefined : fondo.colorFondo,
        backgroundImage: fondo.fondoImagen
          ? `url(${fondo.fondoImagen})`
          : undefined,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* NAVBAR */}
      <nav
        className="shadow sticky top-0 z-50"
        style={{ backgroundColor: colorHeader }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="logo text-2xl font-bold">
            <img src={logo} alt="Blitz Hardware Logo" className="h-20 w-auto" />
          </Link>

          <div className="flex items-center space-x-6">
            <span className="text-2xl font-semibold">{nombrePagina}</span>

            <Link href="/" className="text-gray-700 hover:text-purple-600">
              Inicio
            </Link>
            <Link
              href="/catalogo"
              className="text-gray-700 hover:text-purple-600"
            >
              Catálogo
            </Link>

            {/* CARRITO */}
            <Link
              href="/carrito"
              className="relative text-gray-700 hover:text-purple-600"
            >
              <img
                src="/images/carrito.png"
                alt="Carrito"
                className="h-11 w-auto"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] leading-none font-bold bg-red-600 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href="/admin" className="text-gray-700 hover:text-purple-600">
              Admin
            </Link>

            {user ? (
              <span className="text-gray-700 flex items-center">
                Hola, {user.nombre}
              </span>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="text-gray-700 hover:text-purple-600 flex items-center"
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

      {/* MODAL LOGIN */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-24 z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
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
              <p className="text-red-500 text-sm mt-2 text-center">
                {loginError}
              </p>
            )}
          </div>
        </div>
      )}

      {/* CONTENIDO */}
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Carrito de compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* LISTA ITEMS */}
          <section className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex bg-gray-800 text-white text-sm font-semibold px-4 py-3">
              <div className="flex-1">Producto</div>
              <div className="w-40 text-center">Cantidad</div>
              <div className="w-36 text-right">Precio</div>
            </div>

            {items.length === 0 ? (
              <div className="p-6 text-gray-500">
                Tu carrito está vacío.
                <Link
                  className="text-purple-700 hover:underline ml-2"
                  href="/catalogo"
                >
                  Ir al catálogo
                </Link>
              </div>
            ) : (
              <ul className="divide-y">
                {items.map((it) => {
                  const lineTotal =
                    Number(it.precio || 0) * Number(it.qty || 0);

                  return (
                    <li key={it.id} className="flex items-center px-4 py-4">
                      <div className="flex-1 flex gap-4">
                        <img
                          src={it.imagen || "/images/default-product.png"}
                          alt={it.titulo}
                          className="w-16 h-16 object-contain"
                        />
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900">
                            {it.titulo}
                          </p>
                          {it.sku && (
                            <p className="text-gray-500">SKU: {it.sku}</p>
                          )}
                          {it.categoria && (
                            <p className="text-gray-500">
                              Categoría: {it.categoria}
                            </p>
                          )}

                          <button
                            onClick={() => removeItem(it.id)}
                            className="mt-2 text-xs text-red-600 hover:underline"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>

                      {/* Cantidad */}
                      <div className="w-40 flex justify-center">
                        <div className="inline-flex items-stretch border rounded-lg overflow-hidden">
                          <button
                            onClick={() => dec(it.id, it.stock)}
                            className="px-3 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            −
                          </button>

                          <input
                            type="number"
                            min={1}
                            value={it.qty}
                            onChange={(e) =>
                              setQty(it.id, e.target.value, it.stock)
                            }
                            className="w-16 text-center border-x outline-none"
                          />

                          <button
                            onClick={() => inc(it.id, it.stock)}
                            className="px-3 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="w-36 text-right font-semibold text-gray-900">
                        {precioCLP(lineTotal)}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Acciones */}
            <div className="flex justify-between items-center px-4 py-4">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold px-3 py-2 rounded"
              >
                ◀ Seguir comprando
              </Link>

              {items.length > 0 && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold px-4 py-2 rounded"
                >
                  Pagar ahora
                </button>
              )}
            </div>
          </section>

          {/* TOTALES */}
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

              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>Descuento ({appliedCoupon.codigo}):</span>
                  <span>-{precioCLP(descuento)}</span>
                </div>
              )}

              <hr />

              <div className="flex justify-between text-base font-bold">
                <span>Total:</span>
                <span>{precioCLP(total)}</span>
              </div>

              {/* CUPÓN */}
              <div className="mt-4">
                <p className="text-sm font-semibold mb-1 text-gray-700">
                  Tengo un código promocional
                </p>

                {!appliedCoupon ? (
                  <>
                    <input
                      type="text"
                      value={cuponIngresado}
                      onChange={(e) => setCuponIngresado(e.target.value)}
                      placeholder="Ingresa tu cupón"
                      className="border w-full p-2 rounded mb-2"
                    />

                    <button
                      onClick={aplicarCupon}
                      className="bg-gray-800 hover:bg-black text-white text-sm px-3 py-2 rounded w-full"
                    >
                      Aplicar cupón
                    </button>

                    {errorCupon && (
                      <p className="text-red-500 text-xs mt-1">
                        {errorCupon}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="p-3 bg-green-100 border border-green-300 rounded">
                    <p className="font-semibold text-green-900 text-sm">
                      Cupón aplicado: {appliedCoupon.codigo}
                    </p>

                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-red-600 text-xs mt-1 underline"
                    >
                      Quitar cupón
                    </button>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* MODAL DE MÉTODOS DE PAGO */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-bold mb-4">
              Elige tu método de pago
            </h2>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  handlePay();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                💳 Pagar con Webpay
              </button>

              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  handlePayMP();
                }}
                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                🛒 Pagar con Mercado Pago
              </button>
            </div>

            <button
              onClick={() => setShowPaymentModal(false)}
              className="mt-4 text-gray-500 hover:underline text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        style={{ backgroundColor: colorFooter }}
        className="text-black mt-16"
      >
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">
              Ayuda
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/ayuda" className="hover:text-teal-300">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link href="/seguimiento" className="hover:text-teal-300">
                  Seguimiento de mi compra
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">
              Nosotros
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/quienes_somos" className="hover:text-teal-300">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-teal-300">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">
              Comunidad Blitz
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/blitz.hardware?igsh=b29mcW00OGthcnM3"
                  target="_blank"
                  className="hover:text-teal-300"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-black/30 text-center text-xs py-3">
          © 2025–2025 | Desarrollado por Cristopher Garcia, Jesus Lagos e
          Ignacio Varas — Proyecto Capstone
        </div>
      </footer>
    </div>
  );
}
