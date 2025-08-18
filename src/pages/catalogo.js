import { useState } from "react";
import Link from "next/link";

export default function Catalogo() {
  const [loginOpen, setLoginOpen] = useState(false);

  const categorias = [
    { nombre: "Procesadores", slug: "procesadores" },
    { nombre: "Placas Madre", slug: "placas-madre" },
    { nombre: "Tarjetas Gráficas", slug: "tarjetas-graficas" },
    { nombre: "RAM", slug: "ram" },
    { nombre: "Almacenamiento (SSD/HDD)", slug: "almacenamiento" },
  ];

  const productos = [
    {
      id: 1,
      nombre: "Procesador Intel i7",
      descripcion: "11va generación, 3.8GHz",
      precio: "$250.000",
      imagen: "/images/i7.png", // Asegúrate de que esta imagen esté en la carpeta "public/images"
      categoria: "procesadores",
    },
    {
      id: 2,
      nombre: "Tarjeta Gráfica RTX 3060",
      descripcion: "12GB GDDR6",
      precio: "$399.000",
      imagen: "/images/3060.png",
      categoria: "tarjetas-graficas",
    },
    {
      id: 3,
      nombre: "Memoria RAM Corsair 16GB",
      descripcion: "DDR4 3200MHz",
      precio: "$75.000",
      imagen: "/images/ddr.png",
      categoria: "ram",
    },
  ];

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const filtrarProductos = categoria => {
    if (categoria === "todos") {
      return productos;
    }
    return productos.filter(prod => prod.categoria === categoria);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className="logo text-2xl font-bold text-[var(--color-primary)]">
            <img src="/images/blitz.png" alt="Blitz Hardware Logo" className="h-20 w-auto" />
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-[var(--color-accent)]">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-accent)]">
              Catálogo
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[var(--color-accent)]">
              About
            </Link>
            {/* Botón login */}
            <button
              onClick={() => setLoginOpen(true)}
              className="text-gray-700 hover:text-[var(--color-accent)] flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.001 9.001 0 0112 15a9.001 9.001 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
              Iniciar sesión
            </button>
            {/* Modal de login */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black  flex justify-center items-start pt-24 z-50" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-4 text-center">Iniciar Sesión</h2>
            <form className="flex flex-col gap-4">
              <input type="email" placeholder="Correo electrónico" className="border p-2 rounded"/>
              <input type="password" placeholder="Contraseña" className="border p-2 rounded"/>
              <button type="submit" className="btn-primary w-full">Iniciar Sesión</button>
            </form>
            <div className="flex flex-col items-center text-sm mt-4 gap-2">
              <button className="text-blue-600 hover:underline">Olvidé mi contraseña</button>
              <span>
                ¿No estás registrado?{" "}
                <Link href="/register" className="text-blue-600 hover:underline">
                Regístrate
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      </nav>

      {/* Contenido de la página */}
      <div className="flex gap-8 px-6 py-12">
        {/* Filtros a la izquierda */}
        <div className="w-1/4 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-4">Categorías</h2>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setCategoriaSeleccionada("todos")}
              className="btn-primary text-sm py-2 px-4 text-blue-600 hover:text-blue-800"
            >
              Todos
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setCategoriaSeleccionada(cat.slug)}
                className="btn-primary text-sm py-2 px-4 text-green-600 hover:text-green-800"
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Productos a la derecha */}
        <div className="w-3/4">
          <h2 className="text-3xl font-bold text-center text-[var(--color-secondary)] mb-8">
            {categoriaSeleccionada ? `Productos en ${categoriaSeleccionada}` : "Productos Destacados"}
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {filtrarProductos(categoriaSeleccionada || "todos").map((prod) => (
              <div key={prod.id} className="card min-w-[250px]">
                {/* Imagen centrada */}
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className="rounded-t-xl w-full h-40 object-contain mx-auto mb-4"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-[var(--color-secondary)]">{prod.nombre}</h3>
                  <p className="text-sm text-gray-500">{prod.descripcion}</p>
                  <p className="text-lg font-bold text-[var(--color-primary)] mt-2">{prod.precio}</p>
                  <Link
                    href={`/producto/${prod.id}`}
                    className="mt-4 inline-block btn-primary"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#FFD700] text-black mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-gray-300 pl-3">
              Ayuda
            </h4>
            <ul className="space-y-2 text-black">
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
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-gray-300 pl-3">
              Nosotros
            </h4>
            <ul className="space-y-2 text-black">
              <li>
                <Link href="/about" className="hover:text-teal-300">
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
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-gray-300 pl-3">
              Comunidad SP
            </h4>
            <ul className="space-y-2 text-black">
              <li>
                <a
                  href="https://www.instagram.com/mr.popo_lf"
                  target="_blank"
                  className="hover:text-teal-300"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
