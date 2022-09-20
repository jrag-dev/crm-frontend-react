import React from "react"


const PedidoItem = ({ pedido }) => {

  const { _id, cantidad, producto } = pedido

  return (
    <div className='pedido-item'>
      <p>{producto.nombre}</p>
      <p>Precio: {producto.precio}$</p>
      <p className="cantidad">Cantidad: {cantidad}</p>
    </div>
  )
}

export default PedidoItem
