import React, {  useEffect, useState } from 'react'
import '../App.css'
import { CiStar } from "react-icons/ci";

import type { typesDataUser, typesPropsGrandingSystem, typesValueHandle } from '../qualification';




function GrandingSystem(props: typesPropsGrandingSystem) {
    
  const [qualification, setQualification] = useState<typesDataUser>({
    username: '',
    qualification: 0,
    time: '',
  })

  // USAR EN .ENV O UN CONFIG
  const key = 'usersLogin'
  const dataLocalStorage = localStorage.getItem(key)

  const loadUsers = ()=>{
    
    if (!dataLocalStorage) {
      console.log("Pailas my papa");
      
    }else{
      setQualification({
        ...qualification,
        username: dataLocalStorage
      }) 
    }
  }

  useEffect(()=>{
    loadUsers()
  },[dataLocalStorage])
  



  const handleQualification = (value: typesValueHandle): void =>{
    setQualification({
      ...qualification,
      qualification: value
    })
  }



  const keyDataQualification = `info-qualification-${props.nameProduct}`
  const saveDataLocalStorage = (data: typesDataUser)=>{
    const dataLocalStorage = localStorage.getItem(keyDataQualification)
    if (!dataLocalStorage) {
      const newData = [data]
      const dataString = JSON.stringify(newData)
      localStorage.setItem(keyDataQualification, dataString)

    }else{
      const parceData = JSON.parse(dataLocalStorage)  
      const newData = [...parceData, data]
      const newDataString = JSON.stringify(newData)
      localStorage.setItem(keyDataQualification, newDataString)      
    }
  }

  const calculateNumberQualification = (): number =>{
    const DataLocalStorage = localStorage.getItem(keyDataQualification)

    if(!DataLocalStorage){
      return 0
    }else{
      const parseDataLocalStorage: Array<typesDataUser> = JSON.parse(DataLocalStorage)

      const lengthQualification = parseDataLocalStorage.length

      let sumQualification = 0
      parseDataLocalStorage.forEach(data => {
        sumQualification = sumQualification + data.qualification
      })

      const average = sumQualification / lengthQualification
      return average
    }
  }

  const addDateTime = ()=>{

    const time  = new Date(Date.now()).toLocaleString()
    
    setQualification({
      ...qualification, 
      time
    })

  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void =>{
    e.preventDefault()
    saveDataLocalStorage(qualification)
  } 
  
  return(
    <div>
      {/* <p>Granding system</p> */}
      <form  onSubmit={handleSubmit}>
        <div className='all-star-qualification'>
          <CiStar className='star-qualification' onClick={()=>{handleQualification(1)}}/>
          <CiStar className='star-qualification' onClick={()=>{handleQualification(2)}}/>
          <CiStar className='star-qualification'onClick={()=>{handleQualification(3)}}/>
          <CiStar className='star-qualification'onClick={()=>{handleQualification(4)}}/>
          <CiStar className='star-qualification'onClick={()=>{handleQualification(5)}}/>
        </div>

        <div>
          {/* <button type='submit' onClick={addDateTime}>Enviar</button> */}
          <button 
          type='submit' 
          onClick={()=>{
            addDateTime()
          }
          }>Enviar</button>
        </div>
      </form>


        <div>
          <p>calificacion</p>
          <p>{calculateNumberQualification()}</p>
        </div>
    </div>
  )
  
}

export default GrandingSystem