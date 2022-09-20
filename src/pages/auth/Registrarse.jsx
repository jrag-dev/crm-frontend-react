import React, {useContext, useEffect, useState} from "react"
import AuthContext from "../../context/auth/authContext"
import AlertaContext from "../../context/alertas/alertaContext"
import {useNavigate} from "react-router-dom"


const initialState = {
  nombre: '',
  email: '',
  password: '',
  passwordconfirm: ''
}


const Registrarse = () => {

  let navigate = useNavigate()

  const { mensaje, autenticado, usuarioAutenticado, registrarUsuario } = useContext(AuthContext)
  const { alerta, mostrarAlerta } = useContext(AlertaContext)

  const [dataUser, setDataUser] = useState(initialState)


  // En caso de que el usuario ya se haya autenticado o sea un registro duplicado
  useEffect(() => {

    if (autenticado) {
      usuarioAutenticado()
      navigate('/clientes')
    }

    if (mensaje) {
      mostrarAlerta(mensaje.mensaje, 'alerta-error')
    }
    
  }, [mensaje, autenticado])

  const handleChange = e => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = e => {
    e.preventDefault()

    if (dataUser.nombre.trim() === '' || dataUser.email.trim() === '' || dataUser.password.trim() === '') {
      mostrarAlerta('Todos los campos son obligatorios!', 'alerta-error')
      return;
    }

    if (dataUser.password.length < 6) { 
      mostrarAlerta('El password debe ser minimo de 6 caracteres!', 'alerta-error')
      return;
    }

    registrarUsuario({
      nombre: dataUser.nombre,
      email: dataUser.email,
      password: dataUser.password
    })
    
    setDataUser(initialState)
  }


  return (
    <div className='auth'>
      <h2>Crear Cuenta</h2>
      <div className='auth-form'>
        { alerta ? <p className={`alerta ${alerta.categoria}`}>{alerta.mensaje}</p> : null }
        <form
          onSubmit={handleSubmit}
        >
          <div className='campo'>
            <label htmlFor='nombre'>Nombre:</label>
            <input
              type='text'
              name='nombre'
              id='nombre'
              placeholder='Nombre Usuario'
              onChange={handleChange}
              value={dataUser.nombre}
            />
          </div>
          <div className='campo'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Email Usuario'
              onChange={handleChange}
              value={dataUser.email}
            />
          </div>
          <div className='campo'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password Usuario'
              onChange={handleChange}
              value={dataUser.password}
            />
          </div>
          <div className='campo'>
            <label htmlFor='passwordconfirm'>Confirmar Password:</label>
            <input
              type='password'
              name='passwordconfirm'
              id='passwordconfirm'
              placeholder='Confirma tu Password'
              onChange={handleChange}
              value={dataUser.passwordconfirm}
            />
          </div>
          <input type='submit' value='Crear Cuenta' className='btn-submit'/>
        </form>
      </div>
    </div>
  )
}

export default Registrarse
