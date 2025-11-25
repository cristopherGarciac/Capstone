import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

export default function Configuracion() {
  const admin = { nombre: "Admin Cristopher", avatar: "/images/admin-avatar.png" };

  // ====== STATE BASE CONFIG ======
  const [configTemp, setConfigTemp] = useState({
    // Base
    nombrePagina: "Mi E-commerce",
    colorHeader: "#afbbcfff",
    colorFooter: "#b4bbd4ff",
    logo: "/images/blitz.png",

    // Botones (vars CSS)
    btnBg: "#7e22ce",
    btnText: "#ffffff",
    btnBorder: "#7e22ce",
    btnHoverBg: "#6b21a8",
    btnHoverText: "#ffffff",

    // Carrusel (ahora como OBJETOS + zoom)
    carrusel: [
      { url: "/images/blitzHardware banner.png", posX: 50, posY: 50, zoom: 100 },
      { url: "/images/componentes.png",          posX: 50, posY: 50, zoom: 100 },
      { url: "/images/nvidia.png",              posX: 50, posY: 50, zoom: 100 },
    ],
    carruselAuto: true,
    carruselDelaySec: 5,

    // HERO / Destacados
    heroTitulo: "Productos Destacados",
    heroSubtitulo: "Lo mejor para tu setup",

    // Colores extra
    colorPrimario: "#0ea5e9",        // CTA
    colorSecundario: "#111827",      // títulos/textos
    colorFondoDestacados: "#f8fafc", // (en index ya lo dejamos transparente, pero conservamos la var)
    colorTextoBtnSolid: "#ffffff",

    // Botones de categorías
    btnEstilo: "solid",    // 'solid' | 'outline' | 'ghost'
    btnBorde: "rounded",   // 'square' | 'rounded' | 'pill'

    // Categorías (labels)
    categorias: [
      "Procesadores",
      "Placas Madre",
      "Tarjetas Gráficas",
      "RAM",
      "Almacenamiento (SSD/HDD)",
    ],

    // Selección de destacados por UI
    featuredSelectedIds: [],

    // Fondo general
    colorFondo: "#ffffff",
    fondoImagen: "",
  });

  // ====== LOAD CONFIG FROM LS (con MIGRACIÓN de carrusel) ======
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("config");
    if (!raw) return;

    try {
      const configLS = JSON.parse(raw);
      if (!configLS || typeof configLS !== "object") return;

      let migrated = { ...configLS };

      // Migración: featuredProductIds (string) -> featuredSelectedIds (array)
      if (migrated.featuredProductIds && !migrated.featuredSelectedIds) {
        const arr = String(migrated.featuredProductIds)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        migrated.featuredSelectedIds = arr;
        delete migrated.featuredProductIds;
      }

      // 🔁 Migración del carrusel: strings -> objetos { url, posX, posY, zoom }
      if (Array.isArray(migrated.carrusel)) {
        migrated.carrusel = migrated.carrusel.map((item) => {
          if (typeof item === "string") {
            return { url: item, posX: 50, posY: 50, zoom: 100 };
          }
          if (item && typeof item === "object") {
            return {
              url: item.url || item.src || "",
              posX: typeof item.posX === "number" ? item.posX : 50,
              posY: typeof item.posY === "number" ? item.posY : 50,
              zoom: typeof item.zoom === "number" ? item.zoom : 100,
            };
          }
          return { url: "", posX: 50, posY: 50, zoom: 100 };
        });
      }

      setConfigTemp((prev) => ({ ...prev, ...migrated }));
    } catch (e) {
      console.error("Error leyendo/migrando config desde localStorage:", e);
    }
  }, []);

  // ====== INPUT HANDLERS ======
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let next = value;
    if (type === "checkbox") next = checked;
    if (type === "number") next = value === "" ? "" : Number(value);
    setConfigTemp((prev) => ({ ...prev, [name]: next }));
  };

  // Logo
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setConfigTemp((prev) => ({ ...prev, logo: reader.result }));
    reader.readAsDataURL(file);
  };

  // Fondo (imagen)
  const handleFondoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setConfigTemp((prev) => ({ ...prev, fondoImagen: reader.result }));
    reader.readAsDataURL(file);
  };

  // ====== NUEVO: agregar imagen al carrusel con validación de resolución ======
  const handleCarruselImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result;
      if (typeof window === "undefined") return;

      const img = new window.Image();
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;

        // Recomendación de resolución (puedes ajustar el umbral)
        if (w < 1920 || h < 600) {
          alert(
            `⚠ La imagen tiene resolución baja (${w}x${h}). ` +
              `Se recomienda al menos 1920x600 para evitar que se vea pixelada en el carrusel.`
          );
        }

        setConfigTemp((prev) => ({
          ...prev,
          carrusel: [
            ...(Array.isArray(prev.carrusel) ? prev.carrusel : []),
            { url: src, posX: 50, posY: 50, zoom: 100 },
          ],
        }));
      };
      img.src = src;
    };

    reader.readAsDataURL(file);
  };

  // ====== SAVE / RESET ======
  const aplicarCambios = () => {
    if (typeof window === "undefined") return;

    let toSave = { ...configTemp };
    delete toSave.featuredProductIds;

    // --- Limitar tamaño de imágenes en base64 para no reventar localStorage ---
    const MAX_LEN = 200_000; // ~200KB de texto base64 aprox

    const trimDataUrl = (val) => {
      if (typeof val !== "string") return val;
      if (!val.startsWith("data:image")) return val;
      if (val.length <= MAX_LEN) return val;
      console.warn("Imagen demasiado grande, se recorta para evitar QuotaExceeded.");
      // Puedes cambiar "" por null si prefieres
      return "";
    };

    // Limpiar logo y fondo si son data URLs gigantes
    toSave.logo = trimDataUrl(toSave.logo);
    toSave.fondoImagen = trimDataUrl(toSave.fondoImagen);

    // Limpiar carrusel
    if (Array.isArray(toSave.carrusel)) {
      toSave.carrusel = toSave.carrusel.map((item) => {
        if (!item) return item;
        if (typeof item === "string") {
          return trimDataUrl(item);
        }
        return {
          ...item,
          url: trimDataUrl(item.url || item.src || ""),
        };
      });
    }

    try {
      localStorage.setItem("config", JSON.stringify(toSave));
      alert("Configuración guardada ✅");
    } catch (e) {
      console.error("Error al guardar configuración:", e);
      if (
        e.name === "QuotaExceededError" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
        e.code === 22
      ) {
        alert(
          "La configuración no se pudo guardar porque las imágenes (logo/fondo/carrusel) son demasiado pesadas.\n\n" +
            "Prueba usar imágenes más livianas o quitar algunas imágenes del carrusel."
        );
      } else {
        alert("Ocurrió un error al guardar la configuración.");
      }
    }
  };

  const resetConfig = () => {
    if (typeof window === "undefined") return;
    if (
      confirm(
        "¿Seguro que deseas restablecer la configuración a los valores por defecto?"
      )
    ) {
      localStorage.removeItem("config");
      window.location.reload();
    }
  };
