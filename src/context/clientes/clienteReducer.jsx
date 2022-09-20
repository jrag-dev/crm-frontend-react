
import {
  OBTENER_CLIENTES,
  CARGAR_CLIENTE,
  EDITAR_CLIENTE,
  ELIMINAR_CLIENTE
} from '../../types'


export default (state, action) => {
  switch(action.type) {
    case OBTENER_CLIENTES:
      return {
        ...state,
        clientes: action.payload
      }
    case CARGAR_CLIENTE:
      return {
        ...state,
        clienteActual: action.payload
      }
    case EDITAR_CLIENTE:
      return {
        ...state,
      }
    case ELIMINAR_CLIENTE:
      return {
        ...state,
        clientes: state.clientes.filter(cliente => cliente._id !== action.payload.id)
      }
    default:
      return state;
  }
}
