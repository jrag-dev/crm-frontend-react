import React, {useContext, useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import ClienteContext from "../../context/clientes/clienteContext"
import PedidosContext from "../../context/pedidos/pedidosContext"
import FormBuscarProducto from "./FormBuscarProducto"
import { stringUpperCase, totalValorPedido } from '../../helpers';
import FormCantidadProducto from "./FormCantidadProducto"



const NuevoPedido = () => {

  const { id } = useParams()

  let navigate = useNavigate()

  useEffect(() => {
    cargarCliente(id)
  }, [id])

  const clienteContext = useContext(ClienteContext);
  const { clienteActual, cargarCliente } = clienteContext;
  const { productos, crearPedidoFn } = useContext(PedidosContext)


  if (!clienteActual) return null

  const total = totalValorPedido(productos)


  const handleSubmit = e => {
    e.preventDefault()

    // crear el objeto de pedidos
    let newpedido = {}

    newpedido.cliente = clienteActual._id
    newpedido.pedido = productos
    newpedido.total = total

    crearPedidoFn(newpedido)

    // redireccionar a pedidos
    navigate('/pedidos')
    
  }

  return (
    <div className='nuevo-pedido'>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>{`${stringUpperCase(clienteActual?.nombre)} ${stringUpperCase(clienteActual?.apellido)}`}</p>
        <p>{clienteActual?.email}</p>
      </div>
      
      <FormBuscarProducto/>

      <form 
        className="formulario-pedidos"
        onSubmit={handleSubmit}
      >
        <ul className="resumen">
          {
            productos.map((producto) => (
              <FormCantidadProducto
                key={producto._id} 
                producto={producto}
              />
            ))
          }
        </ul>
        <div className="campo">
            <label>Total: $ {total}</label>
        </div>

        <div className="enviar">
          <input type="submit" className="btn-submit" value="Agregar Pedido" />
        </div>
      </form>
    </div>
  )
}

export default NuevoPedido
