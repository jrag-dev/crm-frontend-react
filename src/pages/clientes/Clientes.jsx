import React, { useContext, useEffect } from "react"
import {Link} from "react-router-dom"

import ClienteContext from '../../context/clientes/clienteContext';

import Cliente from "./Cliente"

import '../../scss/pages/Clientes.scss'


const Clientes = () => {

  const clienteContext = useContext(ClienteContext)

  const { clientes, obtenerClientes } = clienteContext;

  useEffect(() => {
    obtenerClientes() 
  }, [])

  //if (clientes.length === 0) return <p>No hay clientes, comienza creando uno</p>

  return (
    <article className='clientes'>

      <div className='clientes-header'>
        <h2>Clientes</h2>
        <Link to='/clientes/nuevo-cliente' className='btn-nuevo'>Nuevo Cliente</Link>
      </div>
    
      {
        clientes?.map(item => (
          <Cliente
            key={item._id}
            cliente={item}
          />
        ))
      }
    </article>
  )
}

export default Clientes
