import { useEffect, useState } from "react";
import type { typesObjectNumbers, typesValueHandle, typesPropsStarValueCalculate } from "../../types";

import style from "./StarValueCalculate.module.css"
import styleStar from "../../styles/star.module.css"

// NO PUEDE RECIBIR CUALQUIER NUMBER 
// NUMBER >= 0 && <= 5 
function StarValueCalculate({value}: typesPropsStarValueCalculate){
  const initializeObjectNumbers: typesObjectNumbers = {1:0, 2:0, 3:0, 4:0, 5:0 }

  //Estado de la calificion para que es imprima en pantalla
  const [stateStarCalculate, setStateStarCalculate] = useState<typesObjectNumbers>(initializeObjectNumbers);

  //Calculo de como se imprimiran las estrellas en pantalla
  const objectNumberReceived = (number: number): typesObjectNumbers => {
    const objectOfNumbers: typesObjectNumbers = initializeObjectNumbers;
    const numberWhole: number = Math.floor(number);
    const numberDecimal: number = number - numberWhole;

    for (let i = 1; i <= numberWhole && i <= 5; i++) {
        objectOfNumbers[i as keyof typesObjectNumbers] = 1
    }

    if (numberDecimal > 0) {
        // objectOfNumbers[numberWhole + 1] = parseFloat(numberDecimal.toFixed(1)); 
        objectOfNumbers[(numberWhole + 1) as keyof typesObjectNumbers] = parseFloat(numberDecimal.toFixed(1)); 
    }

    return objectOfNumbers;
  } 
  
  //Inicializa la calculacion y la guarda en el estado
  useEffect(() => {
    setStateStarCalculate(objectNumberReceived(value)) 
  }, [value]);
  
  //Array con numero de estrella
  const stars: typesValueHandle[] = [1, 2, 3, 4, 5];

  return(
    <div className={style['rating']}>
      <div className={style['rating__star']}>
        {
          stars.map((star)=>(
            <div key={star} className={`${styleStar['star']} ${stateStarCalculate[star] == 1? styleStar['star--color'] : "" } ${stateStarCalculate[star] >= 0.5 && stateStarCalculate[star]<= 0.9 ? styleStar['star--half'] : "" }`}></div>
          ))
        }
      </div>
      <div className={style['rating__value']}>
        <p>{`(${value.toFixed(1)})`}</p>
      </div>
    </div>
  )
}

export default StarValueCalculate