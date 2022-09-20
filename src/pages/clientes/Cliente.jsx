import React, {useContext} from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import ClienteContext from '../../context/clientes/clienteContext'

const Cliente = ({ cliente }) => {

  const { eliminarCliente } = useContext(ClienteContext)
  
  const { _id, nombre, apellido, empresa, email, telefono } = cliente


  const handleClick = (id) => {
    
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eliminado',
            'success'
          )

          eliminarCliente(id)
        }
      })
  }

  return (
    <div className="cliente">
      <div className="cliente-card">
          <h3>{`${nombre} ${apellido}`}</h3>
          <p>{empresa}</p>
          <p>{email}</p>
          <p><span>{telefono}</span></p>
        <div className="cliente-acciones">
          <Link to={`/clientes/editar/${_id}`} className="btn-editar">Editar</Link>
          <Link to={`/pedidos/nuevo/${_id}`} className="btn-editar btn--nuevo">Pedido</Link>
          <button 
            className="btn-delete"
            onClick={() => handleClick(cliente._id)}
          >Eliminar</button>
        </div>
      </div>
    </div>
  )
}

export default Cliente
