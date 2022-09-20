import React, {useReducer} from "react"
import Swal from "sweetalert2"

import clienteAxios from "../../config/axios"

import ClienteContext from "./clienteContext"
import clienteReducer from './clienteReducer'

import {
  AGREGAR_CLIENTES,
  OBTENER_CLIENTES,
  CARGAR_CLIENTE,
  EDITAR_CLIENTE,
  ELIMINAR_CLIENTE
} from '../../types'


const ClienteState = props => {
  const initialState = {
    clientes: [],
    clienteActual: null
  }


  // dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(clienteReducer, initialState)


  // Serie de funciones para el CRUD
  
  const obtenerClientes = async () => {
    try {
      const respuesta = await clienteAxios.get('/clientes') ;

      dispatch({
        type: OBTENER_CLIENTES,
        payload: respuesta.data
      })
    } catch (error) {
      console.log(error)
    }
  }


  const agregarCliente = async (cliente) => {
    try {
      const respuesta = await clienteAxios.post('/clientes', cliente);

      dispatch({
        type: AGREGAR_CLIENTES,
        payload: respuesta.data.mensaje
      })
    } catch (error) {
      console.log(error)
    }
  }


  const cargarCliente = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`/clientes/${id}`)

      dispatch({
        type: CARGAR_CLIENTE,
        payload: respuesta.data
      })
    } catch (error) {
      /* handle error */
      console.log(error)
    }
  }


  const editarCliente = async (cliente) => {
    try {
      const respuesta = await clienteAxios.put(`/clientes/${cliente._id}`, cliente);

      dispatch({
        type: EDITAR_CLIENTE,
        payload: respuesta.data
      })
    } catch (error) {
      console.log(error)
    }
  }


  const eliminarCliente = async (id) =>{
    try {
      const respuesta = await clienteAxios.delete(`/clientes/${id}`) 

      dispatch({
        type: ELIMINAR_CLIENTE,
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
    clientes: state.clientes,
    clienteActual: state.clienteActual,
    obtenerClientes,
    agregarCliente,
    cargarCliente,
    editarCliente,
    eliminarCliente
  }

  return (
    <ClienteContext.Provider value={datos}>
      {props.children}
    </ClienteContext.Provider>
  )
}


export default ClienteState
