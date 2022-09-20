import {useReducer} from "react"
import clienteAxios from "../../config/axios"
import PedidosContext from "./pedidosContext"
import pedidosReducer from "./pedidosReducer"


import {
  CREAR_PEDIDO,
  ELIMINAR_PEDIDO,
  ELIMINAR_PRODUCTO_PEDIDO,
  MODIFICAR_CANTIDAD,
  OBTENER_PEDIDOS,
  OBTENER_PRODUCTO
} from "../../types"



const PedidosState = ({ children }) => {

  const initialState = {
    pedidos: [],
    productos: [],
    cantidad: 0
  }


  const [state, dispatch] = useReducer(pedidosReducer, initialState)


  // Funciones que cambiaran el state

  const obtenerPedidos = async () => {
    try {
      const respuesta = await clienteAxios.get('/pedidos')

      dispatch({
        type: OBTENER_PEDIDOS,
        payload: respuesta.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  const searchProducto = async (query) => {
    try {
      const respuesta = await clienteAxios.post(`/productos/search/${query}`) 

      // Si no encuentra coincidencia en la base de datos para la busqueda
      if (respuesta.data[0]) {
        let productoEncontrado = respuesta.data[0]

        // agregar la llave productos
        productoEncontrado.producto = productoEncontrado._id
        productoEncontrado.cantidad = 0

        // agregar la cantidad inicial
        dispatch({
          type: OBTENER_PRODUCTO,
          payload: productoEncontrado
        })
      }
      console.log(respuesta.data)
    } catch (error) {
      console.log(error)
    }
  } 

  const modificarCantidadFn = (id, valor) => {
    dispatch({
      type: MODIFICAR_CANTIDAD,
      payload: {
        id: id,
        valor: valor
      }
    })
  }

  const eliminarProductoPedidoFn = id => {
    dispatch({
      type: ELIMINAR_PRODUCTO_PEDIDO,
      payload: id
    })
  }


  const crearPedidoFn = async (pedido) => {

    try {
      const respuesta = await clienteAxios.post('/pedidos', pedido) 
      dispatch({
        type: CREAR_PEDIDO,
        payload: respuesta.data.mensaje
      })
    } catch (error) {
      /* handle error */
      console.log(error)
    }
  } 
  

  const eliminarPedidoFn = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`/pedidos/${id}`) 

      dispatch({
        type: ELIMINAR_PEDIDO,
        payload: {
          mensaje: respuesta.data.mensaje,
          id
        }
      })
    } catch (error) {
      console.log(error)
    }
  }



  const datos = {
    pedidos: state.pedidos,
    productos: state.productos,
    cantidad: state.cantidad,
    obtenerPedidos,
    searchProducto,
    modificarCantidadFn,
    eliminarProductoPedidoFn,
    crearPedidoFn,
    eliminarPedidoFn
  }

  return (
    <PedidosContext.Provider value={datos}>
      { children }
    </PedidosContext.Provider>
  )
}

export default PedidosState
