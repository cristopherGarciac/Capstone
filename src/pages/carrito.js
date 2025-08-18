import { useState } from "react";
import Link from "next/link";

export default function Carrito() {
  // Productos en el carrito (esto puede venir de una base de datos o de la localStorage)
  const [carrito, setCarrito] = useState([
    {
      id: 1,
      nombre: "Procesador Intel i7",
      precio: 250000,
      cantidad: 1,
      imagen: "/images/i7.png",
    },
    {
      id: 2,
      nombre: "Tarjeta Gráfica RTX 3060",
      precio: 399000,
      cantidad: 1,
      imagen: "/images/3060.png",
    },
  ]);

  // Función para eliminar un producto del carrito
  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((prod) => prod.id !== id);
    setCarrito(nuevoCarrito);
  };

  // Función para aumentar la cantidad de un producto
  const aumentarCantidad = (id) => {
    const nuevoCarrito = carrito.map((prod) => {
      if (prod.id === id) {
        return { ...prod, cantidad: prod.cantidad + 1 };
      }
      return prod;
    });
    setCarrito(nuevoCarrito);
  };

  // Calcular el precio total
  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
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
            <Link href="/" className="text-gray-700 hover:text-[var(--color-accent)]">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-accent)]">
              Catálogo
            </Link>
            <Link href="/carrito" className="text-gray-700 hover:text-[var(--color-accent)]">
              <img src="/images/carrito.png" alt="Carrito Compra Logo" className="h-20 w-auto" />
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
                        <p className="text-sm text-gray-500">Precio Unitario: ${producto.precio}</p>
                        <p className="text-sm text-gray-500">Cantidad: {producto.cantidad}</p>
                        <p className="text-sm text-gray-500">
                          Subtotal: ${producto.precio * producto.cantidad}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => aumentarCantidad(producto.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                      >
                        Agregar
                      </button>
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
                <h3 className="text-xl font-semibold">Total: ${calcularTotal()}</h3>
                <button className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg">
                  Proceder al Pago
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==== FOOTER ==== */}
      <footer className="bg-[#FFD700] text-black mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-gray-300 pl-3">Ayuda</h4>
            <ul className="space-y-2 text-black">
              <li><Link href="/ayuda" className="hover:text-teal-300">Centro de ayuda</Link></li>
              <li><Link href="/seguimiento" className="hover:text-teal-300">Seguimiento de mi compra</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-gray-300 pl-3">Nosotros</h4>
            <ul className="space-y-2 text-black">
              <li><Link href="/about" className="hover:text-teal-300">Quiénes somos</Link></li>
              <li><Link href="/corporativo" className="hover:text-teal-300">Ventas corporativas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-gray-300 pl-3">Comunidad SP</h4>
            <ul className="space-y-2 text-black">
              <li><a href="https://www.instagram.com/mr.popo_lf" target="_blank" className="hover:text-teal-300">Instagram</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-white/10" />

        {/* Medios de pago */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h5 className="text-lg font-semibold mb-6 border-l-4 border-gray-300 pl-3">Medios de pago</h5>
          <div className="flex flex-wrap items-center gap-6 grayscale">
            <img src="/images/webpay.png" alt="Web Pay" width={100} height={50} />
            <img src="/images/mercado.png" alt="Mercado Pago" width={100} height={50} />
          </div>
        </div>
      </footer>
    </main>
  );
}