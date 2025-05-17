import { useState } from "react"
import {GrandingContext} from "./GrandingContext"
import type { typesAlertState, typesGrandingProvider } from "../types"




function GrandingProvider({children}: typesGrandingProvider){
  const [alertState, setAlertState] = useState<typesAlertState>({
    state: false,
    text: ""
  })  

  const handleAlertState = (state: boolean, text: string) =>{
    setAlertState({
      state,
      text
    })
  }
  
  return (
    <GrandingContext.Provider value={{alertState, handleAlertState}}>
      {children}
    </GrandingContext.Provider>
  )

}

export default GrandingProvider