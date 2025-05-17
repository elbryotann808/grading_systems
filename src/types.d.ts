export type typesValueHandle = 1 | 2 | 3 | 4 | 5 ;

export interface typesDataUser {
    username: string,
    qualification: number,
    time: string,
  }


export interface typesDatailsInfoUsers {
  icon: string,
  id: number,
  name: string,
  username: string,
  age: number,
}

export type typesInfoUsers = Array<typesDatailsInfoUsers>


export interface typesPropsGrandingSystem {
    nameProduct: string
}


export type typesActivate = boolean



export interface typesDetailProducts{
  id: number,
  name: string,
  description: string,
  price: number
}

export type typesProducts = Array<typesDetailProducts>


export interface typesStateStar {
  1: boolean
  2: boolean
  3: boolean
  4: boolean
  5: boolean
}




// TYPES CONTEXT
export interface typesGrandingProvider {
  children: React.ReactNode 
}

export interface typesAlertState{
  state: boolean,
  text: string
}

export interface typesGrandingContext{
  alertState: typesAlertState
  handleAlertState: (state: boolean, text: string)=> void
}

