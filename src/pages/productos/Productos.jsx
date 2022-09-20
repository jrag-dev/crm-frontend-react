import React, {useContext, useEffect} from 'react'
import ProductosContext from '../../context/productos/productosContext'
import Producto from './Producto'

import { FcPlus  } from "react-icons/fc";

import '../../scss/pages/Productos.scss';
import {Link} from 'react-router-dom';


const Productos = () => {

  const { productos, obtenerProductos } = useContext(ProductosContext)

  useEffect(() => {
    obtenerProductos()
  }, [])

  return (
    <div className='productos'>
      <div className='productos-header'>
        <h2>Productos</h2>
        <Link to='/productos/nuevo-producto' className='btn-nuevo'><FcPlus/>Nuevo</Link>
      </div>
      <div className='producto-contenedor'>
        {
          productos.map(producto => (
            <Producto
              key={producto._id}
              producto={producto}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Productos
