import {useReducer} from "react"
import clienteAxios from "../../config/axios"
import {AGREGAR_PRODUCTOS, CARGAR_PRODUCTO, ELIMINAR_PRODUCTO, OBTENER_PRODUCTOS} from "../../types"
import ProductosContext from "./productosContext"
import productosReducer from "./productosReducer"





const ProductosState = ({ children }) => {

  const initialState = {
    productos: [],
    productoActual: null
  }

  const [state, dispatch] = useReducer(productosReducer, initialState)

  // Funciones que cambiaran el state de productos

  const obtenerProductos = async () => {

    try {
      const respuesta = await clienteAxios.get('/productos') 

      dispatch({
        type: OBTENER_PRODUCTOS,
        payload: respuesta.data
      })
    } catch (error) {
      console.log(error)
    }
  }


  const agregarProducto = async (data) => {

    try {
      const respuesta = await clienteAxios.post('/productos', data, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })

      dispatch({
        type: AGREGAR_PRODUCTOS,
        payload: respuesta.data.mensaje
      })
      
    } catch (error) {
      /* handle error */
      console.log(error)
    }
  }


  const cargarProducto = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`/productos/${id}`) 

      dispatch({
        type: CARGAR_PRODUCTO,
        payload: respuesta.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  const actualizarProducto = async (producto, id) => {
    try {
      const respuesta = await clienteAxios.put(`/productos/${id}`, producto, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      }) 
      console.log(respuesta.data)
    } catch (error) {
      /* handle error */
      console.log(error)
    }
  }


  const eliminarProducto = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`/productos/${id}`) 

      dispatch({
        type: ELIMINAR_PRODUCTO,
        payload: {
          id: id,
          mensaje: respuesta.data.mensaje
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const datos = {
    productos: state.productos,
    productoActual: state.productoActual,
    obtenerProductos,
    agregarProducto,
    cargarProducto,
    actualizarProducto,
    eliminarProducto
  }


  return (
    <ProductosContext.Provider value={datos}>
      { children }
    </ProductosContext.Provider>
  )
}


export default ProductosState
