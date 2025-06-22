import { useEffect, useState } from "react"
import type { typesPropslistUsersQualification, typesDatailsInfoUsers, typesDataUser, typesUserAndCalification } from "../../types"
import { keyUserLocalStorage } from "../../config"
import { getUser } from "../../api/users.api"
import { useContextGranding } from "../../context/useContextGranding"

import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import style from "./ListUsersQualification.module.css"


const ListUsersQualification: React.FC<typesPropslistUsersQualification> = ({nameProduct, valueQualification , stateUser}) =>{
  //Estado que almacena los datos del usuario y la calificaciones
  const [dataUser ,setDataUser] = useState<typesUserAndCalification>()

  //Estado del usurio logeado
  const [logedUserQualification ,setLogedUserQualification] = useState<boolean>(false)

  //Escado abierto o cerrado, caja lista de usuarios     
  const [stateBoxUsersQualifications, setStateBoxUserQualifications] = useState<boolean>(false)

  const {stateGranding} = useContextGranding()

  //Cambiar el estado a abierto o cerrado solo si existen calificaciones
  const changeStateListUser =()=>{
    if(dataUser?.length == 0)return

    if (stateBoxUsersQualifications && dataUser) {
      setStateBoxUserQualifications(false)
    }else if(!stateBoxUsersQualifications && dataUser){
      setStateBoxUserQualifications(true)
    }
  }

  useEffect(()=>{  
    //Clave para acceder a la informacion de calificacion en el localstorage
    const keyDataQualification = `info-qualification-${nameProduct}` 

    // Obtener datos del productos del localstorage 
    const localStorageDataProduct = localStorage.getItem(keyDataQualification)

    // Obtener datos del usuario activo del localstorage
    const localStorageDataUser = localStorage.getItem(keyUserLocalStorage) 

    //Si hay datos del producto, se termina la ejecucion
    if (!localStorageDataProduct) return

    //Parsear lista de usuarios que calificaron el producto
    const listQualification: Array<typesDataUser> = JSON.parse(localStorageDataProduct)

    //Parsear datos del usuario que esta activo, 
    const userLoging: typesDatailsInfoUsers | null = localStorageDataUser? JSON.parse(localStorageDataUser): null

    
    //Funcion para obtener toda la informacion de un usuario por su id 
    const loadAUser = async(id: number)=>{
      const response = await getUser(id);
      return response;
    }

    //Obtener todos lo usuario que calificaron, filtrando al usuario loqueado si existe 
    const fetchUSers = async()=>{  
      try {
        const promises = listQualification.map(async q=> {
          const user = await loadAUser(q.userId)
          return {...user, ...q}
        });
        const users = await Promise.all(promises)          
        if (!userLoging) {
          setLogedUserQualification(false)
          setDataUser(users)
        }else if (userLoging) {
          const dataFilter= users.filter(user=> user.id != userLoging.id)
          setDataUser(dataFilter)

          // ERROR LOGICO: CUANDO HAY UN USUARIO EN EL LOCALSTORAGE LO MARCA COMO SI FUERA CALIFICADO 
          // setLogedUserQualification(true)
          const userEqualUser = users.filter(user=> user.id == userLoging.id);
          if (userEqualUser.length > 0) {
            setLogedUserQualification(true)
          }
          
        }
      } catch (error) {
        console.error(error); 
      }  
    }   
    fetchUSers()
  }, [nameProduct, valueQualification , stateUser])

  useEffect(()=>{
    if (stateGranding) {
      setDataUser([]);
      setStateBoxUserQualifications(false)
      setLogedUserQualification(false)
    }
  },[stateGranding])

  //Obtiene el titulo del recuadro de calificaciones, segun la cantidad de calificaciones que haiga
  const getLabelBoxCountQualifications = (): string =>{
    if(logedUserQualification){

      if(!dataUser) return "El usuario es undefined"

      return dataUser.length >=1 ? 
      `Tu y ${dataUser?.length} Persona${dataUser.length > 1 ? "s" : ""} calificaron` 
      :
      "Solo tú calificaste"
    
    }else{
      const count = dataUser?.length ?? 0;
      return `${count} calificacion${count != 1? "es": ""}`
    } 
  }

  return(
    <div className={style['list-user']}>
      <div className={style['user-list__box-title']} onClick={changeStateListUser}>
        <p>{getLabelBoxCountQualifications()}</p>
        {stateBoxUsersQualifications? 
        <MdOutlineKeyboardArrowUp className={style['list-user__box-title-button']}/> 
        :
        <MdOutlineKeyboardArrowDown className={style['list-user__box-title-button']}/>} 
      </div>
      
      <div>
        {stateBoxUsersQualifications? 
          <div className={style['list-user__box-user']}>
            {dataUser?.map(user=>(
            <div className={style['list-user__row-user']} key={user.id}>
              <div className={style['list-user__row-images']}>
                <img className={style['list-user__row-img']} src={user.avatar} alt=""/>
              </div>

              <div className={style['list-user__row-info']}>
                <div className={style['list-user__row-name']}>
                  <p>{`${user.first_name} ${user.last_name}`}</p>
                </div>

                <div className={style['list-user__row-time']}>
                  <p>{user.time}</p>
                </div>

              </div>
            </div>
          ))}
          </div>
          :
          ""
        }   
      </div>
    </div>
  )
}

export default ListUsersQualification
