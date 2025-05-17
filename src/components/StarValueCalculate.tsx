
// NO PUEDE RECIBIR CUALQUIER NUMBER 
// NUMBER >= 0 && <= 5 
interface typespp{
  value: number
}


// Este code necesita muchas mejoras 
// EN DESARRROLLO 
function StarValueCalculate(props: typespp){
  const arrayOfNumbers: Array<number> = []

  const stateStarCalculate: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  }
  
  const value = props.value
  let valueNew = value
  let i = 1

  while(i < value){
    arrayOfNumbers.push(i)
    valueNew --
    i ++
  }
  arrayOfNumbers.push(valueNew)


  let ingrement = 1
  arrayOfNumbers.forEach(data =>{
    const validate = Number.isInteger(data) && data > 0
    if (validate) {
      stateStarCalculate[ingrement] = 1
    }else{
      stateStarCalculate[ingrement] = data
    }
    ingrement ++
  })
    
  return(
    <div className='container-star-calculate'>
      <div className={`star ${stateStarCalculate[1] == 1?"color":"" } ${stateStarCalculate[1] >= 0.5 && stateStarCalculate[1]<= 0.9 ? "star-half" : "" }`}></div>
      <div className={`star ${stateStarCalculate[2] == 1?"color":"" } ${stateStarCalculate[2] >= 0.5 && stateStarCalculate[2]<= 0.9 ? "star-half" : "" }`}></div>
      <div className={`star ${stateStarCalculate[3] == 1?"color":"" } ${stateStarCalculate[3] >= 0.5 && stateStarCalculate[3]<= 0.9 ? "star-half" : "" }`}></div>
      <div className={`star ${stateStarCalculate[4] == 1?"color":"" } ${stateStarCalculate[4] >= 0.5 && stateStarCalculate[4]<= 0.9 ? "star-half" : "" }`}></div>
      <div className={`star ${stateStarCalculate[5] == 1?"color":"" } ${stateStarCalculate[5] >= 0.5 && stateStarCalculate[5]<= 0.9 ? "star-half" : "" }`}></div>
    </div>
  )
}

export default StarValueCalculate