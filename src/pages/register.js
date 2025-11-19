import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    telefono: "",
    compraConFactura: false,
    region_id: "",
    comuna_id: "",
    calle: "",
    numero: "",
    depto: "",
    nombreRecibe: "",
    apellidoRecibe: "",
    telefonoRecibe: "",
    password: "",
    repeatPassword: "",
  });

  // Regiones y comunas
  const [region, setRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Función para manejar inputs genéricos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Manejar cambio de región
  const handleRegionChange = (e) => {
    const regionId = e.target.value;
    setSelectedRegion(regionId);
    setFormData((prev) => ({
      ...prev,
      region_id: regionId,
      comuna_id: "", // reset comuna al cambiar de región
    }));
  };

  // Cargar regiones y comunas desde la API
useEffect(() => {
  async function fetchRegion() {
    try {
      const res = await fetch("/api/regionesComunas");
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("Respuesta de regiones inválida:", data);
        return;
      }

      setRegion(data);
    } catch (err) {
      console.error("Error al obtener regiones:", err);
    }
  }

  fetchRegion();
}, []);
const formatRut = (rut) => {
  // Eliminar caracteres que no sean números o K
  rut = rut.replace(/[^0-9kK]/g, "").toUpperCase();

  // Separar cuerpo y DV
  let cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1);

  // Agregar puntos al cuerpo
  let cuerpoFormateado = "";
  while (cuerpo.length > 3) {
    cuerpoFormateado = "." + cuerpo.slice(-3) + cuerpoFormateado;
    cuerpo = cuerpo.slice(0, -3);
  }
  cuerpoFormateado = cuerpo + cuerpoFormateado;

  // Unir con guion si hay DV
  return dv ? `${cuerpoFormateado}-${dv}` : cuerpoFormateado;
};

// validacion de rut
const validarRut = (rut) => {
  // Elimina puntos y guion
  rut = rut.replace(/\./g, "").replace("-", "").toUpperCase();

  // Separar cuerpo y dígito verificador
  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);

  if (cuerpo.length < 7) {
    return false; // RUT muy corto
  }
  // Calcular DV esperado
  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);
  let dvFinal = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dvFinal === dv;
};

const [errors, setErrors] = useState({});
  // Validación simple
  const validateForm = () => {
    let newErrors = {};
    if (formData.password !== formData.repeatPassword) {
      alert("Las contraseñas no coinciden");
      return false;
    }
     if (!/^\d{9}$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener exactamente 9 dígitos";
    }
    
    if (!validarRut(formData.rut)) {
      newErrors.rut = "El RUT ingresado no es válido";
    }
      setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const regionNombre = region.find(r => r.id.toString() === formData.region_id)?.nombre || "";
  const comunaNombre = region
    .find(r => r.id.toString() === formData.region_id)
    ?.comunas.find(c => c.id.toString() === formData.comuna_id)?.nombre || "";

  const payload = {
    ...formData,
    region: regionNombre,
    comuna: comunaNombre,
  };

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Usuario registrado correctamente");
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
        <h1 className="text-3xl font-bold text-center text-[var(--color-secondary)] mb-8">
          Registro
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Titular de la cuenta */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium">
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
               <label htmlFor="rut" className="block text-sm font-medium">
    RUT
  </label>
  <input
    type="text"
    id="rut"
    name="rut"
    value={formData.rut}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        rut: formatRut(e.target.value),
      }))
    }
    className="mt-1 p-2 w-full border border-gray-300 rounded"
    required
  />
  {errors.rut && <p className="text-red-500 text-sm">{errors.rut}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium">
                Teléfono
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
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
              <label htmlFor="compraConFactura" className="text-sm">
                Necesito comprar con factura
              </label>
            </div>
          </div>

          {/* Dirección */}
          <h3 className="text-lg font-semibold mb-4">Dirección de Envío</h3>
          <div className="mb-6">
            <label htmlFor="region" className="block text-sm font-medium">
              Región
            </label>
            <select
              id="region"
              name="region_id"
              value={formData.region_id}
              onChange={handleRegionChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              required
            >
              <option value="">Selecciona una región</option>
              {region.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="comuna" className="block text-sm font-medium">
              Comuna
            </label>
            <select
              id="comuna"
              name="comuna_id"
              value={formData.comuna_id}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              disabled={!selectedRegion}
              required
            >
              <option value="">Selecciona una comuna</option>
              {selectedRegion &&
  region
    .find((r) => r.id.toString() === selectedRegion) // ← usar toString()
    ?.comunas.map((comuna) => (
      <option key={comuna.id} value={comuna.id}>
        {comuna.nombre}
      </option>
    ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="calle" className="block text-sm font-medium">
                Calle
              </label>
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
              <label htmlFor="numero" className="block text-sm font-medium">
                Número
              </label>
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
              <label htmlFor="password" className="block text-sm font-medium">
                Contraseña
              </label>
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
              <label htmlFor="repeatPassword" className="block text-sm font-medium">
                Repite contraseña
              </label>
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

          <button type="submit" className="btn-primary w-full">
            Registrar
          </button>
        </form>

      </section>
    </main>
  );
}
