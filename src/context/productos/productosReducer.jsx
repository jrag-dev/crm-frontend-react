import {
  AGREGAR_PRODUCTOS, 
  CARGAR_PRODUCTO, 
  ELIMINAR_PRODUCTO, 
  OBTENER_PRODUCTOS
} from "../../types";



export default (state, action) => {

  switch(action.type) {
    case OBTENER_PRODUCTOS:
      return {
        ...state,
        productos: action.payload
      }
    case AGREGAR_PRODUCTOS:
      return {
        ...state,
        
      }
    case CARGAR_PRODUCTO:
      return {
        ...state,
        productoActual: action.payload
      }
    case ELIMINAR_PRODUCTO:
      return {
        ...state,
        productos: state.productos.filter(producto => producto._id !== action.payload.id) 
      }

    default:
      return state;
  
  }
}
