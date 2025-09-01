import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  // Estado para manejar los inputs
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    telefono: "",
    compraConFactura: false,
    region: "",
    comuna: "",
    calle: "",
    numero: "",
    depto: "",
    nombreRecibe: "",
    apellidoRecibe: "",
    telefonoRecibe: "",
    password: "",
    repeatPassword: "",
  });

  // Listado de regiones (puedes agregar más opciones aquí)
  const regiones = ["Metropolitana", "Valparaíso", "Maule"];

  // Comunas dependiendo de la región seleccionada
  const comunas = {
    Metropolitana: ["Santiago", "Las Condes", "Providencia"],
    Valparaíso: ["Valparaíso", "Viña del Mar", "Quillota"],
    Maule: ["Talca", "Curicó", "Linares"],
  };

  const [selectedRegion, setSelectedRegion] = useState("");

  // Función para manejar el cambio de un input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Función para manejar la selección de la región
  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setFormData((prevData) => ({
      ...prevData,
      region: region,
      comuna: "", // limpiar comuna al cambiar de región
    }));
  };

  // Validaciones
  const validateForm = () => {
    if (formData.password !== formData.repeatPassword) {
      alert("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Usuario registrado correctamente");
        // 🔥 Redirigir al inicio
        router.push("/");
      } else {
        alert(data.error || "Hubo un error al registrar el usuario");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el servidor");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="logo text-2xl font-bold text-[var(--color-primary)]">
            <img src="/images/blitz.png" alt="Blitz Hardware Logo" className="h-20 w-auto" />
          </Link>
        </div>
      </nav>

      {/* Sección de Registro */}
      <section className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-[var(--color-secondary)] mb-8">Registro</h1>

        <form onSubmit={handleSubmit}>
          {/* Titular de la cuenta */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                placeholder="Ingresa un nombre válido"
                required
              />
            </div>
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                placeholder="Ingresa un apellido válido"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="rut" className="block text-sm font-medium">RUT</label>
              <input
                type="text"
                id="rut"
                name="rut"
                value={formData.rut}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                placeholder="12345678-9"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium">Teléfono</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                placeholder="+569..."
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="compraConFactura"
                name="compraConFactura"
                checked={formData.compraConFactura}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="compraConFactura" className="text-sm">Necesito comprar con factura</label>
            </div>
          </div>

          {/* Dirección */}
          <h3 className="text-lg font-semibold mb-4">Dirección de Envío</h3>
          <div className="mb-6">
            <label htmlFor="region" className="block text-sm font-medium">Región</label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleRegionChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              required
            >
              <option value="">Selecciona una región</option>
              {regiones.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="comuna" className="block text-sm font-medium">Comuna</label>
            <select
              id="comuna"
              name="comuna"
              value={formData.comuna}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              disabled={!selectedRegion}
              required
            >
              <option value="">Selecciona una comuna</option>
              {selectedRegion &&
                comunas[selectedRegion]?.map((comuna) => (
                  <option key={comuna} value={comuna}>{comuna}</option>
                ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="calle" className="block text-sm font-medium">Calle</label>
              <input
                type="text"
                id="calle"
                name="calle"
                value={formData.calle}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="numero" className="block text-sm font-medium">Número</label>
              <input
                type="text"
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="repeatPassword" className="block text-sm font-medium">Repite contraseña</label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">Registrar</button>
        </form>
      </section>
    </main>
  );
}
