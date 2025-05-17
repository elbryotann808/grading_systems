import { useEffect, useState } from 'react'
import '../App.css'
import type { typesDataUser, typesPropsGrandingSystem, typesStateStar, typesValueHandle } from '../types';
import StarValueCalculate from './StarValueCalculate';
import { useContextGranding } from '../context/useContextGranding';


function GrandingSystem(props: typesPropsGrandingSystem) {
  
  const { handleAlertState } = useContextGranding()


  const [valueQualification, setValueQualification] = useState<number>(0) 

  const [stateColorStar, setStateColorStar] = useState<typesStateStar>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  })


  useEffect(()=>{
    calculateNumberQualification()
  })  


  const keyDataQualification = `info-qualification-${props.nameProduct}`
  
  const saveDataLocalStorage = (data: typesDataUser)=>{
    const dataLocalStorage = localStorage.getItem(keyDataQualification)

    
    if (data.username.length < 1 ||  data.time.length < 1 || data.qualification == 0) {
      console.log("El usuario no puede calificar ninguno de los datos son correctos");
      handleAlertState(true, "El usuario no puede calificar ninguno de los datos son correctos")
      return
    }
    
    if (!dataLocalStorage) {
      const newData = [data]
      const dataString = JSON.stringify(newData)
      localStorage.setItem(keyDataQualification, dataString)

    }else{ 
      const jsonDataQualification: Array<typesDataUser> = JSON.parse(dataLocalStorage)
      const newData = [...jsonDataQualification, data]
      const newDataString = JSON.stringify(newData)

      let countQualificationRepeated: Array<string> = []   

      jsonDataQualification.forEach(dataQualification=>{
        if (dataQualification.username === data.username ) {
          countQualificationRepeated = [...countQualificationRepeated, dataQualification.username]
        }
      })

      if (countQualificationRepeated.length == 0 ) {
      localStorage.setItem(keyDataQualification, newDataString)
      }else{
        console.log("usuario ya califico"); 
        handleAlertState(true, `El usuario ${data.username} ya califico`)
      }      
    }
  }

  const calculateNumberQualification = () =>{
    const DataLocalStorage = localStorage.getItem(keyDataQualification)

    if(!DataLocalStorage){
      setValueQualification(0)
    }else{
      const parseDataLocalStorage: Array<typesDataUser> = JSON.parse(DataLocalStorage)

      const lengthQualification = parseDataLocalStorage.length

      let sumQualification = 0
      parseDataLocalStorage.forEach(data => {
        sumQualification = sumQualification + data.qualification
      })

      const average = sumQualification / lengthQualification
      setValueQualification(average)
    }


  }

  const handleQualification = (value: typesValueHandle): void =>{
    const time  = new Date(Date.now()).toLocaleString()

    // USAR EN .ENV O UN CONFIG
    const key = 'usersLogin'
    const dataLocalStorage = localStorage.getItem(key)
   
    if (dataLocalStorage) {
      const dataQualification : typesDataUser = {
      username: dataLocalStorage,
      qualification: value,
      time  
      }  
      saveDataLocalStorage(dataQualification)
      calculateNumberQualification() 
  }else{
    console.log("Se necesita tener un usuaria para ponder calificar");
    handleAlertState(true, "Se necesita tener un usuaria para ponder calificar")
  }
  }

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

  const handleStarDeactivate = () => {
    setStateColorStar({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    })  
  }


  return(
    <div>
      <form>
        <div className='all-star-qualification'>
            <div className={`star ${stateColorStar[1]? "color" : ""}`} onClick={()=>{handleQualification(1)}} onMouseEnter={()=> {handleStarActivate(1)}} onMouseLeave={()=>{handleStarDeactivate()}}></div>
            <div className={`star ${stateColorStar[2]? "color" : ""}`} onClick={()=>{handleQualification(2)}} onMouseEnter={()=> {handleStarActivate(2)}} onMouseLeave={()=>{handleStarDeactivate()}}></div>
            <div className={`star ${stateColorStar[3]? "color" : ""}`} onClick={()=>{handleQualification(3)}} onMouseEnter={()=> {handleStarActivate(3)}} onMouseLeave={()=>{handleStarDeactivate()}}></div>
            <div className={`star ${stateColorStar[4]? "color" : ""}`} onClick={()=>{handleQualification(4)}} onMouseEnter={()=> {handleStarActivate(4)}} onMouseLeave={()=>{handleStarDeactivate()}}></div>
            <div className={`star ${stateColorStar[5]? "color" : ""}`} onClick={()=>{handleQualification(5)}} onMouseEnter={()=> {handleStarActivate(5)}} onMouseLeave={()=>{handleStarDeactivate()}}></div>
        </div>
      </form>

      <div>
        <p>calificacion</p> 
        <p>{valueQualification}</p>
        <div>
          {/* <StarValueCalculate value={valueQualification}/> */}
          <StarValueCalculate value={valueQualification}/>
        </div>
      </div>
    </div>
  )
  
}

export default GrandingSystem