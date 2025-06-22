import { useContextGranding } from "../../context/useContextGranding"
import style from "./AlertSystem.module.css"

 function AlertSystem (){
  //Trae el estado de la alerta, y los datos de la alerta
  const {handleAlertState, alertState} = useContextGranding()
  
  //Cierra la alerta
  const handleClose = ()=>{
    handleAlertState(false , "", "")
  }
  
  return(
    <section className={`${alertState.state? style['alert'] : ""}`} onClick={handleClose}>
      <div className={`${alertState.state? style['alert__box'] : style['alert__box--hidden']}`} onClick={e=>e.stopPropagation()}>
        <div>
          <div className={style['alert__box-title']}>
            <h2>{alertState.title}</h2>
          </div>

          <div className={style['alert__box-text']}>
            <p>{alertState.text}</p>
          </div>
        </div>
        
        <div className={style['alert__box-button']}>
          <button className={style['alert__button-close']} onClick={handleClose}>Close</button>
        </div>
      </div>
    </section>  
  )
}

export default AlertSystem