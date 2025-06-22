import { useEffect, useState } from "react" 
import type { typesDatailsInfoUsers, typesInfoUsers } from "../../types"
import { useContextGranding } from "../../context/useContextGranding"
import { getUsers } from "../../api/users.api"
import { keyUserLocalStorage } from "../../config"

import { IoMenuOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import style from "./UsersSystem.module.css"

  
function UsersSystem(){
	//Inicializar el estado que guarda el usuario que esta logeado
	const initializeDataUserLoged = ()=>({
			avatar: "",
			id: 0,
			email: "",
			first_name: "",
			last_name: ""
	})

	//Trae funciones del contexto
	const { stateGranding, stateLoginUser, triggerStateLoginUser, handleClearAll, initializeStateGranding} = useContextGranding()
	
	//Info usuario
	const [infoUser, setInfoUser] = useState<typesInfoUsers>()

	//Almena info del usuario logeado 
	const [userLoged, setUserLoged] = useState<typesDatailsInfoUsers>(initializeDataUserLoged)
	
	//Activar y desactivar, caja de usuarios 
	const [isAtivate, setIsActivate] = useState<boolean>(false)

	//Estado que inicica si la pantalla es pequeña o pequeña, se inicializa con false que es grande
	const [isSmallScreenSize , setIsSmallScreenSize] = useState(false)

	//Esado que guarda el tamaño exacto que tiene la pantalla
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth, 
  });
	
	//Estado que inidica si la activa la caja navegadora de la pantalla pequeña
	const [isAtivateBoxSmallScreen, setIsAtivateBoxSmallScreen] = useState(false)

	
	//Cambiar de estado ala caja de usuarios 
	const handleActivate = ()=>{	
		if (isAtivate) {
			setIsActivate(false)
		}else{
			setIsActivate(true)
		}
	}

	//Cambia el estado de la caja de usuarios pero para pantallas pequeñas 
	const handleActivateBoxSmallScreen = ()=>{
		if (isAtivateBoxSmallScreen) {
			setIsAtivateBoxSmallScreen(false)
			setIsActivate(false)
		}else{
			setIsAtivateBoxSmallScreen(true)
		}
	}

	//Cierra la secion del usuario, el DOOM y localStorage
	const deleteUserLogin = ()=>{
			localStorage.removeItem(keyUserLocalStorage)

			// setStateLoginUser(false)
			triggerStateLoginUser(false)
			setIsActivate(false)
			// setAvatarUrlUser("")
			setUserLoged(initializeDataUserLoged)
	}

	//Carga los usuarios 
	const loadUsers = async()=>{
		const response = await getUsers()
		// console.log(response);
		setInfoUser(response)
	}

	//Selecionar un usuario
	const handleRowUser = (username: typesDatailsInfoUsers) =>{
	
		
		const stringData = JSON.stringify(username)
		localStorage.setItem(keyUserLocalStorage, stringData)

		triggerStateLoginUser(true)
		setUserLoged(username)
		setIsActivate(false)
	}

	//Llama a la api para cargar usuarios
	useEffect(()=>{
		loadUsers()
	}, [])

	//Verifica si iniciron seccion 
	useEffect(()=>{
		const dataLocalStorage = localStorage.getItem(keyUserLocalStorage)
		if(!dataLocalStorage) return
		
		const jsonData: typesDatailsInfoUsers = JSON.parse(dataLocalStorage)

		if (dataLocalStorage === null) {
			triggerStateLoginUser(false)
		}else{
			triggerStateLoginUser(true)
			setUserLoged(jsonData)
		}
			
	},[infoUser, triggerStateLoginUser])


	//Elima usuario del DOOM y localStorage, si state granding es true
	useEffect(()=>{
		if (stateGranding) {
			localStorage.removeItem(keyUserLocalStorage)
			triggerStateLoginUser(false)
			setIsActivate(false)
			setUserLoged(initializeDataUserLoged)
		}
		initializeStateGranding()
	},[stateGranding, stateLoginUser, triggerStateLoginUser, initializeStateGranding])


	//Captura la pantalla en tiempo real 
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);

    // Limpieza del evento al desmontar el componente
    return () => window.removeEventListener('resize', handleResize);
		
  }, []);


	//Captura cuando la pantalla es menor a 360px
	useEffect(() => {
		if (screenSize.width <= 360) {
			setIsSmallScreenSize(true);	
		}else{
			setIsSmallScreenSize(false);
		}
  }, [screenSize]);
	
	
	return(
		<nav className={style['navbar']}>
			<div className={style['navbar__content-title']}>
				<h1 className={style['navbar__title']}>Granding system</h1>
			</div>

			{isSmallScreenSize? 
			<div className={style['navbar__actions-small']}>
				<button className={style['navbar__button-menu']} onClick={handleActivateBoxSmallScreen}><IoMenuOutline className={style['navbar__icon-menu']}/></button>
				
				<div className={`${style['navbar__options-menu']} ${isAtivateBoxSmallScreen? '' : style['navbar__options-menu--hidden']}`} onClick={handleActivateBoxSmallScreen}>
					<ul className={style['navbar__options-menu-list']} onClick={(e=> e.stopPropagation())}>
						{
							isAtivateBoxSmallScreen &&
							<>
							<li className={style['navbar__elements-menu-list']} onClick={handleActivate}>
								<button className={style['navbar__button-login-small']}>
									{stateLoginUser && userLoged.email.length > 0?
									<>
										<img className={style['navbar__button-avartar']} src={userLoged.avatar} alt="image-avatar"/>
										<p className={style['navbar__title-avartar']}>{`${userLoged.first_name} ${userLoged.last_name}`}</p> 
									</>
									:
									"Sign in"}
								</button>

								{isAtivate? 
								<MdOutlineKeyboardArrowUp className={style['list-user__box-title-button']}/> 
								:
								<MdOutlineKeyboardArrowDown className={style['list-user__box-title-button']}/>}
							</li>
							{
								isAtivate?
								stateLoginUser?
									<li className={style['navbar__singout-small']} onClick={deleteUserLogin}>
										<p className={style['navbar__singout-small-text']}>Sign out</p>
									</li>
									: 
									<div className={style['navbar__box-user-item-small']}>
									{
										infoUser?.map( user =>(
											<li key={user.id} className={style['navbar__user-item-small']} onClick={()=>{handleRowUser(user)}}>
												<img className={`${style['navbar__user-avatar']} ${style['navbar__user-avatar-small']}`} src={user.avatar} alt={user.first_name} />
												<p>{`${user.first_name} ${user.last_name}`}</p>
											</li>
										))
									}	
									</div>
								:
								""
							}

							<li className={style['navbar__elements-menu-list']} onClick={handleClearAll}>
								Clear grades 
							</li>

							</>
						}
					</ul>
				</div>
			</div>
			:
			<div className={style['navbar__actions']}>
				<div className={style['navbar__button-clear']} onClick={handleClearAll}>
					Clear grades
				</div>

				<div className={style['navbar__user']}>
						<button className={style['navbar__button-login']} onClick={()=>{handleActivate()}}>{stateLoginUser && userLoged.email.length > 0? 	<img className={style['navbar__button-avartar']} src={userLoged.avatar} alt="image-avatar" /> : "Sign in"}</button>

						<ul className={`${style['navbar__user-menu']} ${isAtivate? '': style['navbar__user-menu--hidden']}`} >
							{
								stateLoginUser? 
								<li className={style['navbar__singout']} onClick={deleteUserLogin}>
									<p className={style['navbar__singout-text']}>Sign out</p>
								</li>
								: 
								infoUser?.map( user =>(
									<li key={user.id} className={style['navbar__user-item']} onClick={()=>{handleRowUser(user)}}>
										<img className={`${style['navbar__user-avatar']} ${style['navbar__user-avatar-big']}`} src={user.avatar} alt={user.first_name} />
										<p>{`${user.first_name} ${user.last_name}`}</p>
									</li>
								))
							}
						</ul>
				</div>
			</div>
			}
		</nav>
	)
}

export default UsersSystem