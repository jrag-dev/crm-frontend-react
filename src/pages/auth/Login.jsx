import React, {useContext, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auth/authContext";

import '../../scss/pages/auth.scss';



const initialState = {
  email: '',
  password: ''
}

const Login = () => {

  let navigate = useNavigate()

  const { mensaje, autenticado, iniciarSesion, usuarioAutenticado } = useContext(AuthContext)
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

    if (dataUser.email.trim() === '' || dataUser.password.trim() === '') {
      mostrarAlerta('Todos los campos son obligatorios!', 'alerta-error')
      return;
    }

    iniciarSesion(dataUser)
    
    setDataUser(initialState)
  }

  return (
    <div className='auth'>
      <h2>Iniciar Sesión</h2>
      <div className='auth-form'>
        { alerta ? <p className={`alerta ${alerta.categoria}`}>{alerta.mensaje}</p> : null }
        <form
          onSubmit={handleSubmit}
        >
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
          <input type='submit' value='Iniciar-Sesión' className='btn-submit'/>
        </form>
      </div>
    </div>
  )
}

export default Login
