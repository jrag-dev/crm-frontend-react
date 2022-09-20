import React, { useContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { FcPortraitMode, FcShipped, FcSelfServiceKiosk } from "react-icons/fc";


// imports de los state
import ClienteState from '../context/clientes/clienteState';

import Login from '../pages/auth/Login'
import Registrarse from '../pages/auth/Registrarse'
import Clientes from '../pages/clientes/Clientes'
import Productos from '../pages/productos/Productos'

import '../scss/routes/App.scss';

import { classNames } from '../utils/clases';

import SideBarMenu from '../components/sidebar/SideBarMenu';
import NotFound404 from '../pages/404/NotFound404';
import Pedidos from '../pages/pedidos/Pedidos';
import Header from '../components/Header';
import NuevoCliente from '../pages/clientes/NuevoCliente';
import EditarCliente from '../pages/clientes/EditarCliente';
import AlertaState from '../context/alertas/alertaState';
import ProductosState from '../context/productos/productosState';
import EditarProducto from '../pages/productos/EditarProducto';
import NuevoProducto from '../pages/productos/NuevoProducto';
import PedidosState from '../context/pedidos/pedidosState';
import NuevoPedido from '../pages/pedidos/NuevoPedido';

import tokenAuth from '../config/tokenAuth';
import Inicio from '../pages/Inicio/Inicio';
import AuthContext from '../context/auth/authContext';
import RutaPrivada from '../components/RutaPrivada';
import Profile from '../pages/profile/Profile';




const App = () => {

  const { autenticado } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(true)
  
  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  
  
  const items = [
    {
      id: '1',
      label: 'Clientes',
      icon: FcPortraitMode,
      url: '/clientes'
    },
    {
      id: '2',
      label: 'Productos',
      icon: FcSelfServiceKiosk,
      url: '/productos'
    },
    {
      id: '3',
      label: 'Pedidos',
      icon: FcShipped,
      url: '/pedidos'
    },
  ]

  const card = {
    id: 'card01',
    displayName: 'Jose Alvarado',
    title: 'Frontend Developer',
    photoUrl: '../../img/goku.png',
    url: '/'
  }


  // Revisar si tenemos un token
  const token = localStorage.getItem('token')

  if (token) {
    tokenAuth(token)
  }

  return (
        <ClienteState>
          <ProductosState>
            <PedidosState>
              <AlertaState>
                <section className={`App ${autenticado ? 'inicio' : null}`}>
                  <header className={classNames('header', isOpen ? 'collapsed' : 'expanded')}>
                    <Header/>
                  </header>
                  <aside className={`sidebar ${autenticado ? 'inicio' : null}`}>
                  <SideBarMenu
                      isOpen={isOpen}
                      items={items}
                      card={card}
                      handleClick={handleClick}
                    />
                  </aside>
                  <main className={classNames('contenido', isOpen ? 'collapsed' : 'expanded')}>
                    <Routes>


                      {/* Auth */}
                      <Route path="/crear-cuenta" element={<Registrarse/>}/>
                      <Route path="/iniciar-sesion" element={<Login />}/>


                      <Route path='/' element={<RutaPrivada/>}>                        
                        {/* Inicio */}
                        <Route path="/" element={<Inicio/>}/>

                        {/* Profile */}
                        <Route path="/profile" element={<Profile/>}/>

                        {/* Clientes */}
                        <Route path="/clientes" element={<Clientes/>}/>
                        <Route path='/clientes/nuevo-cliente' element={<NuevoCliente/>}/>
                        <Route path='/clientes/editar/:id' element={<EditarCliente/>}/>

                        {/* Productos */}
                        <Route path="/productos" element={<Productos/>}/>
                        <Route path='/productos/nuevo-producto' element={<NuevoProducto/>}/>
                        <Route path='/productos/editar/:id' element={<EditarProducto/>}/>

                        {/* Pedidos */}
                        <Route path="/pedidos" element={<Pedidos/>}/>
                        <Route path="/pedidos/nuevo/:id" element={<NuevoPedido/>}/>
                      </Route>


                      <Route path="*" element={<NotFound404/>}/>
                    </Routes>
                  </main>
                </section>
              </AlertaState>
              </PedidosState>
            </ProductosState>
        </ClienteState>
  )
}

export default App
