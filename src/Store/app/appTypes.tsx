import {AsideActions, User} from '../../types'
import {FormEvent} from 'react'

export enum types {
  SET_APP_STORE_FILED = "SET_APP_STORE_FILED",
  LOAD_MORE_USERS = "LOAD_MORE_USERS",
  UPDATE_RENDERED_USERS = "UPDATE_RENDERED_USERS",
  FILTER_USERS = "FILTER_USERS",
  CLEAR_FILTERED_USERS = "CLEAR_FILTERED_USERS",
  OPEN_IMAGE_VIEWER = "OPEN_IMAGE_VIEWER",
  CLOSE_IMAGE_VIEWER = "CLOSE_IMAGE_VIEWER"
}

export interface stateType {
  currentUser: User
  users: User[]
  usersObject: any
  hasMoreUsers: boolean
  activeAction: AsideActions
  filterUsersInputValue: string
  showFilteredUsers: boolean
  filterUsersQuery: string
  showBackdrop: boolean
  usersLimit: number
  gotUsers: boolean
  showImageViewer: boolean
  imageForView: string
}

export type combineActionTypes = SET_APP_STORE_FILED | LOAD_MORE_USERS |
  FILTER_USERS | CLEAR_FILTERED_USERS | OPEN_IMAGE_VIEWER | CLOSE_IMAGE_VIEWER

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

interface FILTER_USERS {
  type: types.FILTER_USERS,
  payload: FormEvent<HTMLFormElement>
}

interface CLEAR_FILTERED_USERS {
  type: types.CLEAR_FILTERED_USERS
}

interface OPEN_IMAGE_VIEWER {
  type: types.OPEN_IMAGE_VIEWER
  payload: string
}

interface CLOSE_IMAGE_VIEWER {
  type: types.CLOSE_IMAGE_VIEWER
}