import {Chat, Message} from '../../types'

export enum types {
  SET_CHAT_STORE_FILED = "SET_CHAT_STORE_FILED",
  LOAD_MESSAGES = "LOAD_MESSAGES"
}

export interface stateType {
  privateChats: Chat[]
  groupChats: Chat[]
  favoriteChats: Chat[]
  activeChat: Chat
  chatFormInputValue: string
  gettedChats: boolean
  isSending: boolean
  messagesLimit: number
  messages: Message[]
}

export type combineActionTypes = SET_CHAT_STORE_FILED | LOAD_MESSAGES

interface SET_CHAT_STORE_FILED {
  type: types.SET_CHAT_STORE_FILED
  payload: {
    filedName: string
    value: any
  }
}

interface LOAD_MESSAGES{
  type: types.LOAD_MESSAGES
}

