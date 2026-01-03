'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

/* ========= TIPOS ========= */

type Usuario = {
  id: string
  nombre: string
  email: string
  activo: boolean
  usuario_roles?: {
    roles?: {
      nombre: string
    }
  }[]
}

/* ========= COMPONENTE ========= */

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  /* ===== CARGAR USUARIOS ===== */
  async function cargarUsuarios() {
    setLoading(true)

    const { data, error } = await supabase
      .from('usuarios')
      .select(`
        id,
        nombre,
        email,
        activo,
        usuario_roles (
          roles (
            nombre
          )
        )
      `)
      .returns<Usuario[]>()

    if (error) {
      setError(error.message)
    } else {
      setUsuarios(data ?? [])
    }

    setLoading(false)
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  /* ========= RENDER ========= */

  return (
    <div style={{ padding: 20 }}>
      <h1>Usuarios</h1>
      <p>Módulo de administración de usuarios</p>

      <button onClick={() => setShowModal(true)}>
        + Nuevo usuario
      </button>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table border={1} cellPadding={6} style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.usuario_roles?.[0]?.roles?.nombre || 'Sin rol'}</td>
                <td>{u.activo ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ========= MODAL ========= */}
      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <h2>Nuevo usuario</h2>

            <input placeholder="Nombre completo" />
            <br /><br />
            <input placeholder="Correo electrónico" />
            <br /><br />

            <select>
              <option>Selecciona un rol</option>
              <option>ADMINISTRADOR_DEL_SISTEMA</option>
              <option>GUARDIA_DE_SEGURIDAD</option>
            </select>

            <br /><br />

            <button>Guardar</button>
            <button onClick={() => setShowModal(false)} style={{ marginLeft: 10 }}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ========= ESTILOS ========= */

const overlay: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const modal: React.CSSProperties = {
  background: '#fff',
  padding: 20,
  borderRadius: 6,
  width: 320
}
