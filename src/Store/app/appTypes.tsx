import {User} from '../../types'

export enum types {
  SET_APP_STORE_FILED = "SET_APP_STORE_FILED",
  LOAD_MORE_USERS = "LOAD_MORE_USERS",
  UDPATE_RENDERED_USERS = "UDPATE_RENDERED_USERS",
}

export interface stateType {
  currentUser: User
  users: User[]
  renderedUsers: User[]
  loadUsers: boolean
  lastRenderedUserIndex: number
  usersRenderStep: number
}

export type combineActionTypes = SET_APP_STORE_FILED | LOAD_MORE_USERS | UDPATE_RENDERED_USERS

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
interface UDPATE_RENDERED_USERS {
  type: types.UDPATE_RENDERED_USERS
}