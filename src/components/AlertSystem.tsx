
import { useContextGranding } from "../context/useContextGranding"


function AlertSystem (){
  
  const {handleAlertState, alertState} = useContextGranding()
  
  const handleClose = ()=>{
    handleAlertState(false , "")
  }
  
  return(
    <section className={`${alertState.state? "container-alert": ""}`} onClick={handleClose}>

      <div className={`${alertState.state? "window-alert": "not-see-window-aler"}`} onClick={e=>e.stopPropagation()}>
      <p>{alertState.text}</p>

      <button onClick={()=> handleClose()}>Cerrar</button>
      </div>
    </section>
  )
}


export default AlertSystem