import React, {useContext, useState} from "react"
import {useNavigate} from "react-router-dom"
import Swal from "sweetalert2"
import AlertaContext from "../../context/alertas/alertaContext"
import ProductosContext from "../../context/productos/productosContext"

import '../../scss/components/Forms.scss'


const initialState = {
  nombre: '',
  precio: ''
}

const NuevoProducto = () => {

  let navigate = useNavigate()

  const { agregarProducto } = useContext(ProductosContext)
  const { alerta, mostrarAlerta } = useContext(AlertaContext)

  const [dataForm, setDataForm] = useState(initialState)
  const [archivo, setArchivo] = useState('')

  const handleChangeData = e => {
    setDataForm({
      ...dataForm,
      [e.target.name] : e.target.value
    })
  }

  const handleChangeFile = e => {
    setArchivo(e.target.files[0])
  }


const handleSubmit = e => {
  e.preventDefault()
  
  if (
    dataForm.nombre.trim() === '' || 
    dataForm.precio.trim() === '' ||
    !archivo

  ) {
    mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
    return;
  }

  // crear el formdata
  let formData = new FormData();
  formData.append('nombre', dataForm.nombre)
  formData.append('precio', dataForm.precio)
  formData.append('imagen', archivo)

  agregarProducto(formData)
  
  Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cliente agreado correctamente!',
      showConfirmButton: false,
      timer: 1500
    })

  setTimeout(() => {
    navigate('/productos')
  }, 1500)

}


  return (
    <div className='nuevo-producto'>
      <h2>Nuevo Producto</h2>

      <form
        onSubmit={handleSubmit}
      >
        <legend>Completa todos los campos</legend>

        { alerta ? <p className={`alerta ${alerta.categoria}`}>{alerta.mensaje}</p> : null }

        <div className='campo'>
          <label htmlFor='nombre'>Nombre:</label>
          <input
            type='text'
            placeholder='Nombre Producto'
            name='nombre'
            id='nombre'
            onChange={handleChangeData}
            value={dataForm.nombre}
          />
        </div>
        <div className='campo'>
          <label htmlFor='precio'>Apellido:</label>
          <input
            type='number'
            placeholder='Precio Producto'
            name='precio'
            id='precio'
            min='0.00'
            step='0.01'
            onChange={handleChangeData}
            value={dataForm.precio}
          />
        </div>
        <div className='campo'>
          <label htmlFor='imagen'>Imagen:</label>
          <input
            type='file'
            name='imagen'
            id='imagen'
            onChange={handleChangeFile}
          />
        </div>
        <button type='submit'>Agregar</button>
      </form>
    </div>
  )
}

export default NuevoProducto
