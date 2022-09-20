import React, {useContext, useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";

import ClienteContext from "../../context/clientes/clienteContext";



const initialState = {
  nombre: '',
  apellido: '',
  empresa: '',
  email: '',
  telefono: ''
}

const EditarCliente = () => {

  const { id } = useParams();

  let navigate = useNavigate()

  useEffect(() => {
    cargarCliente(id)
  }, [id])


  const clienteContext = useContext(ClienteContext);

  const { clienteActual, cargarCliente, editarCliente } = clienteContext;

  const [dataForm, setDataForm] = useState(initialState)

  const { nombre, apellido, empresa, email, telefono } = dataForm;

  useEffect(() => {
    if (clienteActual) {
      setDataForm(clienteActual)
    }
  }, [clienteActual])

  const handleChange = e => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    editarCliente(dataForm)

    setDataForm(initialState)

    Swal.fire({
      position: 'center',
      icon: 'success',
      color: '#716add',
      title: 'Cliente actualizado correctamente!',
      showConfirmButton: false,
      timer: 1500
    })

    setTimeout(() => {
      navigate('/clientes')
    }, 1500)
  }


  return (
    <div className='nuevo-cliente'>
      <h2>Editar Cliente</h2>

      <form
        onSubmit={handleSubmit}
      >
        <legend>Completa todos los campos</legend>

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
        <button type='submit'>Actualizar</button>
      </form>
    </div>
  )
}

export default EditarCliente
