//Base de url api
const baseUrl = "https://reqres.in"

//Funcion para trae a todos los usuarios de la api
export const getUsers = async()=>{
	const response =await  fetch(`${baseUrl}/api/users`, {
		headers: {
			"x-api-key" : `${import.meta.env.VITE_API_USER_ACCEST}`
		}
	})

	const json = await response.json()
	return json.data
}

//Funcion que tre un usuario de la api 
export const getUser = async(id: number)=>{
	const response = await fetch(`${baseUrl}/api/users/${id}`, {
		headers:{
			"x-api-key" : "reqres-free-v1"
		},
		method:"GET"
	})

	const json = await response.json()
	// console.log(json.data);
	
	return json.data
}


//Base de url api 
const baseUrlRick = "https://rickandmortyapi.com/api/character/?page=1"

//Funcion para traer los datos de la api
export const getApiRick = async()=>{
  try {
    //Realiza el fech a la api
    const response = await fetch(baseUrlRick,{
      method: "GET",
      headers:{
        "content-type" : "application/json"
      }
    })

    //Si la respuesta es distinta a 2xx manda un error
    if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  
    //Covierte los datos a json
    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    throw new Error(`there was an error with the data, Error: ${error instanceof Error? error.message: String(error)}`)
  }
}
