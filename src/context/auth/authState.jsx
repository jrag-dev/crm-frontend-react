import {useReducer} from "react"
import clienteAxios from "../../config/axios"
import AuthContext from "./authContext"
import authReducer from "./authReducer"


import {
  CERRAR_SESION,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  OBTENER_USUARIO,
  REGISTRO_ERROR, REGISTRO_EXITOSO
} from "../../types"
import tokenAuth from "../../config/tokenAuth"


const AuthState = ({ children }) =>  {

  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  }

  const [state, dispatch] = useReducer(authReducer, initialState)


  // Funciones que cambiaran el state de auth
  
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/usuarios/crear-cuenta', datos) 

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data
      })

      if (respuesta.data.token) {
        // obtener el usuario
        usuarioAutenticado()
      }
      
    } catch (error) {
      const alerta = {
        mensaje: error.response.data.mensaje,
        categoria: 'alerta-error'
      }
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      })
    }
  }

  // obtener el usuario que esta autenticado
  const usuarioAutenticado = async () => {

    const token = localStorage.getItem('token')

    if (token) {
      //TODO: Función para enviar el token por headers 
      tokenAuth(token)
    }

    try {
      const respuesta = await clienteAxios.get('/usuarios/auth')
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data
      })
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR
      })
    }
  }

  const iniciarSesion = async (credenciales) => {
    try {
      const respuesta = await clienteAxios.post('/usuarios/iniciar-sesion', credenciales) 
      // extraer el token
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      })

      // obtener el usuario
      usuarioAutenticado()

    } catch (error) {
      console.log(error)
      const alerta = {
        mensaje: error.response.data.mensaje,
        categoria: 'alerta-error'
      }

      dispatch({
        type: LOGIN_ERROR,
        payload: alerta
      })
    }
  }


  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  const datos = {
    token: state.token,
    autenticado: state.autenticado,
    mensaje: state.mensaje,
    usuario: state.usuario,
    cargando: state.cargando,
    registrarUsuario,
    iniciarSesion,
    usuarioAutenticado,
    cerrarSesion
  }

  return (
    <AuthContext.Provider value={datos}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthState
