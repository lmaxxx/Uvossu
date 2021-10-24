import {AsideActions, User} from '../../types'
import {FormEvent} from 'react'

export enum types {
  SET_APP_STORE_FILED = "SET_APP_STORE_FILED",
  LOAD_MORE_USERS = "LOAD_MORE_USERS",
  UPDATE_RENDERED_USERS = "UPDATE_RENDERED_USERS",
  FILTER_USERS = "FILTER_USERS",
  CLEAR_FILTERED_USERS = "CLEAR_FILTERED_USERS"
}

export interface stateType {
  currentUser: User
  users: User[]
  usersObject: any
  renderedUsers: User[]
  loadUsers: boolean
  lastRenderedUserIndex: number
  usersRenderStep: number
  activeAction: AsideActions
  filteredUsers: User[]
  filterUsersInputValue: string
  showFilteredUsers: boolean
  filterUsersQuery: string
  activeUserUid: string
  wrapperHeight: number
}

export type combineActionTypes = SET_APP_STORE_FILED | LOAD_MORE_USERS | UPDATE_RENDERED_USERS | FILTER_USERS | CLEAR_FILTERED_USERS

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

interface UPDATE_RENDERED_USERS {
  type: types.UPDATE_RENDERED_USERS
}

interface FILTER_USERS {
  type: types.FILTER_USERS,
  payload: FormEvent<HTMLFormElement>
}

interface CLEAR_FILTERED_USERS {
  type: types.CLEAR_FILTERED_USERS
}
