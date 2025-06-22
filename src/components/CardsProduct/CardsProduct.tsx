import { useEffect, useState } from "react";

import { getApiRick } from "../../api/users.api";
import GrandingSystem from "../GrandingSystem/GrandingSystem";
import type { typesProducts } from "../../types";

import style from './CardsProducts.module.css'

function CardsProduct() {
  //Guarda los productos traidos por la api
  const [products, setProducts] = useState<typesProducts>([])
  
  //Estado que indica si la consulta fue correcta
  const [ loading, setLoading] = useState<boolean>(true)

  //Estada que guarda el error si hay 
  const [error, setError] = useState<string | null>(null)
  
  //Funcion para el llamado y el cargado de datos traido por la api
  const loadProduct = async()=>{  
    try {
      const reponse = await getApiRick()
      setProducts(reponse.results);
      setLoading(false)
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message || "Error loading products")
      }else{
        setError("Error loading products")
      }
      // setError("Error loading products")
      setLoading(false)
    }
  }

  //Inicializa todo el programa
  useEffect(()=>{
    loadProduct()
  },[])

  // Si hay error 
  if(error){
    return(
      <section className={style['product-list']}>
        <div className={style['product-list__conteiner']}>
          <h1>{error}</h1>
        </div>
      </section>
    )
  }

  //Si esta cargando 
  if (loading) {
    return(
      <section className={style['product-list']}>
        <div className={style['product-list__conteiner']}></div>
 
        <ul className={style['product-list__grid']} aria-busy="true">
          {[...Array(8)].map((_,i)=>(
            <li key={i} className={style['product-list__grid']}>
              <div className={style['product-list__card']}>

                <div className={style['product-list__card-images-wrapper']}>
                  <div className={style['skeleton']} />
                </div>

                <div className={style['product-list__card-info']}>
                  <div className={`${style['skeleton']} ${style['skeleton__row-title']}`}  />
                  <div className={`${style['skeleton']} ${style['skeleton__row-text']}`}  />
                  <div className={`${style['skeleton']} ${style['skeleton__row-text']}`}  />

                  <div className={`${style['skeleton']} ${style['skeleton__row-button']}`} />
                </div>

              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  //Si todo sale correcto retorna las cartas 
  return(
    <section className={style['product-list']}>
      <div className={style['product-list__conteiner']}>
        <ul className={style['product-list__grid']}>
             {products?.map(p =>( 
                 <li key={p.id} className={style['product-list__card']}>
                   <div  className={style['product-list__card-images-wrapper']}>
                     <img className={style['product-list__card-image']} src={p.image} alt={p.name}/>
                   </div>
                   <div className={style['product-list__card-info']}>
                     <p>{p.name}</p>
                     <GrandingSystem nameProduct={`${p.name}-${p.id}`}/>
                   </div>
                 </li>
               ))}
             </ul>
      </div>

    </section>
  ) 
}

export default CardsProduct