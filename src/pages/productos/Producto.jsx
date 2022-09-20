import React, {useContext} from "react"
import {Link} from "react-router-dom"
import Swal from "sweetalert2"

import ProductosContext from "../../context/productos/productosContext"



const Producto = ({ producto }) => {

  const { eliminarProducto } = useContext(ProductosContext)

  const deleteProducto = (id) => {

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

          eliminarProducto(id)
        }
      })
  }

  const { _id, nombre, precio, imagen } = producto; 

  console.log(`${import.meta.env.VITE_BACKEND_URL}/${imagen}`)
  

  return (


    <article className="card">
      <div className="card__picture">
        <img 
          className="card__img"
          src={`${import.meta.env.VITE_BACKEND_URL}/${imagen}`} 
          alt='imagen'
        />
      </div>
      <div className="card__texts">
        <h2 className="card__precio">Precio: $<span className="card__precio--active">{precio}</span></h2>
        <p className="card__envio free">Envío gratis</p>
        <p className="card__paragraph">
        {nombre}
        </p>
      </div>
        <div className='card__footer'>
        <Link to={`/productos/editar/${_id}`} className='btn-editar'>Editar</Link>
        <button
          onClick={() => deleteProducto(_id)}
        >Eliminar</button>
      </div>
    </article>


  )
}

export default Producto
