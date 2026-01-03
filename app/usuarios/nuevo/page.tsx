export default function NuevoUsuarioPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Nuevo usuario</h1>
      <p className="text-zinc-600 mt-1">
        Alta de usuario del sistema
      </p>

      <form className="mt-6 space-y-4 max-w-md bg-white p-6 border rounded-lg">
        <div>
          <label className="block text-sm font-medium">
            Nombre
          </label>
          <input
            type="text"
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="Nombre completo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Correo
          </label>
          <input
            type="email"
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="correo@empresa.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Rol
          </label>
          <select className="mt-1 w-full border rounded px-3 py-2">
            <option value="">Selecciona un rol</option>
            <option value="admin">Administrador</option>
            <option value="usuario">Usuario</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Guardar usuario
        </button>
      </form>
    </main>
  );
}
