import React, { useContext, useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaPlusCircle } from 'react-icons/fa';
import PedidosContext from '../../context/pedidos/pedidosContext';


const FormCantidadProducto = ({ producto }) => {

  const { modificarCantidadFn, eliminarProductoPedidoFn } = useContext(PedidosContext)

  const [count, setcount] = useState(0)

  const handleChange = e => {
    setcount(e.target.value)
  }

  useEffect(() => {
    modificarCantidadFn(producto._id, count)
  }, [count])

  const minus = e => {
    setcount(count - 1)
  }

  const plus = e => {
    setcount(count + 1)
  }

  if (count < 0) {
    setcount(0)
  }

  return (
    <li>
      <div className="texto-producto">
          <img src={`${import.meta.env.VITE_BACKEND_URL}/${producto.imagen}`} alt={producto.nombre} />
          <p className="nombre">{producto.nombre}</p>
          <p className="precio">${producto.precio}</p>
      </div>
      <div className="acciones">
          <div className="contenedor-cantidad">
            <button 
              type="button"
              className="minus"
              onClick={minus}
            >
              <FaMinus />
            </button>
              <input 
                type="text" 
                name="cantidad"
                onChange={handleChange}
                value={count}
              />
              <button
                type="button"
                className="plus"
                onClick={plus}
              >
                <FaPlus />
              </button>
          </div>
          { 
            producto.cantidad > 0 ? (
              <button 
                type="button" 
                className="btn-submit btn-delete"
                onClick={() => eliminarProductoPedidoFn(producto._id)}
              ><FaPlusCircle />Eliminar Producto</button>
            )
            : null
          }
      </div>
    </li>
  )
}

export default FormCantidadProducto

