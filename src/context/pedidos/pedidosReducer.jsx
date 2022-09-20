import {ELIMINAR_PEDIDO, ELIMINAR_PRODUCTO_PEDIDO, MODIFICAR_CANTIDAD, OBTENER_PEDIDOS, OBTENER_PRODUCTO} from "../../types"





export default (state, action) => {
  switch(action.type) {
    case OBTENER_PEDIDOS:
      return {
        ...state,
        pedidos: action.payload
      }
    case OBTENER_PRODUCTO:
      return {
        ...state,
        productos: [...state.productos, action.payload]
      }
    case MODIFICAR_CANTIDAD:
      return {
        ...state,
        cantidad: state.productos.map(producto => producto._id === action.payload.id
          ? (action.payload.valor <= 0 ? producto.cantidad = 0 : producto.cantidad = action.payload.valor) 
          : producto.cantidad
        )
      }
    case ELIMINAR_PRODUCTO_PEDIDO:
      return {
        ...state,
        productos: state.productos.filter(producto => producto._id !== action.payload)
      }
    case ELIMINAR_PEDIDO:
      return {
        ...state,
        mensaje: action.payload.mensaje,
        pedidos: state.pedidos.filter(pedido => pedido._id !== action.payload.id)
      }

    default:
      return state
  }
}
