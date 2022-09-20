import {CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO} from "../../types"




export default (state, action) => {
  switch(action.type) {
    case LOGIN_EXITOSO:
    case REGISTRO_EXITOSO:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        token: localStorage.getItem('token'),
        autenticado: true,
        mensaje: null,
        cargando: false
      }
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      //localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        mensaje: action.payload,
        autenticado: null
      }
    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
        cargando: false
      }
    case CERRAR_SESION:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        autenticado: null,
        usuario: null,
        cargando: false
      }

    default:
      return state
  }
}
