import { useState } from "react";

export default function EditarContactoForm({ user, close }) {
  const [nombre, setNombre] = useState(user.nombre || "");
  const [apellido, setApellido] = useState(user.apellido || "");
  const [email, setEmail] = useState(user.email || "");
  const [telefono, setTelefono] = useState(user.telefono || "");

  async function handleSave(e) {
    e.preventDefault();

    const resp = await fetch("/api/usuarios/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        nombre,
        apellido,
        email,
        telefono,
      }),
    });

    const data = await resp.json();

    if (resp.ok) {
      alert("Datos actualizados");
      close();
      window.location.reload(); // ← se refresca sin desaparecer los datos
    } else {
      alert("Error: " + data.error);
    }
  }

  return (
    <form onSubmit={handleSave} className="p-4">
      <h2>Editar contacto</h2>

      <label>Nombre</label>
      <input value={nombre} onChange={e => setNombre(e.target.value)} />

      <label>Apellido</label>
      <input value={apellido} onChange={e => setApellido(e.target.value)} />

      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} />

      <label>Teléfono</label>
      <input value={telefono} onChange={e => setTelefono(e.target.value)} />

      <button type="submit">Guardar</button>
    </form>
  );
}
