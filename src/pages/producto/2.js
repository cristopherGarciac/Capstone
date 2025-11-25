import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductDetail2() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // Cantidad seleccionada
  const [carritoConProductos, setCarritoConProductos] = useState(false); // Logo notificación

  const product = {
    id: 2,
    nombre: "Tarjeta Gráfica RTX 3060",
    descripcion: "12GB GDDR6",
    precio: 399000,
    imagen: "/images/3060.png",
    categoria: "tarjetas-graficas",
  };

  const handleQuantityChange = (operation) => {
    if (operation === "increment") setQuantity(quantity + 1);
    else if (operation === "decrement" && quantity > 1) setQuantity(quantity - 1);
  };

  // Función para añadir al carrito
  const agregarAlCarrito = () => {
    let carritoLocal = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carritoLocal.find((item) => item.id === product.id);

    if (productoExistente) {
      carritoLocal = carritoLocal.map((item) =>
        item.id === product.id ? { ...item, cantidad: item.cantidad + quantity } : item
      );
    } else {
      carritoLocal.push({ ...product, cantidad: quantity });
    }

    localStorage.setItem("carrito", JSON.stringify(carritoLocal));

    // Cambiar logo a carritonotifi.png
    setCarritoConProductos(true);
  };

  // Mostrar logo normal cuando se carga la página
  useEffect(() => {
    setCarritoConProductos(false);
  }, []);

  const calcularPrecioTotal = () => product.precio * quantity;

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* Barra superior */}
      <div className="bg-[var(--color-secondary)] text-white text-center py-2 text-sm">
        <span className="mx-4">Despacho a Todo Chile</span>
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
              <img
                src={carritoConProductos ? "/images/carritonotifi.png" : "/images/carrito.png"}
                alt="Carrito Compra Logo"
                className="h-11 w-auto"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Detalles del producto */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6">
          <div className="flex justify-center">
            <img src={product.imagen} alt={product.nombre} className="w-full h-80 object-contain" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-[var(--color-primary)]">{product.nombre}</h1>
            <p className="text-lg text-gray-600 mt-2">{product.descripcion}</p>
            <p className="text-2xl font-bold text-[var(--color-primary)] mt-4">
              Precio unitario: ${product.precio.toLocaleString("es-CL")}
            </p>
            <p className="text-xl font-semibold mt-4">Precio total: ${calcularPrecioTotal().toLocaleString("es-CL")}</p>

            {/* Cantidad */}
            <div className="mt-6 flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange("decrement")}
                className="p-2 bg-gray-300 rounded-md"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min="1"
                className="mx-4 p-2 border rounded-md text-center w-16"
                readOnly
              />
              <button
                onClick={() => handleQuantityChange("increment")}
                className="p-2 bg-gray-300 rounded-md"
              >
                +
              </button>
            </div>

            {/* Botón Añadir al carrito */}
            <button
              onClick={agregarAlCarrito}
              className="btn-primary w-full mt-8 p-3 rounded-md bg-[var(--color-primary)] text-white font-semibold"
            >
              Añadir al carrito
            </button>

            {/* Textos debajo del botón */}
            <div className="mt-8 text-sm text-gray-600">
              <p>Despachos a domicilio en todo Chile por medio de Starken, Bluexpress y Chilexpress</p>
              <p>Retira tu compra en más de 1.000 puntos de entrega disponibles en todo Chile</p>
              <p>3 a 6 cuotas sin interés con Mercadopago</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}