import React, {useContext, useState} from "react"
import {useNavigate} from "react-router-dom"
import Swal from "sweetalert2"

import AlertaContext from "../../context/alertas/alertaContext"
import ClienteContext from "../../context/clientes/clienteContext"




const initialState = {
  nombre: '',
  apellido: '',
  empresa: '',
  email: '',
  telefono: ''
}

const NuevoCliente = () => {

  let navigate = useNavigate()

  const [dataForm, setDataForm] = useState(initialState)

  const { nombre, apellido, empresa, email, telefono } = dataForm;

  const clienteContext = useContext(ClienteContext);
  const { alerta, mostrarAlerta } = useContext(AlertaContext)

  const { agregarCliente } = clienteContext;

  const handleChange = e => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = e => {
    e.preventDefault();

    if (
      nombre.trim() === '' || 
      apellido.trim() === '' ||
      empresa.trim() === ''||
      email.trim() === '' ||
      telefono.trim() === ''

    ) {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
      return;
    }
    agregarCliente(dataForm)

    setDataForm(initialState)

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cliente agreado correctamente!',
      showConfirmButton: false,
      timer: 1500
    })

    setTimeout(() => {
      navigate('/clientes')
    }, 1500)
  }


  return (
    <div className='nuevo-cliente'>
      <h2>Nuevo Cliente</h2>

      <form
        onSubmit={handleSubmit}
      >
        <legend>Completa todos los campos</legend>

        { alerta ? <p className={`alerta ${alerta.categoria}`}>{alerta.mensaje}</p> : null }
        <div className='campo'>
          <label htmlFor='nombre'>Nombre:</label>
          <input
            type='text'
            placeholder='Nombre Cliente'
            name='nombre'
            id='nombre'
            onChange={handleChange}
            value={nombre}
          />
        </div>
        <div className='campo'>
          <label htmlFor='apellido'>Apellido:</label>
          <input
            type='text'
            placeholder='Apellido Cliente'
            name='apellido'
            id='apellido'
            onChange={handleChange}
            value={apellido}
          />
        </div>
        <div className='campo'>
          <label htmlFor='empresa'>Empresa:</label>
          <input
            type='text'
            placeholder='Empresa Cliente'
            name='empresa'
            id='empresa'
            onChange={handleChange}
            value={empresa}
          />
        </div>
        <div className='campo'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            placeholder='Email Cliente'
            name='email'
            id='email'
            onChange={handleChange}
            value={email}
          />
        </div>
        <div className='campo'>
          <label htmlFor='telefono'>Teléfono:</label>
          <input
            type='text'
            placeholder='Teléfono Cliente'
            name='telefono'
            id='telefono'
            onChange={handleChange}
            value={telefono}
          />
        </div>
        <button type='submit'>Agregar</button>
      </form>
    </div>
  )
}

export default NuevoCliente
