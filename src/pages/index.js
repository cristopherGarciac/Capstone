import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);

  // Estado para el login
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Estado de error o mensajes
  const [loginError, setLoginError] = useState("");

  // Estado del usuario logueado
  const [user, setUser] = useState(null);

  const promociones = [
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
      imagen: "/images/i7.png",
    },
    {
      id: 2,
      nombre: "Tarjeta Gráfica RTX 3060",
      descripcion: "12GB GDDR6",
      precio: "$399.000",
      imagen: "/images/3060.png",
    },
    {
      id: 3,
      nombre: "Memoria RAM Corsair 16GB",
      descripcion: "DDR4 3200MHz",
      precio: "$75.000",
      imagen: "/images/ddr.png",
    },
  ];

  // Manejo de inputs del login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejo del login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el usuario en el estado
        setUser(data);

        // Cerrar el modal de login
        setLoginOpen(false);
      } else {
        setLoginError(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setLoginError("Ocurrió un error en el servidor.");
    }
  };

  // Carrusel
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "/images/blitzHardware banner.png",
    "/images/componentes.png",
    "/images/nvidia.png",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

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
          {/* Logo */}
          <Link className="logo text-2xl font-bold text-[var(--color-primary)]" href="/">
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
              <img src="/images/carrito.png" alt="Carrito Compra Logo" className="h-11 w-auto" />
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-[var(--color-accent)]">
              Admin
            </Link>

            {/* Mostrar usuario logueado o botón login */}
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
        <div className="fixed inset-0 bg-black flex justify-center items-start pt-24 z-50" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-4 text-center">Iniciar Sesión</h2>

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

            {loginError && <p className="text-red-500 text-sm mt-2 text-center">{loginError}</p>}

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

      {/* Carrusel */}
      <section>
        <div className="relative">
          <div className="w-full overflow-hidden rounded-lg h-96">
            <img src={images[currentSlide]} alt="Carrusel" className="w-full h-full object-cover" />
          </div>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
            onClick={prevSlide}
          >
            &#10094;
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
            onClick={nextSlide}
          >
            &#10095;
          </button>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="bg-gray-50 py-12">
        <h2 className="text-3xl font-bold text-center text-[var(--color-secondary)] mb-8">
          Productos Destacados
        </h2>
        <div className="flex overflow-x-auto space-x-6 px-6">
          {productosDestacados.map((prod) => (
            <div key={prod.id} className="card min-w-[250px]">
              <img src={prod.imagen} alt={prod.nombre} className="rounded-t-xl w-full h-40 object-contain mx-auto mb-4" />
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

      {/* Footer */}
      <footer className="bg-[#FFD700] text-black mt-16">
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

        <div className="max-w-7xl mx-auto px-6 py-8">
          <h5 className="text-lg font-semibold mb-6 border-l-4 border-blue-300 pl-3">Medios de pago</h5>
          <div className="flex flex-wrap items-center gap-6">
            <span className="bg-white/5 px-4 py-2 rounded-md">
              <img src="/images/mercado.png" alt="Mercado Pago" width={100} height={50} />
            </span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
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

        <div className="bg-black/30 text-center text-xs py-3">
          © 2025–2025 | Desarrollado por Cristopher Garcia, Jesus Lagos e Ignacio Varas, Proyecto Capstone
        </div>
      </footer>
    </main>
  );
}
