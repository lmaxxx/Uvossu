import {Chat, User} from '../../types'

export enum types {
  SET_CHAT_STORE_FILED = "SET_CHAT_STORE_FILED"
}

export interface stateType {
  privateChats: Chat[]
  groupChats: Chat[]
  favoriteChats: Chat[],
  activeUser: User
}

export type combineActionTypes = SET_CHAT_STORE_FILED

interface SET_CHAT_STORE_FILED {
  type: types.SET_CHAT_STORE_FILED
  payload: {
    filedName: string
    value: any
  }
}

