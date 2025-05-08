import { useState } from 'react'
import './App.css'
import { CiStar } from "react-icons/ci";

function App() {
  type typesQualification = number[]


  const [qualification, setQualification] = useState<typesQualification>([])

  const calculateNumberQualification = ():number =>{
    const LengQualification = qualification.length
    
      let sumQualification = 0
      qualification.forEach((num) =>{
        sumQualification = sumQualification + num
      })

      if (sumQualification < 1) {
        return 0
      }
      
      const average = sumQualification /  LengQualification 
      return average
  }

  type typesValueHandle = 1 | 2 | 3 | 4 | 5 ;

  const handleQualification = (value: typesValueHandle)=>{
    setQualification([...qualification, value])
  }
  return (
    <div>
      <h1>Granding system</h1>
        <div className='all-star-qualification'>
          <CiStar className='star-qualification' onClick={()=>{handleQualification(1)}}/>
          <CiStar className='star-qualification' onClick={()=>{handleQualification(2)}}/>
          <CiStar className='star-qualification'onClick={()=>{handleQualification(3)}}/>
          <CiStar className='star-qualification'onClick={()=>{handleQualification(4)}}/>
          <CiStar className='star-qualification'onClick={()=>{handleQualification(5)}}/>
        </div>

        <div>
          <p>calificacion</p>
          <p>{calculateNumberQualification()}</p>
        </div>
    </div>
  )
}

export default App
