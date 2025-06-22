// Tipos para las cantidad de estellas que se pueden ingresar
export type typesValueHandle = 1 | 2 | 3 | 4 | 5 ;

// Datos a enviar al local storage de las calificaciones que se realizen  
export interface typesDataUser {
    userId: number,
    qualification: number,
    time: string,
}

// Datos detallados de la informacion de los usuarios
export interface typesDatailsInfoUsers {
  avatar: string,
  id: number,
  email: string,
  first_name: string,
  last_name: string
}

// Array de la informacion a de los usuarios 
export type typesInfoUsers = Array<typesDatailsInfoUsers>

// Array de la infomacion de los usuarios y la infomacion de que tiene que tener una calificacion
type typesUserAndCalification = Array<typesDataUser & typesDatailsInfoUsers>


// Infomracion de originalidad de localidad
interface typesOriginAndLocation{
  name: string,
  url: string
}

// Informacion de los episodios
type typesEpisode = Array<string>

// Informacion de la carta
export interface typesDetailProducts{
  id: number,
  name: string,
  species: string,
  type: string,
  gender: string,
  origin: typesOriginAndLocation,
  location: typesOriginAndLocation,
  image: string,
  episode: typesEpisode
  url: string,
  created: string
}

// Array de la carta principal
export type typesProducts = Array<typesDetailProducts>


// Types estado de las estrellas de las calificaciones, indican y si eatan activas 
export interface typesStateStar {
  1: boolean
  2: boolean
  3: boolean
  4: boolean
  5: boolean
}

// Validad que cada estrella que porcentaja de una estrella tiene el numero
interface typesObjectNumbers {
  1: number,
  2: number,
  3: number,
  4: number,
  5: number,
}

// typos para las alertas 
export interface typesAlertState{
  state: boolean,
  title: string,
  text: string
}

// typos para las alertas con timempo
export interface typesNotificationStateWithTime extends typesAlertState{
  time: number
} 

// typo para el mensaje de las alertas
export interface typesMessageAlert{
  title: string,
  text: string
}



// typos para los contextos
export interface typesGrandingProvider {
  children: React.ReactNode 
}

export interface typesGrandingContext{
  alertState: typesAlertState
  handleAlertState: (state: boolean, title: string, text: string )=> void
  
  
  stateGranding: boolean
  handleClearAll: ()=> void
  initializeStateGranding: ()=> void
  
  
  notificationTimeState: typesNotificationStateWithTime
  triggerNotificationTimeout: (state: boolean, title: string, text: string , time: number)=> void

  stateLoginUser: boolean
  triggerStateLoginUser: (state: boolean)=> void

}



// Props de otro componentes

// props de ListUsersQualification.tsx
export interface typesPropsGrandingSystem {
  nameProduct: string
}

// Props de StarValueCalculate.tsx
export interface typesPropsStarValueCalculate{
  value: number 
}

// Props de GrandingSystem.tsx
interface typesPropsGrandingSystem {
    nameProduct: string
}

// Props de listUsersQualification.tsx
export interface typesPropslistUsersQualification {
  nameProduct: string,
  valueQualification: number  
  stateUser: boolean
}