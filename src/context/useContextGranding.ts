import { useContext } from "react"
import { GrandingContext } from "./GrandingContext"

//Funcion para trear los funciones y parametro del contexto
export const useContextGranding = () =>{
  const context = useContext(GrandingContext)
  if (!context) {
    throw new Error("Este contexto no existe para la app")
  }
  
  return context 
} 