const [cupones, setCupones] = useState([]);
const [nuevoCupon, setNuevoCupon] = useState({
  codigo: "",
  descuento: "",
  expiracion: ""
});
const crearCupon = async () => {
  if (!nuevoCupon.codigo || !nuevoCupon.descuento || !nuevoCupon.expiracion) {
    return alert("Completa todos los campos");
  }

  const res = await fetch("/api/cupones", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoCupon)
  });

  const data = await res.json();

  if (res.ok) {
    setCupones([...cupones, data]);
    setNuevoCupon({ codigo: "", descuento: "", expiracion: "" });
  } else {
    alert(data.error);
  }
};
const eliminarCupon = async (codigo) => {
  const res = await fetch("/api/cupones/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ codigo })
  });

  if (res.ok) {
    setCupones(cupones.filter(c => c.codigo !== codigo));
  } else {
    alert("Error eliminando cupón");
  }
};
  // ====== APPLY CSS VARS + BG ======
  useEffect(() => {
    if (typeof document === "undefined") return;
    const r = document.documentElement.style;

    // Header/Footer + botones
    r.setProperty("--color-header", String(configTemp.colorHeader));
    r.setProperty("--color-footer", String(configTemp.colorFooter));
    r.setProperty("--btn-bg", String(configTemp.btnBg));
    r.setProperty("--btn-text", String(configTemp.btnText));
    r.setProperty("--btn-border", String(configTemp.btnBorder));
    r.setProperty("--btn-hover-bg", String(configTemp.btnHoverBg));
    r.setProperty("--btn-hover-text", String(configTemp.btnHoverText));

    // Extras
    r.setProperty("--color-primary", String(configTemp.colorPrimario));
    r.setProperty("--color-secondary", String(configTemp.colorSecundario));
    r.setProperty(
      "--color-destacados-bg",
      String(configTemp.colorFondoDestacados)
    );

    // Fondo body (imagen o color)
    const body = document.body;
    if (configTemp.fondoImagen) {
      body.style.backgroundImage = `url(${configTemp.fondoImagen})`;
      body.style.backgroundSize = "cover";
      body.style.backgroundRepeat = "no-repeat";
      body.style.backgroundPosition = "center";
      body.style.backgroundColor = "";
    } else {
      body.style.backgroundImage = "";
      body.style.backgroundColor = String(configTemp.colorFondo || "#ffffff");
    }
  }, [
    configTemp.colorHeader,
    configTemp.colorFooter,
    configTemp.btnBg,
    configTemp.btnText,
    configTemp.btnBorder,
    configTemp.btnHoverBg,
    configTemp.btnHoverText,
    configTemp.colorPrimario,
    configTemp.colorSecundario,
    configTemp.colorFondoDestacados,
    configTemp.fondoImagen,
    configTemp.colorFondo,
  ]);

  // ====== NUEVO: helpers carrusel (lectura segura) ======
  const carruselArray = Array.isArray(configTemp.carrusel)
    ? configTemp.carrusel
    : [];

  const updateCarruselPos = (index, axis, value) => {
    const num = Number(value);
    setConfigTemp((prev) => {
      const carr = Array.isArray(prev.carrusel) ? [...prev.carrusel] : [];
      const current = carr[index];
      if (!current) return prev;

      let obj =
        typeof current === "string"
          ? { url: current, posX: 50, posY: 50, zoom: 100 }
          : { ...current };

      if (axis === "x") obj.posX = num;
      if (axis === "y") obj.posY = num;

      carr[index] = obj;
      return { ...prev, carrusel: carr };
    });
  };

  const updateCarruselZoom = (index, value) => {
    const num = Number(value);
    setConfigTemp((prev) => {
      const carr = Array.isArray(prev.carrusel) ? [...prev.carrusel] : [];
      const current = carr[index];
      if (!current) return prev;

      let obj =
        typeof current === "string"
          ? { url: current, posX: 50, posY: 50, zoom: 100 }
          : { ...current };

      obj.zoom = num;

      carr[index] = obj;
      return { ...prev, carrusel: carr };
    });
  };

  const removeCarruselImg = (index) => {
    setConfigTemp((prev) => {
      const carr = Array.isArray(prev.carrusel) ? [...prev.carrusel] : [];
      carr.splice(index, 1);
      return { ...prev, carrusel: carr };
    });
  };

  // ====== NUEVO: UI de selección de destacados (consulta a BD) ======
  const [rawProducts, setRawProducts] = useState([]);
  const [loadingProds, setLoadingProds] = useState(false);
  const [errProds, setErrProds] = useState("");

  // Filtros locales
  const [q, setQ] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [sort, setSort] = useState("alpha_asc");

  // Cargar catálogo para seleccionar
  useEffect(() => {
    const cargar = async () => {
      setLoadingProds(true);
      setErrProds("");
      try {
        const res = await fetch(`/api/productos?skip=0&take=500`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(
            data.error || "No se pudo cargar el listado de productos"
          );
        }
        const data = await res.json();
        const list = Array.isArray(data.items) ? data.items : data;
        setRawProducts(Array.isArray(list) ? list : []);
      } catch (e) {
        setErrProds(e.message);
      } finally {
        setLoadingProds(false);
      }
    };
    if (typeof window !== "undefined") cargar();
  }, []);

  // Categorías disponibles
  const categoriasOpciones = useMemo(() => {
    const set = new Set(rawProducts.map((p) => p.categoria).filter(Boolean));
    return ["Todas", ...Array.from(set)];
  }, [rawProducts]);

  // Debounce para búsqueda
  const [qDebounced, setQDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setQDebounced(q.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [q]);

  // Helpers de presentación
  const img0 = (p) =>
    (Array.isArray(p.imagenes) && p.imagenes[0]) || "/images/default-product.png";
  const precioCLP = (v) =>
    typeof v === "number"
      ? Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
        }).format(v)
      : v;

  // Filtro + orden para el grid de selección
  const selectable = useMemo(() => {
    let list = [...rawProducts];
    if (qDebounced) {
      list = list.filter((p) => {
        const t = (p.titulo || "").toString().toLowerCase();
        const sku = (p.sku || "").toString().toLowerCase();
        return t.includes(qDebounced) || sku.includes(qDebounced);
      });
    }
    if (categoria && categoria !== "Todas") {
      list = list.filter((p) => (p.categoria || "") === categoria);
    }
    list.sort((a, b) => {
      const ta = (a.titulo || "").toString().toLowerCase();
      const tb = (b.titulo || "").toString().toLowerCase();
      const pa =
        typeof a.precio === "number" ? a.precio : Number(a.precio || 0);
      const pb =
        typeof b.precio === "number" ? b.precio : Number(b.precio || 0);
      switch (sort) {
        case "alpha_desc":
          return tb.localeCompare(ta, "es");
        case "price_asc":
          return pa - pb;
        case "price_desc":
          return pb - pa;
        case "alpha_asc":
        default:
          return ta.localeCompare(tb, "es");
      }
    });
    return list;
  }, [rawProducts, qDebounced, categoria, sort]);

  // Selección (IDs)
  const selectedIds = configTemp.featuredSelectedIds || [];
  const isSelected = (id) => selectedIds.includes(id);
  const toggleSelect = (id) => {
    setConfigTemp((prev) => {
      const cur = prev.featuredSelectedIds || [];
      return isSelected(id)
        ? { ...prev, featuredSelectedIds: cur.filter((x) => x !== id) }
        : { ...prev, featuredSelectedIds: [...cur, id] };
    });
  };
  const removeSelected = (id) =>
    setConfigTemp((prev) => ({
      ...prev,
      featuredSelectedIds: (prev.featuredSelectedIds || []).filter(
        (x) => x !== id
      ),
    }));

  // --- RENDERIZADO COMPLETO CON LAYOUT DE ADMIN ---
  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      
      {/* 1. SIDEBAR (PANEL LATERAL) - Idéntico a admin.js pero con rutas activas ajustadas */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-800">
             <h1 className="text-2xl font-bold tracking-wider text-center text-blue-400">ADMIN PANEL</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {/* Enlace a Admin principal */}
          <Link href="/admin" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            📦 Productos
          </Link>
          {/* Botón Activo Actual */}
          <button className="w-full text-left py-3 px-4 rounded bg-blue-600 text-white shadow-lg transition duration-200 flex items-center gap-3">
            ⚙️ Configuración
          </button>
          
          <Link href="/configfooter" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            ⚙️ ConfigFooter
          </Link>
          
          
          <Link href="/sucursalConfig" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            🏪 Sucursales
          </Link>
          
          <Link href="/usuarios" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            👥 Usuarios
          </Link>
          
          <Link href="/pedidos" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            🛒 Pedidos
          </Link>

          <Link href="/mapausuarios" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            🗺️ Mapa Usuarios
          </Link>
          
        </nav>

        <div className="p-4 border-t border-gray-800">
            <Link href="/" className="block py-2 px-4 bg-gray-800 text-center rounded text-gray-300 hover:bg-gray-700 hover:text-white transition text-sm">
             ← Volver a la Tienda
            </Link>
        </div>
      </aside>

      {/* 2. CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER (BARRA SUPERIOR) */}
        <header className="flex items-center justify-between bg-white border-b px-8 py-4 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">
            Gestión de Sucursales
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
                <p className="text-sm font-bold text-gray-800">{admin.nombre}</p>
                
            </div>
            <img
              src={admin.avatar}
              alt="Avatar Admin"
              className="w-12 h-12 rounded-full border-2 border-blue-100 object-cover p-0.5 shadow-sm"
            />
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl mb-6 font-bold">
            Configuración General de la Página
          </h2>

          <div className="flex flex-col gap-6 max-w-5xl">
            {/* Nombre */}
            <div>
              <label className="block font-medium mb-1">Nombre de la página</label>
              <input
                type="text"
                name="nombrePagina"
                value={configTemp.nombrePagina}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Colores Header/Footer/Fondo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-1">Color Header</label>
                <input
                  type="color"
                  name="colorHeader"
                  value={configTemp.colorHeader}
                  onChange={handleInputChange}
                  className="w-20 h-10 border rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Color Footer</label>
                <input
                  type="color"
                  name="colorFooter"
                  value={configTemp.colorFooter}
                  onChange={handleInputChange}
                  className="w-20 h-10 border rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Color de Fondo (página)
                </label>
                <input
                  type="color"
                  name="colorFondo"
                  value={configTemp.colorFondo}
                  onChange={handleInputChange}
                  className="w-20 h-10 border rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Imagen de fondo */}
            <div>
              <label className="block font-medium mb-1">Imagen de Fondo</label>
              <label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
                Seleccionar Imagen
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFondoUpload}
                  className="hidden"
                />
              </label>
              {configTemp.fondoImagen && (
                <img
                  src={configTemp.fondoImagen}
                  alt="Fondo"
                  className="w-40 h-40 object-cover mt-2 border rounded"
                />
              )}
            </div>

            {/* Colores extra */}
            <div>
              <h3 className="font-semibold mb-2">Colores generales</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">
                    Primario (CTA/botones)
                  </label>
                  <input
                    type="color"
                    name="colorPrimario"
                    value={configTemp.colorPrimario}
                    onChange={handleInputChange}
                    className="w-20 h-10 border rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Secundario (títulos/textos)
                  </label>
                  <input
                    type="color"
                    name="colorSecundario"
                    value={configTemp.colorSecundario}
                    onChange={handleInputChange}
                    className="w-20 h-10 border rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Fondo sección “Destacados”
                  </label>
                  <input
                    type="color"
                    name="colorFondoDestacados"
                    value={configTemp.colorFondoDestacados}
                    onChange={handleInputChange}
                    className="w-20 h-10 border rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Texto botón (modo solid)
                  </label>
                  <input
                    type="color"
                    name="colorTextoBtnSolid"
                    value={configTemp.colorTextoBtnSolid}
                    onChange={handleInputChange}
                    className="w-20 h-10 border rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Logo */}
            <div>
              <label className="block font-medium mb-2">Logo de la página</label>
              <label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
                Seleccionar Imagen
                <input
                  type="file"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
              {configTemp.logo && (
                <img
                  src={configTemp.logo}
                  alt="Logo"
                  className="w-32 h-32 object-contain mt-2"
                />
              )}
            </div>

            {/* Carrusel */}
            <div>
              <h3 className="font-semibold mb-2">Imágenes del Carrusel</h3>

              <div className="flex items-center gap-4 mb-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="carruselAuto"
                    checked={!!configTemp.carruselAuto}
                    onChange={handleInputChange}
                  />
                  Autoplay
                </label>
                <label className="text-sm">
                  Delay (seg):
                  <input
                    type="number"
                    name="carruselDelaySec"
                    min={1}
                    step={1}
                    value={configTemp.carruselDelaySec}
                    onChange={handleInputChange}
                    className="ml-2 w-20 p-1 border rounded"
                  />
                </label>
              </div>

              <label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
                Agregar imagen
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCarruselImageUpload}
                  className="hidden"
                />
              </label>

              {/* Vista previa + sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                {carruselArray.map((item, idx) => {
                  const src =
                    typeof item === "string"
                      ? item
                      : item && typeof item === "object"
                      ? item.url
                      : "";
                  const posX =
                    item && typeof item === "object" && typeof item.posX === "number"
                      ? item.posX
                      : 50;
                  const posY =
                    item && typeof item === "object" && typeof item.posY === "number"
                      ? item.posY
                      : 50;
                  const zoom =
                    item && typeof item === "object" && typeof item.zoom === "number"
                      ? item.zoom
                      : 100;

                  return (
                    <div
                      key={idx}
                      className="relative group bg-white rounded border p-2 flex flex-col gap-2"
                    >
                      <div className="w-full h-32 rounded border overflow-hidden bg-black/5">
                        <img
                          src={src}
                          alt={`Carrusel ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-200"
                          style={{
                            objectPosition: `${posX}% ${posY}%`,
                            transform: `scale(${zoom / 100})`,
                          }}
                        />
                      </div>

                      <button
                        onClick={() => removeCarruselImg(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                      >
                        ✕
                      </button>

                      <div className="text-xs text-gray-600 mt-1">
                        <div className="mb-1 font-semibold">Posición horizontal</div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={posX}
                          onChange={(e) =>
                            updateCarruselPos(idx, "x", e.target.value)
                          }
                          className="w-full"
                        />
                        <div className="text-[10px] text-gray-500">X: {posX}%</div>

                        <div className="mt-2 mb-1 font-semibold">Posición vertical</div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={posY}
                          onChange={(e) =>
                            updateCarruselPos(idx, "y", e.target.value)
                          }
                          className="w-full"
                        />
                        <div className="text-[10px] text-gray-500">Y: {posY}%</div>

                        <div className="mt-2 mb-1 font-semibold">Zoom</div>
                        <input
                          type="range"
                          min={50}
                          max={200}
                          value={zoom}
                          onChange={(e) =>
                            updateCarruselZoom(idx, e.target.value)
                          }
                          className="w-full"
                        />
                        <div className="text-[10px] text-gray-500">
                          Zoom: {zoom}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HERO Destacados (textos) */}
            <div>
              <h3 className="font-semibold mb-2">
                Sección “Productos Destacados”
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Título</label>
                  <input
                    type="text"
                    name="heroTitulo"
                    value={configTemp.heroTitulo}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Subtítulo</label>
                  <input
                    type="text"
                    name="heroSubtitulo"
                    value={configTemp.heroSubtitulo}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            {/* Botones: estilo/forma */}
            <div>
              <h3 className="font-semibold mb-2">Botones de categorías</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1">Estilo</label>
                  <select
                    name="btnEstilo"
                    value={configTemp.btnEstilo}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="solid">Solid</option>
                    <option value="outline">Outline</option>
                    <option value="ghost">Ghost</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Forma</label>
                  <select
                    name="btnBorde"
                    value={configTemp.btnBorde}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="square">Square</option>
                    <option value="rounded">Rounded</option>
                    <option value="pill">Pill</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Texto (modo solid)</label>
                  <input
                    type="color"
                    name="colorTextoBtnSolid"
                    value={configTemp.colorTextoBtnSolid}
                    onChange={handleInputChange}
                    className="w-20 h-10 border rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Categorías (labels) */}
            <div>
              <h3 className="font-semibold mb-2">
                Categorías (texto de botones)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {configTemp.categorias.map((cat, i) => (
                  <input
                    key={i}
                    type="text"
                    value={cat}
                    onChange={(e) => {
                      const val = e.target.value;
                      setConfigTemp((prev) => {
                        const arr = [...prev.categorias];
                        arr[i] = val;
                        return { ...prev, categorias: arr };
                      });
                    }}
                    className="p-2 border rounded"
                  />
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() =>
                    setConfigTemp((prev) => ({
                      ...prev,
                      categorias: [...prev.categorias, "Nueva categoría"],
                    }))
                  }
                >
                  + Agregar
                </button>
                <button
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() =>
                    setConfigTemp((prev) => ({
                      ...prev,
                      categorias: prev.categorias.slice(0, -1),
                    }))
                  }
                  disabled={configTemp.categorias.length === 0}
                >
                  − Quitar última
                </button>
              </div>
            </div>

            {/* Selector de Productos Destacados */}
            <div>
              <h3 className="font-semibold mb-2">
                Seleccionar Productos Destacados (desde la BD)
              </h3>

              {/* Filtros */}
              <div className="flex flex-col lg:flex-row lg:items-end gap-3 bg-white p-4 rounded-lg border mb-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">
                    Buscar por nombre o SKU
                  </label>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Ej: RTX 3060, I7, SSD..."
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div className="min-w-[220px]">
                  <label className="block text-sm text-gray-600 mb-1">
                    Categoría
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full px-3 py-2 border rounded bg-white"
                  >
                    {categoriasOpciones.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="min-w-[220px]">
                  <label className="block text-sm text-gray-600 mb-1">
                    Ordenar por
                  </label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full px-3 py-2 border rounded bg-white"
                  >
                    <option value="alpha_asc">Alfabético (A → Z)</option>
                    <option value="alpha_desc">Alfabético (Z → A)</option>
                    <option value="price_asc">Precio (menor → mayor)</option>
                    <option value="price_desc">Precio (mayor → menor)</option>
                  </select>
                </div>
              </div>

              {/* Estado carga / error */}
              {loadingProds && (
                <p className="text-gray-600 mb-3">Cargando productos…</p>
              )}
              {errProds && (
                <div className="mb-3 p-3 rounded bg-red-50 border border-red-200 text-red-700">
                  {errProds}
                </div>
              )}

              {/* Grid seleccionable */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectable.map((p) => (
                  <article
                    key={p.id}
                    className={`relative bg-white rounded-xl border ${
                      isSelected(p.id)
                        ? "border-blue-400 ring-2 ring-blue-200"
                        : "border-gray-200"
                    } shadow-sm transition p-3 flex flex-col`}
                  >
                    {/* Checkbox esquina */}
                    <button
                      type="button"
                      onClick={() => toggleSelect(p.id)}
                      className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${
                        isSelected(p.id)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      } hover:opacity-90`}
                      title={
                        isSelected(p.id)
                          ? "Quitar de destacados"
                          : "Agregar a destacados"
                      }
                    >
                      {isSelected(p.id) ? "Seleccionado" : "Seleccionar"}
                    </button>

                    {/* Imagen */}
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
                      <img
                        src={img0(p)}
                        alt={p.titulo}
                        className="w-full h-40 object-contain bg-white"
                      />
                    </div>

                    {/* Meta */}
                    <div className="mt-2 text-[11px] tracking-wide text-purple-600 font-semibold uppercase">
                      {p.marca
                        ? ` / ${p.marca}`
                        : p.categoria
                        ? ` / ${p.categoria}`
                        : ""}
                    </div>

                    {/* Título */}
                    <h4
                      className="mt-1 text-[15px] font-semibold uppercase text-gray-800 leading-tight line-clamp-2"
                      title={p.titulo}
                    >
                      {p.titulo}
                    </h4>

                    {/* Precio */}
                    <div className="mt-1 text-[#0ea5e9] font-bold">
                      {precioCLP(Number(p.precio))}
                    </div>
                  </article>
                ))}
              </div>

              {/* Seleccionados (chips) */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2">
                  Seleccionados: {selectedIds.length}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIds.length === 0 && (
                    <span className="text-sm text-gray-500">
                      No hay productos marcados como destacados.
                    </span>
                  )}
                  {selectedIds.map((id) => (
                    <span
                      key={id}
                      className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700"
                    >
                      {id}
                      <button
                        onClick={() => removeSelected(id)}
                        className="text-blue-600 hover:text-blue-800 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow mt-6">
  <h2 className="text-xl font-bold mb-3">Crear cupón de descuento</h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    <input
      type="text"
      placeholder="Código del cupón"
      value={nuevoCupon.codigo}
      onChange={(e) => setNuevoCupon({ ...nuevoCupon, codigo: e.target.value })}
      className="border p-2 rounded"
    />

    <input
      type="number"
      placeholder="Descuento %"
      value={nuevoCupon.descuento}
      onChange={(e) => setNuevoCupon({ ...nuevoCupon, descuento: e.target.value })}
      className="border p-2 rounded"
    />

    <input
      type="date"
      value={nuevoCupon.expiracion}
      onChange={(e) => setNuevoCupon({ ...nuevoCupon, expiracion: e.target.value })}
      className="border p-2 rounded"
    />
  </div>

  <button
    onClick={crearCupon}
    className="mt-3 bg-purple-600 text-white px-3 py-2 rounded"
  >
    Crear cupón
  </button>

  <hr className="my-4" />

  <h3 className="font-semibold mb-2">Cupones creados</h3>
  <ul>
    {cupones.map(c => (
      <li key={c.codigo} className="flex justify-between py-1">
        <span>
          <strong>{c.codigo}</strong> — {c.descuento}% (expira {c.expiracion})
        </span>

        <button
          className="text-red-500"
          onClick={() => eliminarCupon(c.codigo)}
        >
          Eliminar
        </button>
      </li>
    ))}
  </ul>
</div>

            {/* Acciones */}
            <div className="flex gap-3">
              <button
                onClick={aplicarCambios}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Aplicar Cambios
              </button>
              <button
                onClick={resetConfig}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Restablecer Valores
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}