import { useState, useRef } from "react"
import {GrandingContext} from "./GrandingContext"
import type { typesAlertState, typesNotificationStateWithTime, typesGrandingProvider } from "../types"

//Funcion que guarda todas la funciones del context
function GrandingProvider({children}: typesGrandingProvider){
  
  // Estado que guarda el sistema de calificaciones
  const [stateGranding, setStateGranding] = useState<boolean>(false)

  // El estado de las calificaciones se cirran y se elmina toda la informacion guardadd 
  const handleClearAll = ()=>{
    localStorage.clear()
    setStateGranding(true)
  } 
  
  // Inicializa el estado de las calificaciones
  const initializeStateGranding = ()=>{
    setStateGranding(false)
  }

  // Estado que indica cuando se cierra y abre sesion de usuario
  const [ stateLoginUser , setStateLoginUser] = useState<boolean>(false)

  // Cambiar el estado de la sesion del usuario
  const triggerStateLoginUser = (state: boolean)=>{
    setStateLoginUser(state)
  }


  //ALERTA

  //Estado de la alerta
  const [alertState, setAlertState] = useState<typesAlertState>({
    state: false,
    title: "",
    text: ""
  })  

  // @Param {bolean} state - Estado de la notificacion
  // @Param {string} title - titulo o encabezado de la notificacion 
  // @Param {string} text - texto o cuerpo de la notificacion
  // Cambiar el estado de la alerta y se le pasa un titulo y el texto de la alerta
  const handleAlertState = (state: boolean, title:string, text: string) =>{
    setAlertState({
      state,
      title,
      text
    })
  }

  // NOTIFICATIONS

  // Inicializa el estado de las notificaciones con algunos valores predeterminados
  const initializeNotificationTime = (): typesNotificationStateWithTime =>({
    state: false,
    title: "",
    text: "",
    time: 0 
  })

  // Estado que contiene la informacion de la notificacion
  const [notificationTimeState, setNotificationTimeState] = useState<typesNotificationStateWithTime>(initializeNotificationTime())  
  
  // Referencias para manejar el identificador del temporizador 
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Activa el temporizador de la notificacion  
  // @Param {bolean} state - Estado de la notificacion 
  // @Param {string} title - titulo o encabezado de la notificacion 
  // @Param {string} text - texto o cuerpo de la notificacion 
  // @Param {number} time - Tiempo que va esta la notificacion activa, en milisegundos
  const triggerNotificationTimeout = (state: boolean, title:string, text: string, time: number) =>{
    // MANEJA EL TEMPORIZADOR, LO LIMPIA Y REINICIALIZA
    const clearAndStarTimer = ()=>{
      console.log(timeoutRef.current);
      if(timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setNotificationTimeState(initializeNotificationTime)
        timeoutRef.current = null
      }, time );
    } 

    // SI LA NOTIFICACION NO ESTA ACTIVA, LA INICIALIZA Y CONFIGURA EL TEMPORIZADOR
    if (!notificationTimeState.state) {
        setNotificationTimeState({
        state,
        title,
        text,
        time,
      })
      
      clearAndStarTimer()
    }else{
      // PERO SI HAY UNA NOTIFICACION ACTIVA(EN CURSO), SE REINICIA EL ESTADO Y ESTABLECE UNA NUEVA NOTIFICACION
      setNotificationTimeState(initializeNotificationTime)

      setTimeout(()=>{
        setNotificationTimeState({
          state,
          title,
          text,
          time,
        })

         clearAndStarTimer()
      }, 100)
    }    
  }

  return (
    <GrandingContext.Provider 
    value={{
      alertState,
      handleAlertState, 
      handleClearAll, 
      initializeStateGranding,
      stateGranding, 
      notificationTimeState, 
      triggerNotificationTimeout,

      stateLoginUser,
      triggerStateLoginUser
    }}>
      {children}
    </GrandingContext.Provider>
  )
}

export default GrandingProvider