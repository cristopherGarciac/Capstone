import { useState, useEffect } from "react";
import Link from "next/link";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [carritoLogo, setCarritoLogo] = useState("/images/carrito.png");

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoLocal);

    // Cambiar logo si hay productos
    setCarritoLogo(carritoLocal.length > 0 ? "/images/carritonotifi.png" : "/images/carrito.png");
  }, []);

  // Función para eliminar un producto del carrito
  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((prod) => prod.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setCarritoLogo(nuevoCarrito.length > 0 ? "/images/carritonotifi.png" : "/images/carrito.png");
  };

  // Función para aumentar la cantidad de un producto
  const aumentarCantidad = (id) => {
    const nuevoCarrito = carrito.map((prod) =>
      prod.id === id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  // Función para disminuir la cantidad de un producto
  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito.map((prod) =>
      prod.id === id && prod.cantidad > 1
        ? { ...prod, cantidad: prod.cantidad - 1 }
        : prod
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  // Calcular el precio total
  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  // Función para formatear precios
  const formatearPrecio = (precio) => {
    return precio.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* Barra superior */}
      <div className="bg-[var(--color-secondary)] text-white text-center py-2 text-sm">
        <span>Despacho a Todo Chile | Marcas Exclusivas</span>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-[var(--color-primary)]">
            <img src="/images/blitz.png" alt="Blitz Hardware Logo" className="h-20 w-auto" />
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-[var(--color-accent)]">Inicio</Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-accent)]">Catálogo</Link>
            <Link href="/carrito" className="text-gray-700 hover:text-[var(--color-accent)]">
              <img src={carritoLogo} alt="Carrito Compra Logo" className="h-11 w-auto" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Carrito de compras */}
      <section className="py-16">
        <h2 className="text-4xl font-semibold text-center mb-8">Tu Carrito de Compras</h2>
        <div className="max-w-7xl mx-auto px-6">
          {carrito.length === 0 ? (
            <p className="text-center text-gray-600">Tu carrito está vacío</p>
          ) : (
            <div>
              <div className="space-y-6">
                {carrito.map((producto) => (
                  <div key={producto.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="h-20 w-auto rounded"
                      />
                      <div className="ml-4">
                        <h3 className="font-semibold text-[var(--color-primary)]">{producto.nombre}</h3>
                        <p className="text-sm text-gray-500">
                          Precio Unitario: {formatearPrecio(producto.precio)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => disminuirCantidad(producto.id)}
                            className="px-2 py-1 bg-gray-300 rounded-md"
                          >
                            -
                          </button>
                          <span className="text-sm">{producto.cantidad}</span>
                          <button
                            onClick={() => aumentarCantidad(producto.id)}
                            className="px-2 py-1 bg-green-500 text-white rounded-md"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Subtotal: {formatearPrecio(producto.precio * producto.cantidad)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => eliminarProducto(producto.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen del carrito */}
              <div className="mt-6 flex justify-between items-center">
                <h3 className="text-xl font-semibold">Total: {formatearPrecio(calcularTotal())}</h3>
                <button className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg">
                  Proceder al Pago
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==== FOOTER ==== */}
<footer className="bg-[#FFD700] text-black mt-16">  {/* Fondo amarillo con texto negro */}
  {/* Links principales */}
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Ayuda */}
    <div>
      <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Ayuda</h4> {/* Cambié border-teal-400 a border-gray-300 */}
      <ul className="space-y-2 text-black">  {/* Cambié text-gray-200 a text-black */}
        <li><Link href="/ayuda" className="hover:text-teal-300">Centro de ayuda</Link></li>
        <li><Link href="/seguimiento" className="hover:text-teal-300">Seguimiento de mi compra</Link></li>
      </ul>
    </div>

    {/* Nosotros */}
    <div>
      <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Nosotros</h4> {/* Cambié border-teal-400 a border-gray-300 */}
      <ul className="space-y-2 text-black">  {/* Cambié text-gray-200 a text-black */}
        <li><Link href="/quienes_somos" className="hover:text-teal-300">Quiénes somos</Link></li>
        <li><Link href="/terminos" className="hover:text-teal-300">Términos y Condiciones</Link></li>
      </ul>
    </div>

    {/* Comunidad */}
    <div>
      <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Comunidad Blitz</h4> {/* Cambié border-teal-400 a border-gray-300 */}
      <ul className="space-y-2 text-black">  {/* Cambié text-gray-200 a text-black */}
        <li><a href="https://www.instagram.com/blitz.hardware?igsh=b29mcW00OGthcnM3" target="_blank" className="hover:text-teal-300">Instagram</a></li>
      </ul>
    </div>
  </div>

  <hr className="border-white/10" />

  {/* Medios de pago */}
  <div className="max-w-7xl mx-auto px-6 py-8">
    <h5 className="text-lg font-semibold mb-6 border-l-4  border-blue-300 pl-3">Medios de pago</h5> 
    <div className="flex flex-wrap items-center gap-6 ">
      <span className="bg-white/5 px-4 py-2 rounded-md">
        <img src="/images/mercado.png" alt="Mercado Pago" width={100} height={50} />
      </span>
    </div>
  </div>

  {/* Badges + redes + dirección/horario */}
  <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
    {/* Badges */}
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-white/10 grid place-items-center">🏛️</div>
        <div className="text-sm text-black">
          Dirección <br /> <span className="font-semibold">ChileCompra</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-white/10 grid place-items-center">🛡️</div>
        <div className="text-sm text-black">
          Protegido con <span className="font-semibold">seguridad</span>
        </div>
      </div>
    </div>

  
  </div>

  {/* Barra inferior */}
  <div className="bg-black/30 text-center text-xs   -300 py-3">
    © 2025–2025 | Desarrollado por Cristopher Garcia, Jesus Lagos e Ignacio Varas, Proyecto Capstone
  </div>
</footer>
    </main>
  );
}