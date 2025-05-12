import { useEffect, useState } from "react"
import jsonUsers from "../users.json" 
import type { typesInfoUsers, typesActivate } from "../qualification"

function UsersSystem(){

	const [infoUser, setInfoUser] = useState<typesInfoUsers>()
	
	const [isAtivate, setIsActivate] = useState<typesActivate>(false)

	useEffect(()=>{
		setInfoUser(jsonUsers.users)
	},[infoUser])


	const loginUser = (username: string)=>{
		// USAR EN .ENV O UN CONFIG
		const key = 'usersLogin'
		localStorage.setItem(key, username)
	}
	
	const handleActivate = ()=>{	
		if (isAtivate) {
			setIsActivate(false)
		}else{
			setIsActivate(true)
		}
	}

	return(
		<div className="content-user-system">
			<div className="all-users-system">
				<h2 onClick={()=>{handleActivate()}}>Users</h2>
				
				<div className={`content-users ${isAtivate? '': 'content-user-activate'}`}>
						{
							infoUser?.map( user =>(
								<div key={user.id} className={`row-users`} onClick={()=>{loginUser(user.username)}}>
									<p>{user.name}</p>
									<p>{user.username}</p>
								</div>
							))
						}
				</div>
			</div>
		</div>
	)
}

export default UsersSystem