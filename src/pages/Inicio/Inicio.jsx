import React, {useContext, useEffect} from "react"
import AuthContext from "../../context/auth/authContext"




const Inicio = () => {

  // extraer la información del usuario autenticado
  const { autenticado, usuarioAutenticado } = useContext(AuthContext)

  useEffect(() => {
    usuarioAutenticado()
  }, [])

  return (
    <article className='inicio'>
      {
        autenticado 
          ? (
            <h1>Dashboard</h1>
          )
          : (
            <>
              <h1>El CRM gratuito en español que puede usar todo el mundo</h1>
              <p>¿Crees que los sistemas de CRM solo sirven para gestionar contactos? 
                No es así. El CRM de HubSpot cuenta con herramientas para todo tu 
                equipo y es totalmente gratuito. Te contamos cómo este CRM hace 
                tu trabajo más fácil.
              </p>
            </>
          )
      }
    </article>
  )
}

export default Inicio
