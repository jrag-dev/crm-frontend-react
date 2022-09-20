import React, {useReducer} from "react"

import AlertaContext from "./alertaContext"

import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA
} from '../../types'
import alertaReducer from "./alertaReducer"

const AlertaState = props => {

  const initialState = {
    alerta: null
  }

  // dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(alertaReducer, initialState)


  // Funciones que cambian el state
  const mostrarAlerta = (mensaje, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        mensaje,
        categoria
      }
    });

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 5000);
  }

  const datos = {
    alerta: state.alerta,
    mostrarAlerta
  }

  return (
    <AlertaContext.Provider value={datos}>
      {props.children}
    </AlertaContext.Provider>
  )
}

export default AlertaState
