import { useEffect, useMemo, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Link from "next/link";

// -------------------------------------------
// CONFIGURACIÓN DE RESPALDO (FALLBACK)
// -------------------------------------------
const DEFAULT_CONFIG_FALLBACK = {
  HAS_STORE_PICKUP: true,
  STORE_LOCATIONS: [
    { id: "sucursal-sm", name: "Sucursal San Miguel - Weplay" },
    { id: "sucursal-pc", name: "Sucursal Providencia - Gaming Store" },
  ],
  SHIPPING_OPTIONS: {
    STORE_PICKUP: { name: "Retiro en Tiendas", cost: 0 },
    HOME_DELIVERY: { name: "Despacho a domicilio", cost: 3500 },
  },
};

// -------------------------------------------
// COMPONENTE PRINCIPAL CARRITO
// -------------------------------------------
export default function Carrito() {
  // ----------- Configuración Dinámica -----------
  const [storeConfig, setStoreConfig] = useState(DEFAULT_CONFIG_FALLBACK);

  // ----------- config navbar/footer -----------
  const [logo, setLogo] = useState('/images/blitz.png');
  const [nombrePagina, setNombrePagina] = useState('Mi E-commerce');
  const [colorHeader, setColorHeader] = useState('#ffffff');
  const [colorFooter, setColorFooter] = useState('#ffffff');

  // ----------- login (opcional en navbar) -----------
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  // Agregamos logout del contexto para el navbar
  const { user, setUser, logout } = useContext(UserContext);

  // --- ESTADO DE DIRECCIÓN Y CHECKOUT ---
  const [isEditingNewAddress, setIsEditingNewAddress] = useState(false);
  const [checkoutPhase, setCheckoutPhase] = useState(1); // 1: Envío, 2: Detalle y pago, 3: Comprobante
  
  const [shippingMethod, setShippingMethod] = useState("home-delivery");
  const [selectedStore, setSelectedStore] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("webpay");
  
  // --- ESTADOS PARA REGIONES/COMUNAS ---
  const [regiones, setRegiones] = useState([]);
  const [selectedRegionId, setSelectedRegionId] = useState("");

  // --- DEBUGGING: RASTREAR ROL DEL USUARIO ---
  useEffect(() => {
    if (user) {
      console.log("📢 DEBUG USUARIO:", user);
      console.log("🔑 ROL DETECTADO:", user.rol);
      
      if (!user.rol) {
        console.warn("⚠️ El usuario existe pero NO tiene propiedad 'rol'. Revisa tu API.");
      } else if (user.rol.trim().toLowerCase() !== 'admin') {
        console.warn(`⚠️ El rol es '${user.rol}', por eso no se muestra el menú Admin.`);
      } else {
        console.log("✅ El rol es admin, el menú debería aparecer.");
      }
    }
  }, [user]);

  // DEFINICIÓN DE LA DIRECCIÓN POR DEFECTO BASADA EN LA API
  const defaultAddress = useMemo(() => {
    if (user && user.direccion) {
      return {
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        rut: user.rut,
        telefono: user.telefono,
        direccion: `${user.direccion.calle} ${user.direccion.numero}`,
        comuna: user.direccion.comuna,
        region: user.direccion.region,
        pais: "Chile",
        vat: user.vat || "",
      };
    }
    return {};
  }, [user]);

  // Obtiene la lista de comunas de la región actualmente seleccionada
  const currentComunas = useMemo(() => {
    const region = regiones.find(r => r.id === selectedRegionId);
    return region ? region.comunas : [];
  }, [selectedRegionId, regiones]);

  //----------- config fondo-----------
  const [fondo, setFondo] = useState({
    colorFondo: "#ffffff",
    fondoImagen: "",
  });

  // ----------- carrito -----------
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const IVA = 0.19;
  const [shippingAddress, setShippingAddress] = useState(defaultAddress);

  // helpers
  const precioCLP = (v) => Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", }).format(Number(v || 0));
  const calcCartCount = (arr) => arr.reduce((sum, it) => sum + Number(it.qty || 0), 0);

  const loadCart = () => {
    try {
      const c = JSON.parse(localStorage.getItem("cart") || "[]");
      setItems(c);
      setCartCount(calcCartCount(c));
    } catch {
      setItems([]);
      setCartCount(0);
    }
  };

  // -------------------------------------------
  // NAVBAR HELPERS
  // -------------------------------------------
  const promociones = useMemo(
    () => [
      { texto: "Despacho a Todo Chile" },
      { texto: "Marcas Populares" },
    ],
    []
  );

  // -------------------------------------------
  // EFECTO: CARGAR CONFIGURACIÓN DE TIENDA
  // -------------------------------------------
  useEffect(() => {
    const savedConfig = localStorage.getItem("store_settings");
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setStoreConfig(parsed);

        // Si el usuario tenía seleccionado retiro, pero la tienda lo desactivó, cambiamos a envío.
        if (!parsed.HAS_STORE_PICKUP && shippingMethod === 'store-pickup') {
          setShippingMethod('home-delivery');
        }
      } catch (e) {
        console.error("Error cargando configuración de tienda", e);
      }
    }
  }, [shippingMethod]);


  // Sincronizar dirección por defecto
  useEffect(() => {
    if (!isEditingNewAddress) {
      setShippingAddress(prev => ({ ...prev, ...defaultAddress }));
      if (defaultAddress.region && regiones.length > 0) {
        const regionObj = regiones.find(r => r.nombre === defaultAddress.region);
        if (regionObj) {
          setSelectedRegionId(regionObj.id);
        }
      }
    }
  }, [defaultAddress, isEditingNewAddress, regiones]);

  // --- EFECTO PARA CARGAR REGIONES Y COMUNAS ---
  useEffect(() => {
    const fetchRegiones = async () => {
      try {
        const response = await fetch("/api/regionesComunas");
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Error de servidor desconocido" }));
            console.error("Error al cargar regiones:", errorData);
            return;
        }
        const data = await response.json();
        setRegiones(data);
        if (shippingAddress.region) {
          const regionObj = data.find(r => r.nombre === shippingAddress.region);
          if (regionObj) {
            setSelectedRegionId(regionObj.id);
          }
        }
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchRegiones();
  }, []);

  // -------------------------------------------
  //    CUPONES
  // -------------------------------------------
  const [cuponIngresado, setCuponIngresado] = useState("");
  const [errorCupon, setErrorCupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const aplicarCupon = async () => {
    if (!cuponIngresado) return;

    try {
      const res = await fetch(`/api/cupones/${cuponIngresado}`);
      const data = await res.json();

      if (!res.ok) {
        setErrorCupon(data.error || "Cupón no válido");
        setAppliedCoupon(null);
        return;
      }

      setErrorCupon("");
      setAppliedCoupon(data); 

    } catch (err) {
      console.error(err);
      setErrorCupon("Error al aplicar cupón");
    }
  };

  // -------------------------------------------
  // TOTALES INIT
  // -------------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem("config");
    if (saved) {
      const cfg = JSON.parse(saved);
      setLogo(cfg.logo || "/images/blitz.png");
      setNombrePagina(cfg.nombrePagina || "Mi E-commerce");
      setColorHeader(cfg.colorHeader || "#ffffff");
      setColorFooter(cfg.colorFooter || "#ffffff");
      setFondo({ colorFondo: cfg.colorFondo || "#ffffff", fondoImagen: cfg.fondoImagen || "", });
    }
    loadCart();
    const onStorage = (e) => { if (e.key === "cart") loadCart(); };
    const onCartUpdated = () => loadCart();
    window.addEventListener("storage", onStorage);
    window.addEventListener("cart-updated", onCartUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart-updated", onCartUpdated);
    };
  }, []);

  const { subtotal, impuestos, total, descuento, costoEnvio } = useMemo(() => {
    const subtotal = items.reduce(
      (sum, it) => sum + Number(it.precio || 0) * Number(it.qty || 0), 0
    );
    
    let costoEnvio = 0;
    if (shippingMethod === "home-delivery") {
      costoEnvio = storeConfig.SHIPPING_OPTIONS.HOME_DELIVERY.cost;
    } else if (shippingMethod === "store-pickup") {
      costoEnvio = storeConfig.SHIPPING_OPTIONS.STORE_PICKUP.cost;
    }

    let descuento = 0;
    if (appliedCoupon) {
      descuento = Math.round(subtotal * (Number(appliedCoupon.descuento) / 100));
    }
    const subtotalConEnvio = subtotal + costoEnvio;
    const impuestos = Math.round(subtotalConEnvio * IVA);
    const total = subtotalConEnvio + impuestos - descuento;
    return { subtotal, impuestos, total, descuento, costoEnvio };
  }, [items, appliedCoupon, shippingMethod, storeConfig]);

  const persist = (next) => {
    localStorage.setItem("cart", JSON.stringify(next));
    setItems(next);
    setCartCount(calcCartCount(next));
    window.dispatchEvent(new Event("cart-updated"));
  };
  const clampQty = (n, max = 999) => Math.max(1, Math.min(Number(n) || 1, max));

  // -------------------------------------------
  // ELIMINAR ITEM (NUEVA FUNCIÓN)
  // -------------------------------------------
  const removeItem = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    persist(nextItems);
  };

  // -------------------------------------------
  // WEBPAY & MERCADOPAGO
  // -------------------------------------------
  const handlePay = async () => {
    console.log("Iniciando pago con Webpay...");
    if (total <= 0) { alert("El total a pagar debe ser mayor a cero."); return; }
    const returnUrl = `${window.location.origin}/api/webpay/commit`;
    const paymentData = { amount: total, sessionId: user?.id ? `user-${user.id}` : "guest-session", returnUrl: returnUrl, };
    try {
      const response = await fetch("/api/webpay/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(paymentData), });
      const data = await response.json();
      if (!response.ok) { console.error("Error Webpay:", data.error); alert(`Error al iniciar el pago: ${data.error || "Intenta nuevamente."}`); return; }
      const { token, url } = data;
      if (url && token) {
        const form = document.createElement('form');
        form.method = 'POST'; form.action = url;
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden'; hiddenField.name = 'token_ws'; hiddenField.value = token;
        form.appendChild(hiddenField); document.body.appendChild(form); form.submit();
      } else { throw new Error("Respuesta incompleta."); }
    } catch (error) { console.error("Error en handlePay:", error); alert("Ocurrió un error inesperado al intentar pagar."); }
  };

  const handlePayMP = async () => {
    console.log("Iniciando pago con Mercado Pago...");
    const mpItemsFinal = [{ title: "Total de Compra de E-commerce", quantity: 1, unit_price: total, currency_id: "CLP", }];
    try {
      const response = await fetch("/api/mercadopago/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: mpItemsFinal }), });
      const data = await response.json();
      if (!response.ok || !data.init_point) { console.error("Error MP:", data.error); alert(`Error al iniciar pago MP: ${data.error}`); return; }
      window.location.href = data.init_point;
    } catch (error) { console.error("Error en handlePayMP:", error); alert("Ocurrió un error inesperado al intentar pagar con Mercado Pago."); }
  };

  // -------------------------------------------
  // LOGIN LOGIC (Actualizado para usar API Real)
  // -------------------------------------------
  const handleLoginChange = (e) => setLoginData((p) => ({ ...p, [e.target.name]: e.target.value }));
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      // USAMOS LA API REAL QUE ACABAS DE CREAR/MODIFICAR
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        // Guardamos el usuario con el rol incluido
        setUser(data); 
        setLoginOpen(false);
      } else {
        setLoginError(data.error || "Credenciales incorrectas");
      }
    } catch (er) {
      console.error(er);
      setLoginError("Ocurrió un error en el servidor.");
    }
  };

  // -------------------------------------------
  // VALIDACIÓN Y AVANCE DE FASES
  // -------------------------------------------
  const handleNextPhase = () => {
    if (checkoutPhase === 1) {
      if (shippingMethod === 'home-delivery') {
        const requiredFields = ['direccion', 'comuna', 'region', 'pais', 'rut', 'nombre', 'apellido', 'telefono', 'email'];
        const isAddressValid = requiredFields.every(field => shippingAddress[field] && String(shippingAddress[field]).trim() !== '');
        if (!isAddressValid) { alert("Por favor, completa todos los campos obligatorios de la dirección de envío (*)."); return; }
      } else if (shippingMethod === 'store-pickup') {
        if (!selectedStore) { alert("Por favor, selecciona una sucursal de retiro."); return; }
      }
      setCheckoutPhase(2);
    } else if (checkoutPhase === 2) {
      if (!paymentMethod) { alert("Por favor, selecciona un método de pago."); return; }
      if (paymentMethod === 'webpay') handlePay();
      else if (paymentMethod === 'mercado-pago') handlePayMP();
      else setCheckoutPhase(3);
    }
  };

  const handleShippingAddressChange = (e) => {
    const { name, value } = e.target;
    if (name === 'region') {
      setSelectedRegionId(value);
      setShippingAddress(p => ({ ...p, comuna: "" }));
      const regionObj = regiones.find(r => r.id === value);
      setShippingAddress(p => ({ ...p, region: regionObj ? regionObj.nombre : "" }));
    } else if (name === 'comuna') {
      setShippingAddress(p => ({ ...p, comuna: value }));
    } else {
      setShippingAddress(p => ({ ...p, [name]: value }));
    }
  };

  // -------------------------------------------
  // RENDERIZADO DE COMPONENTES DE ESTRUCTURA
  // -------------------------------------------
  
  const CheckoutProgress = ({ phase }) => (
    <div className="flex justify-center mb-6 text-sm font-semibold">
      {[1, 2, 3].map((step) => (
        <div key={step} className={`flex items-center ${step <= phase ? "text-purple-700" : "text-gray-400"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mr-2 transition-all duration-300 ${step === phase ? "bg-purple-700 text-white border-purple-700" : step < phase ? "bg-purple-100 text-purple-700 border-purple-700" : "bg-white border-gray-400" }`}>
            {step < phase ? "✓" : step}
          </div>
          <span className="min-w-max">{step === 1 ? "Envío" : step === 2 ? "Detalle y pago" : "Comprobante"}</span>
          {step < 3 && (<div className={`flex-1 mx-2 h-0.5 transition-all duration-300 ${step < phase ? "bg-purple-700" : "bg-gray-300"}`}></div>)}
        </div>
      ))}
    </div>
  );

  // Fase 1: Envío
  const ShippingPhase = () => {
    const hasPreloadedAddress = user && user.direccion;
    const handleAddNewAddress = () => { setIsEditingNewAddress(true); setShippingAddress({}); };
    const handleUsePreloadedAddress = () => { setIsEditingNewAddress(false); setShippingAddress(defaultAddress); };

    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">1. Información de Envío</h2>
        
        {/* 1. SECCIÓN DE DIRECCIONES */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">1. Dirección de Despacho</h3>
          {hasPreloadedAddress && (
            <div className={`address-card relative p-4 border rounded-lg mb-4 cursor-pointer transition ${!isEditingNewAddress ? 'border-purple-600 bg-purple-50 shadow-md' : 'border-gray-300 hover:shadow-sm'}`} onClick={handleUsePreloadedAddress}>
              <h4 className="font-semibold text-gray-900"> Dirección Guardada {!isEditingNewAddress && (<span className="absolute top-2 right-2 text-purple-600 font-bold">✓ SELECCIONADA</span>)} </h4>
              <p className="text-sm text-gray-700 mt-2"> **Recibe:** {user.nombre} {user.apellido} <br /> **Dirección:** {user.direccion.calle} {user.direccion.numero}, {user.direccion.comuna} <br /> **Región:** {user.direccion.region} </p>
            </div>
          )}
          <button className={`mt-2 px-4 py-2 border rounded-lg font-semibold text-sm transition w-full md:w-auto ${isEditingNewAddress ? 'bg-purple-100 text-purple-700 border-purple-700' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'}`} onClick={handleAddNewAddress}> + NUEVA DIRECCIÓN </button>
        </div>

        {/* 2. FORMULARIO DE DIRECCIÓN */}
        {(isEditingNewAddress || !hasPreloadedAddress) && shippingMethod === "home-delivery" && (
          <>
            <hr className="my-6" />
            <h3 className="text-lg font-semibold mb-4"> 2. Datos del Contacto y Despacho </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700">Email *</label><input type="email" name="email" value={shippingAddress.email || ""} onChange={handleShippingAddressChange} placeholder="Dirección de email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required /></div>
              <div><label className="block text-sm font-medium text-gray-700">RUT *</label><input type="text" name="rut" value={shippingAddress.rut || ""} onChange={handleShippingAddressChange} placeholder="RUT" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required /></div>
              <div><label className="block text-sm font-medium text-gray-700">Nombre *</label><input type="text" name="nombre" value={shippingAddress.nombre || ""} onChange={handleShippingAddressChange} placeholder="Nombre" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required /></div>
              <div><label className="block text-sm font-medium text-gray-700">Apellido *</label><input type="text" name="apellido" value={shippingAddress.apellido || ""} onChange={handleShippingAddressChange} placeholder="Apellido" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Dirección (calle y número) *</label><input type="text" name="direccion" value={shippingAddress.direccion || ""} onChange={handleShippingAddressChange} placeholder="Ej: Avenida Principal 123" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required /></div>
              <div><label className="block text-sm font-medium text-gray-700">País *</label><select name="pais" value={shippingAddress.pais || "Chile"} onChange={handleShippingAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"><option value="Chile">Chile</option></select></div>
              
              {/* SELECT DE REGIONES */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Región *</label>
                <select name="region" value={selectedRegionId} onChange={handleShippingAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                  <option value="">Selecciona una Región</option>
                  {regiones.map((region) => (<option key={region.id} value={region.id}> {region.nombre} </option>))}
                </select>
              </div>
              
              {/* SELECT DE COMUNAS */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Comuna *</label>
                <select name="comuna" value={shippingAddress.comuna || ""} onChange={handleShippingAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required disabled={!selectedRegionId}>
                  <option value="">Selecciona una Comuna</option>
                  {currentComunas.map((comuna) => (<option key={comuna.id} value={comuna.nombre}> {comuna.nombre} </option>))}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700">Teléfono *</label><input type="tel" name="telefono" value={shippingAddress.telefono || ""} onChange={handleShippingAddressChange} placeholder="Número de teléfono" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required /></div>
            </div>
          </>
        )}

        {/* 3. MÉTODOS DE ENVÍO DINÁMICOS */}
        <h3 className="text-lg font-semibold mb-2 mt-8">3. Métodos de Envío</h3>
        <div className="mb-6 space-y-2">
          
          {/* OPCIÓN: RETIRO EN TIENDA (Solo si HAS_STORE_PICKUP es true) */}
          {storeConfig.HAS_STORE_PICKUP && (
            <label className="flex items-center justify-between cursor-pointer py-2 border-b border-gray-200">
              <div className="flex items-center">
                <input type="radio" name="shipping-method" value="store-pickup" checked={shippingMethod === "store-pickup"} onChange={(e) => setShippingMethod(e.target.value)} className="form-radio h-4 w-4 text-purple-600 mr-3" />
                <span className="text-sm font-medium text-gray-700">{storeConfig.SHIPPING_OPTIONS.STORE_PICKUP.name}</span>
              </div>
              <span className="font-semibold text-sm">{precioCLP(storeConfig.SHIPPING_OPTIONS.STORE_PICKUP.cost)}</span>
            </label>
          )}

          {/* OPCIÓN: DESPACHO DOMICILIO */}
          <label className="flex items-center justify-between cursor-pointer py-2 border-b border-gray-200">
            <div className="flex items-center">
              <input type="radio" name="shipping-method" value="home-delivery" checked={shippingMethod === "home-delivery"} onChange={(e) => setShippingMethod(e.target.value)} className="form-radio h-4 w-4 text-purple-600 mr-3" />
              <span className="ml-3 text-sm font-medium text-gray-700">{storeConfig.SHIPPING_OPTIONS.HOME_DELIVERY.name}</span>
            </div>
            <span className="font-semibold text-sm">{precioCLP(storeConfig.SHIPPING_OPTIONS.HOME_DELIVERY.cost)}</span>
          </label>
        </div>

        {/* SELECT DE SUCURSAL DINÁMICO */}
        {shippingMethod === "store-pickup" && (
          <>
            <h3 className="text-lg font-semibold mb-2">Selecciona Sucursal de Retiro *</h3>
            <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
              <option value="">Por favor, seleccione una opción</option>
              {storeConfig.STORE_LOCATIONS.map((store) => (
                <option key={store.id} value={store.id}>{store.name}</option>
              ))}
            </select>
          </>
        )}

        <div className="mt-8 text-right">
          <button onClick={handleNextPhase} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Continuar a Detalle y Pago </button>
        </div>
      </div>
    );
  };

  // Fase 2: Pago
  const PaymentPhase = () => {
    const isStorePickup = shippingMethod === "store-pickup";
    const selectedStoreName = isStorePickup
        ? storeConfig.STORE_LOCATIONS.find(s => s.id === selectedStore)?.name || "Sucursal no encontrada"
        : storeConfig.SHIPPING_OPTIONS.HOME_DELIVERY.name;

    const summaryAddress = isStorePickup ? (
      <> <span className="font-semibold">Retiro en:</span> {selectedStoreName} </>
    ) : (
      <> <span className="font-semibold">Despacho a:</span> {shippingAddress.direccion}, {shippingAddress.comuna}, {shippingAddress.region} <br /> <span className="font-semibold">Cliente:</span> {shippingAddress.nombre} {shippingAddress.apellido} | Teléfono: {shippingAddress.telefono} </>
    );

    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">2. Detalle y Pago</h2>
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Detalles de Envío</h3>
          <p className="text-sm text-gray-700">{summaryAddress}</p>
          <button onClick={() => setCheckoutPhase(1)} className="mt-2 text-xs text-purple-600 hover:underline">Editar Envío</button>
        </div>

        

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Método de Pago</h3>
          <div className="flex flex-col space-y-2">
            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${paymentMethod === "webpay" ? 'border-purple-600 bg-purple-50' : 'hover:bg-gray-50'}`}>
              <input type="radio" name="payment-method" value="webpay" checked={paymentMethod === "webpay"} onChange={(e) => setPaymentMethod(e.target.value)} className="form-radio h-4 w-4 text-purple-600 transition duration-150 ease-in-out" />
              <span className="ml-3 text-sm font-medium text-gray-700">WebPay - Transbank 💳</span>
            </label>
            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${paymentMethod === "mercado-pago" ? 'border-purple-600 bg-purple-50' : 'hover:bg-gray-50'}`}>
              <input type="radio" name="payment-method" value="mercado-pago" checked={paymentMethod === "mercado-pago"} onChange={(e) => setPaymentMethod(e.target.value)} className="form-radio h-4 w-4 text-purple-600 transition duration-150 ease-in-out" />
              <span className="ml-3 text-sm font-medium text-gray-700">Mercado Pago 🛒</span>
            </label>
          </div>
        </div>

        <div className="mt-8 text-right">
          {/* Corrección: Eliminada la dependencia de documentType en el disabled */}
          <button onClick={handleNextPhase} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={!paymentMethod || (isStorePickup && !selectedStore)}> Pagar {precioCLP(total)} </button>
        </div>
      </div>
    );
  };
 

  const ReceiptPhase = () => (
    <div className="bg-white p-6 rounded-lg shadow text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-600"> ¡Pago Exitoso! 🎉 </h2>
      <p className="mb-4"> Tu orden ha sido procesada correctamente. En breve recibirás un email con el comprobante y los detalles de tu compra. </p>
      <Link href="/" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Volver a la Tienda </Link>
    </div>
  );

  // -------------------------------------------
  // RENDER PRINCIPAL
  // -------------------------------------------
  return (
    <main className="min-h-screen">

      {/* TOP BAR */}
      <div className="bg-[var(--color-secondary)] text-white text-center py-2 text-sm">
        {promociones.map((p, i) => (
          <span key={i} className="mx-4">{p.texto}</span>
        ))}
      </div>

      {/* NAVBAR (IGUAL A TU AMIGO, CON LOGIN TUYO) */}
      <nav
        className="shadow sticky top-0 z-50"
        style={{ backgroundColor: colorHeader }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          {/* LOGO */}
          <Link href="/" className="logo text-2xl font-bold">
            <img src={logo} alt="logo" className="h-20 w-auto" />
          </Link>

          {/* LINKS */}
          <div className="flex items-center space-x-6">
            <span className="text-2xl font-semibold">{nombrePagina}</span>

            <Link href="/" className="text-gray-700 hover:text-[var(--color-primary)]">
              Inicio
            </Link>

            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-primary)]">
              Catálogo
            </Link>

            <Link href="/carrito" className="text-gray-700 hover:text-[var(--color-primary)]">
              <img src="/images/carrito.png" className="h-11" />
            </Link>

            {/* SOLO ADMIN VE EL BOTÓN */}
{user?.rol === "admin" && (
  <Link
    href="/admin"
    className="text-gray-700 hover:text-[var(--color-primary)] font-semibold"
  >
    Admin
  </Link>
)}


            {user ? (
  <div className="flex items-center space-x-4">


<Link href="/mi_cuenta" className="text-gray-700 hover:text-[var(--color-primary)]">
  Hola, {user.nombre}
</Link>

    {/* Ver mi cuenta */}
    <Link href="/mi_cuenta" className="flex items-center">
      <img
        src={user.fotoperfil || "/images/default-user.jpg"}
        alt="perfil"
        className="h-10 w-10 rounded-full object-cover border border-gray-300 cursor-pointer hover:opacity-90"
      />
    </Link>


  </div>
) : (

              <button
                onClick={() => setLoginOpen(true)}
                className="text-gray-700 hover:text-[var(--color-accent)] flex items-center"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M5.121 17.804A9.001 9.001 0 0112 15a9.001 9.001 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* LOGIN MODAL — TU LOGIN */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-24 z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-4 text-center">
              Iniciar Sesión
            </h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

            {loginError && (
              <p className="text-red-500 text-sm mt-2 text-center">{loginError}</p>
            )}
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL - CHECKOUT */}
      <main className="max-w-7xl mx-auto p-6">
        {items.length === 0 && checkoutPhase < 3 ? (
           <div className="bg-white rounded-lg shadow p-6 text-gray-500">
             <h1 className="text-2xl font-bold mb-6">Carrito de compras</h1>
             Tu carrito está vacío. <Link className="text-purple-700 hover:underline ml-2" href="/catalogo"> Ir al catálogo </Link>
           </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">Proceso de Pago</h1>
            <CheckoutProgress phase={checkoutPhase} />
           
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* ASIDE LATERAL: ITEMS + TOTALES */}
              <aside className="bg-white rounded-lg shadow p-5 h-max order-1 lg:col-span-1">
                <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
                
                {/* 1. ITEMS (ACTUALIZADO CON BOTÓN DE ELIMINAR) */}
                <div className="space-y-3 text-sm mb-6">
                  <div className="mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 group">
                        <div className="flex items-center">
                          {/* Botón de eliminar (Trash Icon) */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-600 mr-2 transition-colors focus:outline-none"
                            title="Eliminar producto"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          
                          <span className="text-gray-900 text-xs">
                            {item.titulo} <strong>(x{item.qty})</strong>
                          </span>
                        </div>
                        
                        <span className="font-medium text-xs">
                          {precioCLP(Number(item.precio || 0) * Number(item.qty || 0))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="mb-6"/>

                {/* 2. TOTALES */}
                <h2 className="text-xl font-bold mb-4">Total del pedido</h2>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">{precioCLP(subtotal)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Impuestos:</span>
                        <span className="font-medium">{precioCLP(impuestos)}</span>
                    </div>

                    {appliedCoupon && (
                        <div className="flex justify-between text-green-600">
                        <span>Descuento ({appliedCoupon.codigo}):</span>
                        <span>-{precioCLP(descuento)}</span>
                        </div>
                    )}

                    <hr />

                    <div className="flex justify-between text-base font-bold">
                        <span>Total:</span>
                        <span>{precioCLP(total)}</span>
                    </div>
                </div>

                {/* 3. CUPÓN */}
                <div className="mt-4">
                    <p className="text-sm font-semibold mb-1 text-gray-700">
                        Tengo un código promocional
                    </p>

                    {!appliedCoupon ? (
                        <>
                        <input
                            type="text"
                            value={cuponIngresado}
                            onChange={(e) => setCuponIngresado(e.target.value)}
                            placeholder="Ingresa tu cupón"
                            className="border w-full p-2 rounded mb-2"
                        />

                        <button
                            onClick={aplicarCupon}
                            className="bg-gray-800 hover:bg-black text-white text-sm px-3 py-2 rounded w-full"
                        >
                            Aplicar cupón
                        </button>

                        {errorCupon && (
                            <p className="text-red-500 text-xs mt-1">
                            {errorCupon}
                            </p>
                        )}
                        </>
                    ) : (
                        <div className="p-3 bg-green-100 border border-green-300 rounded">
                            <p className="font-semibold text-green-900 text-sm">
                                Cupón aplicado: {appliedCoupon.codigo}
                            </p>

                            <button
                                onClick={() => setAppliedCoupon(null)}
                                className="text-red-600 text-xs mt-1 underline"
                            >
                                Quitar cupón
                            </button>
                        </div>
                    )}
                </div>
              </aside>

              {/* CONTENIDO DE FASES */}
              <section className="order-2 lg:col-span-2">
                {checkoutPhase === 1 && <ShippingPhase />}
                {checkoutPhase === 2 && <PaymentPhase />}
                {checkoutPhase === 3 && <ReceiptPhase />}
              </section>
            </div>
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: colorFooter }} className="text-black mt-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-purple-600 pl-3">Ayuda</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/ayuda" className="hover:text-purple-600">Centro de ayuda</Link></li>
              <li><Link href="/seguimiento" className="hover:text-purple-600">Seguimiento de mi compra</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-purple-600 pl-3">Nosotros</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/quienes_somos" className="hover:text-purple-600">Quiénes somos</Link></li>
              <li><Link href="/terminos" className="hover:text-purple-600">Términos y condiciones</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-purple-600 pl-3">Comunidad</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="https://www.instagram.com/blitz.hardware" target="_blank" className="hover:text-purple-600 flex items-center">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="bg-gray-50 text-center text-xs py-4 text-gray-500">
          © 2025 – Proyecto Capstone — Cristopher García & equipo
        </div>
      </footer>
    </main>
    
  );
}