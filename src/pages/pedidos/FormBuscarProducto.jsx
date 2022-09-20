import React, {useContext, useState} from "react"
import PedidosContext from "../../context/pedidos/pedidosContext"


import { FcSearch  } from "react-icons/fc";
//import { FiSearch  } from "react-icons/fi";


const FormBuscarProducto = (props) => {

  const { searchProducto } = useContext(PedidosContext)

  const [productoSearch, setProductoSearch] = useState('')

  const handleChange = e => {
    setProductoSearch(e.target.value) 
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (productoSearch === '') {
      return ;
    }

    searchProducto(productoSearch)

    setProductoSearch('')
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <legend>Busca un producto y agrega una cantidad</legend>

      <div className='campo'>
        <label>Productos:</label>
        <input
          type='text'
          placeholder='Nombre Productos'
          name='productos'
          onChange={handleChange}
          value={productoSearch}
        />
        <FcSearch className="icon-search"/>
      </div>
      <input
        class="btn-submit search"
        type='submit'
        value='Buscar Producto'
      />
    </form>
  )
}

export default FormBuscarProducto
