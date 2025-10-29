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

    // Carrusel
    carrusel: [
      "/images/blitzHardware banner.png",
      "/images/componentes.png",
      "/images/nvidia.png",
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

    // === NUEVO: selección de destacados por UI ===
    featuredSelectedIds: [],  // <- aquí guardamos los IDs seleccionados

    // Fondo general
    colorFondo: "#ffffff",
    fondoImagen: "",
  });

  // ====== LOAD CONFIG FROM LS ======
  useEffect(() => {
    if (typeof window === "undefined") return;
    const configLS = JSON.parse(localStorage.getItem("config") || "null");
    if (configLS) {
      // Migración: si antes existía featuredProductIds (string), lo transformamos en array (best effort)
      let migrated = { ...configLS };
      if (migrated.featuredProductIds && !migrated.featuredSelectedIds) {
        const arr = String(migrated.featuredProductIds)
          .split(",")
          .map(s => s.trim())
          .filter(Boolean);
        migrated.featuredSelectedIds = arr;
        delete migrated.featuredProductIds;
      }
      setConfigTemp(prev => ({ ...prev, ...migrated }));
    }
  }, []);

  // ====== INPUT HANDLERS ======
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let next = value;
    if (type === "checkbox") next = checked;
    if (type === "number") next = value === "" ? "" : Number(value);
    setConfigTemp(prev => ({ ...prev, [name]: next }));
  };

  // Logo
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setConfigTemp(prev => ({ ...prev, logo: reader.result }));
    reader.readAsDataURL(file);
  };

  // Fondo (imagen)
  const handleFondoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setConfigTemp(prev => ({ ...prev, fondoImagen: reader.result }));
    reader.readAsDataURL(file);
  };

  // ====== SAVE / RESET ======
  const aplicarCambios = () => {
    if (typeof window === "undefined") return;
    const toSave = { ...configTemp };
    // Limpieza: nos deshacemos del campo viejo si quedó
    delete toSave.featuredProductIds;
    localStorage.setItem("config", JSON.stringify(toSave));
    alert("Configuración guardada ✅");
  };

  const resetConfig = () => {
    if (typeof window === "undefined") return;
    if (confirm("¿Seguro que deseas restablecer la configuración a los valores por defecto?")) {
      localStorage.removeItem("config");
      window.location.reload();
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
    r.setProperty("--color-destacados-bg", String(configTemp.colorFondoDestacados));

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
          throw new Error(data.error || "No se pudo cargar el listado de productos");
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
    const set = new Set(rawProducts.map(p => p.categoria).filter(Boolean));
    return ["Todas", ...Array.from(set)];
  }, [rawProducts]);

  // Debounce para búsqueda
  const [qDebounced, setQDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setQDebounced(q.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [q]);

  // Helpers de presentación
  const img0 = (p) => (Array.isArray(p.imagenes) && p.imagenes[0]) || "/images/default-product.png";
  const precioCLP = (v) =>
    typeof v === "number"
      ? Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(v)
      : v;

  // Filtro + orden para el grid de selección
  const selectable = useMemo(() => {
    let list = [...rawProducts];
    if (qDebounced) {
      list = list.filter(p => {
        const t = (p.titulo || "").toString().toLowerCase();
        const sku = (p.sku || "").toString().toLowerCase();
        return t.includes(qDebounced) || sku.includes(qDebounced);
      });
    }
    if (categoria && categoria !== "Todas") {
      list = list.filter(p => (p.categoria || "") === categoria);
    }
    list.sort((a, b) => {
      const ta = (a.titulo || "").toString().toLowerCase();
      const tb = (b.titulo || "").toString().toLowerCase();
      const pa = typeof a.precio === "number" ? a.precio : Number(a.precio || 0);
      const pb = typeof b.precio === "number" ? b.precio : Number(b.precio || 0);
      switch (sort) {
        case "alpha_desc": return tb.localeCompare(ta, "es");
        case "price_asc":  return pa - pb;
        case "price_desc": return pb - pa;
        case "alpha_asc":
        default:           return ta.localeCompare(tb, "es");
      }
    });
    return list;
  }, [rawProducts, qDebounced, categoria, sort]);

  // Selección (IDs)
  const selectedIds = configTemp.featuredSelectedIds || [];
  const isSelected = (id) => selectedIds.includes(id);
  const toggleSelect = (id) => {
    setConfigTemp(prev => {
      const cur = prev.featuredSelectedIds || [];
      return isSelected(id)
        ? { ...prev, featuredSelectedIds: cur.filter(x => x !== id) }
        : { ...prev, featuredSelectedIds: [...cur, id] };
    });
  };
  const removeSelected = (id) =>
    setConfigTemp(prev => ({ ...prev, featuredSelectedIds: (prev.featuredSelectedIds || []).filter(x => x !== id) }));

  return (
    <div className="flex min-h-screen">
      {/* Panel lateral */}
      <div className="w-60 bg-gray-800 text-white flex flex-col p-4 gap-2">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Panel</h1>

        <Link href="/admin" className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">
          Productos
        </Link>
        <button className="py-2 border-b border-gray-700 w-full text-center bg-gray-700 cursor-default">
          Configuración
        </button>
        <Link href="/usuarios" className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">
          Usuarios
        </Link>
        <Link href="/pedidos" className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">
          Pedidos
        </Link>
        <Link href="/report" className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">
          Reportes
        </Link>
        <Link href="/" className="mt-auto py-2 px-4 bg-gray-600 rounded text-center hover:bg-gray-500">
          Volver al inicio
        </Link>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-gray-100 border-b p-4 shadow-sm">
          <h2 className="text-xl font-bold">Configuración</h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">{admin.nombre}</span>
            <img src={admin.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-300 object-cover" />
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl mb-6 font-bold">Configuración General de la Página</h2>

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
                <input type="color" name="colorHeader" value={configTemp.colorHeader} onChange={handleInputChange} className="w-20 h-10 border rounded cursor-pointer" />
              </div>
              <div>
                <label className="block font-medium mb-1">Color Footer</label>
                <input type="color" name="colorFooter" value={configTemp.colorFooter} onChange={handleInputChange} className="w-20 h-10 border rounded cursor-pointer" />
              </div>
              <div>
                <label className="block font-medium mb-1">Color de Fondo (página)</label>
                <input type="color" name="colorFondo" value={configTemp.colorFondo} onChange={handleInputChange} className="w-20 h-10 border rounded cursor-pointer" />
              </div>
            </div>

            {/* Imagen de fondo */}
            <div>
              <label className="block font-medium mb-1">Imagen de Fondo</label>
              <label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
                Seleccionar Imagen
                <input type="file" accept="image/*" onChange={handleFondoUpload} className="hidden" />
              </label>
              {configTemp.fondoImagen && (
                <img src={configTemp.fondoImagen} alt="Fondo" className="w-40 h-40 object-cover mt-2 border rounded" />
              )}
            </div>

            {/* Colores extra */}
            <div>
              <h3 className="font-semibold mb-2">Colores generales</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Primario (CTA/botones)</label>
                  <input type="color" name="colorPrimario" value={configTemp.colorPrimario} onChange={handleInputChange} className="w-20 h-10 border rounded cursor-pointer" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Secundario (títulos/textos)</label>
                  <input type="color" name="colorSecundario" value={configTemp.colorSecundario} onChange={handleInputChange} className="w-20 h-10 border rounded cursor-pointer" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Fondo sección “Destacados”</label>
                  <input type="color" name="colorFondoDestacados" value={configTemp.colorFondoDestacados} onChange={handleInputChange} className="w-20 h-10 border rounded cursor-pointer" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Texto botón (modo solid)</label>
                  <input type="color" name="colorTextoBtnSolid" value={configTemp.colorTextoBtnSolid} onChange={handleInputChange} className="w-20 h-10 border rounded cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Logo */}
            <div>
              <label className="block font-medium mb-2">Logo de la página</label>
              <label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
                Seleccionar Imagen
                <input type="file" onChange={handleLogoUpload} className="hidden" />
              </label>
              {configTemp.logo && <img src={configTemp.logo} alt="Logo" className="w-32 h-32 object-contain mt-2" />}
            </div>

            {/* Carrusel */}
            <div>
              <h3 className="font-semibold mb-2">Imágenes del Carrusel</h3>

              <div className="flex items-center gap-4 mb-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="carruselAuto" checked={!!configTemp.carruselAuto} onChange={handleInputChange} />
                  Autoplay
                </label>
                <label className="text-sm">
                  Delay (seg):
                  <input type="number" name="carruselDelaySec" min={1} step={1} value={configTemp.carruselDelaySec} onChange={handleInputChange} className="ml-2 w-20 p-1 border rounded" />
                </label>
              </div>

              <label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
                Agregar imagen
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      setConfigTemp((prev) => ({ ...prev, carrusel: [...prev.carrusel, reader.result] }));
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />
              </label>

              {/* Vista previa */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {configTemp.carrusel.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img src={img} alt={`Carrusel ${idx + 1}`} className="w-full h-32 object-cover rounded border" />
                    <button
                      onClick={() => setConfigTemp((prev) => ({ ...prev, carrusel: prev.carrusel.filter((_, i) => i !== idx) }))}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* HERO Destacados (textos) */}
            <div>
              <h3 className="font-semibold mb-2">Sección “Productos Destacados”</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Título</label>
                  <input type="text" name="heroTitulo" value={configTemp.heroTitulo} onChange={handleInputChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Subtítulo</label>
                  <input type="text" name="heroSubtitulo" value={configTemp.heroSubtitulo} onChange={handleInputChange} className="w-full p-2 border rounded" />
                </div>
              </div>
            </div>

            {/* Botones: estilo/forma */}
            <div>
              <h3 className="font-semibold mb-2">Botones de categorías</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1">Estilo</label>
                  <select name="btnEstilo" value={configTemp.btnEstilo} onChange={handleInputChange} className="w-full p-2 border rounded">
                    <option value="solid">Solid</option>
                    <option value="outline">Outline</option>
                    <option value="ghost">Ghost</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Forma</label>
                  <select name="btnBorde" value={configTemp.btnBorde} onChange={handleInputChange} className="w-full p-2 border rounded">
                    <option value="square">Square</option>
                    <option value="rounded">Rounded</option>
                    <option value="pill">Pill</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Texto (modo solid)</label>
                  <input type="color" name="colorTextoBtnSolid" value={configTemp.colorTextoBtnSolid} onChange={handleInputChange} className="w-20 h-10 border rounded cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Categorías (labels) */}
            <div>
              <h3 className="font-semibold mb-2">Categorías (texto de botones)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {configTemp.categorias.map((cat, i) => (
                  <input
                    key={i}
                    type="text"
                    value={cat}
                    onChange={(e) => {
                      const val = e.target.value;
                      setConfigTemp(prev => {
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
                <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setConfigTemp(prev => ({ ...prev, categorias: [...prev.categorias, "Nueva categoría"] }))}>
                  + Agregar
                </button>
                <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setConfigTemp(prev => ({ ...prev, categorias: prev.categorias.slice(0, -1) }))} disabled={configTemp.categorias.length === 0}>
                  − Quitar última
                </button>
              </div>
            </div>

            {/* =============== NUEVO: Selector de Productos Destacados =============== */}
            <div>
              <h3 className="font-semibold mb-2">Seleccionar Productos Destacados (desde la BD)</h3>

              {/* Filtros */}
              <div className="flex flex-col lg:flex-row lg:items-end gap-3 bg-white p-4 rounded-lg border mb-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Buscar por nombre o SKU</label>
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ej: RTX 3060, I7, SSD..." className="w-full px-3 py-2 border rounded" />
                </div>

                <div className="min-w-[220px]">
                  <label className="block text-sm text-gray-600 mb-1">Categoría</label>
                  <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full px-3 py-2 border rounded bg-white">
                    {categoriasOpciones.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="min-w-[220px]">
                  <label className="block text-sm text-gray-600 mb-1">Ordenar por</label>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full px-3 py-2 border rounded bg-white">
                    <option value="alpha_asc">Alfabético (A → Z)</option>
                    <option value="alpha_desc">Alfabético (Z → A)</option>
                    <option value="price_asc">Precio (menor → mayor)</option>
                    <option value="price_desc">Precio (mayor → menor)</option>
                  </select>
                </div>
              </div>

              {/* Estado carga / error */}
              {loadingProds && <p className="text-gray-600 mb-3">Cargando productos…</p>}
              {errProds && (
                <div className="mb-3 p-3 rounded bg-red-50 border border-red-200 text-red-700">
                  {errProds}
                </div>
              )}

              {/* Grid seleccionable */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectable.map((p) => (
                  <article key={p.id} className={`relative bg-white rounded-xl border ${isSelected(p.id) ? "border-blue-400 ring-2 ring-blue-200" : "border-gray-200"} shadow-sm transition p-3 flex flex-col`}>
                    {/* Checkbox esquina */}
                    <button
                      type="button"
                      onClick={() => toggleSelect(p.id)}
                      className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${isSelected(p.id) ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} hover:opacity-90`}
                      title={isSelected(p.id) ? "Quitar de destacados" : "Agregar a destacados"}
                    >
                      {isSelected(p.id) ? "Seleccionado" : "Seleccionar"}
                    </button>

                    {/* Imagen */}
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
                      <img src={img0(p)} alt={p.titulo} className="w-full h-40 object-contain bg-white" />
                    </div>

                    {/* Meta */}
                    <div className="mt-2 text-[11px] tracking-wide text-purple-600 font-semibold uppercase">
                      {p.marca ? ` / ${p.marca}` : p.categoria ? ` / ${p.categoria}` : ""}
                    </div>

                    {/* Título */}
                    <h4 className="mt-1 text-[15px] font-semibold uppercase text-gray-800 leading-tight line-clamp-2" title={p.titulo}>
                      {p.titulo}
                    </h4>

                    {/* Precio */}
                    <div className="mt-1 text-[#0ea5e9] font-bold">{precioCLP(Number(p.precio))}</div>
                  </article>
                ))}
              </div>

              {/* Seleccionados (chips) */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Seleccionados: {selectedIds.length}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIds.length === 0 && <span className="text-sm text-gray-500">No hay productos marcados como destacados.</span>}
                  {selectedIds.map((id) => (
                    <span key={id} className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
                      {id}
                      <button onClick={() => removeSelected(id)} className="text-blue-600 hover:text-blue-800 font-bold">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            

            {/* Acciones */}
            <div className="flex gap-3">
              <button onClick={aplicarCambios} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Aplicar Cambios
              </button>
              <button onClick={resetConfig} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Restablecer Valores
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}