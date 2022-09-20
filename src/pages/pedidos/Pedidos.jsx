import React, {useContext, useEffect} from 'react'
import PedidosContext from '../../context/pedidos/pedidosContext'
import Pedido from './Pedido'

import '../../scss/pages/pedidos.scss';

const Pedidos = () => {

  const { pedidos, obtenerPedidos } = useContext(PedidosContext)

  useEffect(() => {
    obtenerPedidos()
  }, [])

  return (
    <div className='pedidos'>
      <h2>Pedidos</h2>
      {
        pedidos.map(item => (
          <Pedido
            key={item._id}
            item={item}
          />
        ))
      }
    </div>
  )
}

export default Pedidos
