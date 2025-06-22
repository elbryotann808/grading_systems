import { useCallback, useEffect, useState } from 'react'
import type { typesDatailsInfoUsers, typesDataUser, typesMessageAlert, typesPropsGrandingSystem, typesStateStar, typesValueHandle } from '../../types';
import StarValueCalculate from '../StarValueCalculate/StarValueCalculate';
import { useContextGranding } from '../../context/useContextGranding';
import { keyUserLocalStorage } from '../../config';
import ListUsersQualification from '../ListUsersQualification/ListUsersQualification';

// import style from './GrandingSystem.module.css'
import StarRating from '../StarRanking/StarRanking';





function GrandingSystem({nameProduct}: typesPropsGrandingSystem) {

  const initializeDataColorStar  = (): typesStateStar => ({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  })
  
  //Trae funciones del contexto 
  const { handleAlertState , stateGranding , triggerNotificationTimeout , stateLoginUser} = useContextGranding()

  //Valor de todas la calificaciones
  const [valueQualification, setValueQualification] = useState<number>(0) 

  //Estado del color que tiene la estrella 
  const [stateColorStar, setStateColorStar] = useState<typesStateStar>(initializeDataColorStar)

  //Clave de las calificaciones realidas
  const keyDataQualification = `info-qualification-${nameProduct}`
  
  //Envia los datos al local storage
  const saveDataLocalStorage = (data: typesDataUser)=>{
    const dataLocalStorage = localStorage.getItem(keyDataQualification)

    if (
      typeof data.userId != "number" || data.userId < 1 ||
      typeof data.time != "string" || data.time.trim().length === 0 || 
      typeof data.qualification != "number" || data.qualification < 1 || data.qualification > 5
     ) {  
      const messageEN: typesMessageAlert = {
        title: "Error, Data is incomplete",
        text: "The rating could not be submitted because the data is incomplete"
      }

      handleAlertState(true, messageEN.title , messageEN.text)
      return
    }
    
    if (!dataLocalStorage) {
      const newData = [data]
      const dataString = JSON.stringify(newData)
      localStorage.setItem(keyDataQualification, dataString)
      triggerNotificationTimeout(true, "✅ Calificacion registrada con exito ", "Los datos de tu califacion de registraron con éxito, Gracias por tu participacion", 1200)

    }else{ 
      const jsonDataQualification: Array<typesDataUser> = JSON.parse(dataLocalStorage)
      const newData = [...jsonDataQualification, data]
      const newDataString = JSON.stringify(newData)

      let countQualificationRepeated: Array<number> = [] 
      
      jsonDataQualification.forEach(dataQualification=>{
        if (dataQualification.userId === data.userId) {
          countQualificationRepeated = [...countQualificationRepeated, dataQualification.userId]
        }
      })
      
      if (countQualificationRepeated.length == 0) {
        localStorage.setItem(keyDataQualification, newDataString)
        
        triggerNotificationTimeout(true, "✅ Calificacion registrada con exito ", "Los datos de tu califacion de registraron con éxito, Gracias por tu participacion", 1200)
      }else{
        const messageEN: typesMessageAlert = {
          title: "The user has already rated",
          text: `The user ${data.userId} has already submitted their rating. It is only possible to rate once.`
        }
        handleAlertState(true, messageEN.title , messageEN.text) 
      }
    }
  }

  //Funcion que realiza el calculo de la calificacion 
  const calculateNumberQualification = useCallback((): number =>{
      const dataLocalStorage = localStorage.getItem(keyDataQualification)
   
      if(!dataLocalStorage){
        return 0
      }else{
        const parseDataLocalStorage: Array<typesDataUser> = JSON.parse(dataLocalStorage)
  
        const lengthQualification = parseDataLocalStorage.length
  
        let sumQualification = 0
        parseDataLocalStorage.forEach(data => {
          sumQualification = sumQualification + data.qualification
        })
  
        const average = sumQualification / lengthQualification
        return average
      }
  }, [keyDataQualification])

  //Funcion para enviar el formulario de las estrellas 
  const handleQualification = (value: typesValueHandle): void =>{
    const time  = new Date(Date.now()).toLocaleString()

    const dataLocalStorage = localStorage.getItem(keyUserLocalStorage)
   
    if (dataLocalStorage) {
      const jsonData: typesDatailsInfoUsers = JSON.parse(dataLocalStorage)
      const dataQualification : typesDataUser = {
        userId: jsonData.id,
        qualification: value,
        time  
      }  
      saveDataLocalStorage(dataQualification)
      setValueQualification(calculateNumberQualification())
    }else{     
      const messageEN: typesMessageAlert = {
        title: "Sign in to rate",
        text: "It is necessary to have a user account in order to rate. I recommend signing in with a valid user account to be able to rate."
      }
      
      handleAlertState(true, messageEN.title , messageEN.text)
    }
  }

  //Activa el estado del color de la estrella
  const handleStarActivate = (value: typesValueHandle)=>{    
    const newData: Record<number,boolean> = {}

    let i = 0
    while(i <= value){
      newData[i] = true
      i++
    }
    setStateColorStar({
      ...stateColorStar,
      ...newData
    })
  }

  //Desactiva el estado del color de la estrella 
  const handleStarDeactivate = () => {
    setStateColorStar(initializeDataColorStar)  
  }

  //Si cambia una actualizacion a la calificacion se realiza  
  useEffect(() => {
    if (stateGranding) {
      setValueQualification(0)
    }
    else{
      setValueQualification(calculateNumberQualification())
    }
  }, [stateGranding, calculateNumberQualification]);

  return(
    <div>
       <div >
        <StarValueCalculate value={valueQualification}/>
       </div>
    
      <form>  
        <StarRating
          handleQualification={(value) => handleQualification(value)}
          handleStarActivate={(value) => handleStarActivate(value)}
          handleStarDeactivate={() => handleStarDeactivate()}
          stateColorStar={stateColorStar}
        />
      </form>
    
        <ListUsersQualification nameProduct={nameProduct} valueQualification={valueQualification} stateUser={stateLoginUser}/>
    </div>
  )
  
}

export default GrandingSystem