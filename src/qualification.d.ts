export type typesValueHandle = 1 | 2 | 3 | 4 | 5 ;

export interface typesDataUser {
    username: string,
    // product: string, 
    qualification: number,
    time: string,
  }


export interface typesDatailsInfoUsers {
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
  id: number
  name: string,
  description: string,
  price: number
}

export type typesProducts = Array<typesDetailProducts>