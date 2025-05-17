import { useEffect, useState } from "react"
import jsonUsers from "../users.json" 
import type { typesInfoUsers, typesActivate } from "../types"

  
function UsersSystem(){

	const [infoUser, setInfoUser] = useState<typesInfoUsers>()
	
	const [isAtivate, setIsActivate] = useState<typesActivate>(false)

	// useEffect(()=>{
	// 	setInfoUser(jsonUsers.users)
	// },[infoUser])


	const [ stateLoginUser , setStateLoginUser] = useState<boolean>(false)
	const [ stringUser , setStringUSer] = useState<string>("")

	const loginUser = (username: string)=>{
		// USAR EN .ENV O UN CONFIG
		const key = 'usersLogin'
		localStorage.setItem(key, username)


		setStateLoginUser(true)
		setStringUSer(username)
	}	
	
	const handleActivate = ()=>{	
		if (isAtivate) {
			setIsActivate(false)
		}else{
			setIsActivate(true)
		}
	}


	
	useEffect(()=>{
		setInfoUser(jsonUsers.users)
		
		const key = 'usersLogin'
		const dataLocalStorage = localStorage.getItem(key)
		// console.log(dataLocalStorage);

		if (dataLocalStorage === null) {
			setStateLoginUser(false)
		}else{
			setStateLoginUser(true)
			setStringUSer(dataLocalStorage)
		}
		

	},[infoUser])



	const deleteUserLogin = ()=>{
		const	key= 'usersLogin'
		localStorage.removeItem(key)

		setStateLoginUser(false)
		setIsActivate(false)
		setStringUSer("")
	}

	return(
		<nav className="navbar">
			<div>
				<h1 className="title-navbar">Granding system</h1>
			</div>

			<div className="content-user-system">
				<div className="all-users-system">
					<p className="content-title-dinamic" onClick={()=>{handleActivate()}}>{stateLoginUser? stringUser : "Iniciar secion"}</p>

					<div className={`content-users ${isAtivate? '': 'content-user-activate'}`}>
							{
								stateLoginUser? 
								<div onClick={deleteUserLogin}>
									<p>cerra sesion </p>
								</div>
								: 
								infoUser?.map( user =>(
									<div key={user.id} 
									className={`row-users`} 
									onClick={()=>{
										loginUser(user.username)
										setIsActivate(false)
									}}>
										{/* <img src={user.icon} alt="" /> */}
										<p>{user.name}</p>
										<p>{user.username}</p>
									</div>
								))
							}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default UsersSystem