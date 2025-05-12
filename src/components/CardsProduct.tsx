import { useEffect, useState } from "react";
import jsonProducts from "../products.json"; 
import GrandingSystem from "./GrandingSystem";
import type { typesProducts } from "../qualification";


function CardsProduct() {
  
  const [products, setProducts] = useState<typesProducts>()

  useEffect(()=>{
    setProducts(jsonProducts[0])
  },[products])

  
  return (
    <div className="content-card">
      <h1>Carta productos </h1>
      <div className="all-products">
        {
          products?.map(p =>(
            <div key={p.id} className="card-products">
              <p>{p.id}</p>
              <p>{p.name}</p>
              <p>{p.description}</p>
              <p>{p.price}</p>
              <GrandingSystem nameProduct={`${p.name}-${p.id}`}/>
            </div>
          ))
        }
      </div>
    </div>
  ) 
}

export default CardsProduct