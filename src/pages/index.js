import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);

  const promociones = [
    { texto: "6 Cuotas Sin Interés", destaque: true },
    { texto: "Despacho a Todo Chile", destaque: false },
    { texto: "Marcas Exclusivas", destaque: false },
  ];

  const categorias = [
    { nombre: "Procesadores", slug: "procesadores" },
    { nombre: "Placas Madre", slug: "placas-madre" },
    { nombre: "Tarjetas Gráficas", slug: "tarjetas-graficas" },
    { nombre: "RAM", slug: "ram" },
    { nombre: "Almacenamiento (SSD/HDD)", slug: "almacenamiento" },
  ];

  const productosDestacados = [
    {
      id: 1,
      nombre: "Procesador Intel i7",
      descripcion: "11va generación, 3.8GHz",
      precio: "$250.000",
      imagen: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      nombre: "Tarjeta Gráfica RTX 3060",
      descripcion: "12GB GDDR6",
      precio: "$399.000",
      imagen: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      nombre: "Memoria RAM Corsair 16GB",
      descripcion: "DDR4 3200MHz",
      precio: "$75.000",
      imagen: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* Barra superior */}
      <div className="bg-[var(--color-secondary)] text-white text-center py-2 text-sm">
        {promociones.map((p, i) => (
          <span key={i} className={`mx-4 ${p.destaque ? "font-semibold" : ""}`}>
            {p.texto}
          </span>
        ))}
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">Blitz Hardware</h2>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-[var(--color-accent)]">Inicio</Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-accent)]">Catálogo</Link>
            <Link href="/about" className="text-gray-700 hover:text-[var(--color-accent)]">About</Link>
            
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
          </div>
        </div>
      </nav>

      {/* Modal de login */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black  flex justify-center items-start pt-24 z-50">
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
              <span>¿No estás registrado? <button className="text-blue-600 hover:underline">Regístrate</button></span>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="bg-white py-16 text-center">
        <h1 className="text-5xl font-bold text-[var(--color-secondary)]">
          Catálogo de Componentes para PC
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Todo lo que necesitas para armar tu PC: desde procesadores hasta almacenamiento.
        </p>
        <Link
          href="/catalogo"
          className="mt-6 inline-block btn-primary"
        >
          Ver Catálogo
        </Link>
      </section>

      {/* Productos destacados */}
      <section className="bg-gray-50 py-12">
        <h2 className="text-3xl font-bold text-center text-[var(--color-secondary)] mb-8">
          Productos Destacados
        </h2>
        <div className="flex overflow-x-auto space-x-6 px-6">
          {productosDestacados.map((prod) => (
            <div key={prod.id} className="card min-w-[250px]">
              <img src={prod.imagen} alt={prod.nombre} className="rounded-t-xl w-full h-40 object-cover"/>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-[var(--color-secondary)]">{prod.nombre}</h3>
                <p className="text-sm text-gray-500">{prod.descripcion}</p>
                <p className="text-lg font-bold text-[var(--color-primary)] mt-2">{prod.precio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-6xl mx-auto py-12 grid grid-cols-2 md:grid-cols-5 gap-6 px-4">
        {categorias.map((cat) => (
          <Link key={cat.slug} href={`/catalogo?categoria=${cat.slug}`} className="card text-center p-4">
            <h3 className="font-semibold text-[var(--color-secondary)]">{cat.nombre}</h3>
          </Link>
        ))}
      </section>
    </main>
  );
}
