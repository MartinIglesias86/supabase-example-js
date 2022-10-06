import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('¡Revise su correo electrónico para obtener el enlace de inicio de sesión!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget">
        <h1 className="header">Aprendiendo Supabase + Next.js</h1>
        <p className="description">
        Inicie sesión a través de un enlace mágico introduciendo su correo electrónico a continuación
        </p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Cargando...' : 'Enviar enlace mágico'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}