import React, {useContext} from "react"
import PedidosContext from "../../context/pedidos/pedidosContext"
import PedidoItem from "./PedidoItem"




const Pedido = ({ item }) => {

  const { eliminarPedidoFn } = useContext(PedidosContext)

  const { _id, cliente, pedido, total } = item
  
  return (
    <div className='pedido-flex'>
      <div className='pedido-head'>
        <p className='name'>Cliente: <span>{cliente?.nombre} {cliente?.apellido}</span></p>
        <button 
          className='pedido-eliminar'
          onClick={() => eliminarPedidoFn(_id)}
        >Eliminar</button>
      </div>
      <div className='pedido-card'>
      <h3>Articulos pedidos</h3>
        {
          pedido.map(pedido => (
            <PedidoItem
              key={pedido._id}
              pedido={pedido}
            />
          ))
        }
      </div>
      <p className="total-pedido">Total: {total}$</p>
    </div>
  )
}

export default Pedido
