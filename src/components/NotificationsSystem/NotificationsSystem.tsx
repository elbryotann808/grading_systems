import { useContextGranding } from "../../context/useContextGranding"
import style from "./NotificationsSystem.module.css"

const NotificationsSystem = ()=>{
  //Obtiene, el estado y informacion de la notificacion, del context, para imprimir en pantalla 
  const { notificationTimeState } = useContextGranding()

  //Si se activa una notificacion, se renderiza; de lo contrario, no se renderiza nada  
  return notificationTimeState.state && (
    <section className={style['notification']}>
      <div className={style['notification__box']}>
        <h2 className={style['notification__title']}>{notificationTimeState.title}</h2>
        <p className={style['notification__text']}>{notificationTimeState.text}</p>
      </div> 
    </section>    
  )
}

export default NotificationsSystem
