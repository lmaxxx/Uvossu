import {User} from '../../types'

export enum types {
  SET_APP_STORE_FILED = "SET_APP_STORE_FILED",
  LOAD_MORE_USERS = "LOAD_MORE_USERS"
}

export interface stateType {
  currentUser: User
  users: User[],
  renderedUsers: User[],
}

export type combineActionTypes = SET_APP_STORE_FILED | LOAD_MORE_USERS

interface SET_APP_STORE_FILED {
  type: types.SET_APP_STORE_FILED
  payload: {
    filedName: string
    value: any
  }
}

interface LOAD_MORE_USERS {
  type: types.LOAD_MORE_USERS
}
