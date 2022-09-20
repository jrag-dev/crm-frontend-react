import React, {useContext, useEffect} from "react"
import {NavLink, useNavigate} from "react-router-dom"
import AuthContext from "../context/auth/authContext";

import { GrLogout  } from "react-icons/gr";

import '../scss/components/Header.scss';


const Header = () => {

  let navigate = useNavigate()

  // extraer la información del usuario autenticado
  const { autenticado, usuarioAutenticado, cerrarSesion } = useContext(AuthContext)

  useEffect(() => {
    usuarioAutenticado()
  }, [])


  const logout = () => {
    cerrarSesion()
    
    navigate('/iniciar-sesion')
  }

  return (
    <>
      <h1 className='logo'>YourCRM</h1>
      <nav className={`navbar ${!autenticado ? 'login' : null}`}>
          {
            autenticado 
              ? (
                <ul>
                  <li>
                    <button 
                      className='logout'
                      onClick={() => logout()}
                    ><GrLogout/></button>
                  </li>
                </ul>
              )
              : (
                <ul className='menu-auth'>
                  <li>
                    <NavLink 
                      to='/iniciar-sesion'
                      className={({ isActive }) => isActive ? "active" : undefined}
                    >Ingresa</NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to='/crear-cuenta'
                      className={({ isActive }) => isActive ? "active" : undefined}
                    >Registrarse</NavLink>
                  </li>
                </ul>
              )
          }
      </nav>
    </>
  )
}

export default Header
