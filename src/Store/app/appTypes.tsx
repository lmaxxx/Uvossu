import {User} from '../../types'

export enum types {
  SET_APP_STORE_FILED = "SET_APP_STORE_FILED",
}

export interface stateType {
  currentUser: User
}

export type combineActionTypes = SET_APP_STORE_FILED

interface SET_APP_STORE_FILED {
  type: types.SET_APP_STORE_FILED
  payload: {
    filedName: string
    value: any
  }
}

