import {Chat, Message} from '../../types'

export enum types {
  SET_CHAT_STORE_FILED = "SET_CHAT_STORE_FILED",
  LOAD_MESSAGES = "LOAD_MESSAGES",
  SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT",
  LOAD_CHATS = "LOAD_CHATS"
}

export interface stateType {
  chats: Chat[]
  chatsLimit: number
  hasMoreChats: boolean
  activeChat: Chat
  chatFormInputValue: string
  gotChats: boolean
  isSending: boolean
  messagesLimit: number
  messages: Message[]
  hasMoreMessages: boolean
}

export type combineActionTypes = SET_CHAT_STORE_FILED | LOAD_MESSAGES | SET_ACTIVE_CHAT | LOAD_CHATS

interface SET_CHAT_STORE_FILED {
  type: types.SET_CHAT_STORE_FILED
  payload: {
    filedName: string
    value: any
  }
}

interface LOAD_MESSAGES {
  type: types.LOAD_MESSAGES
}

interface SET_ACTIVE_CHAT {
  type: types.SET_ACTIVE_CHAT
  payload: Chat
}

interface LOAD_CHATS {
  type: types.LOAD_CHATS
}