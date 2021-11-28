import {Chat, Message} from '../../types'

export enum types {
  SET_CHAT_STORE_FILED = "SET_CHAT_STORE_FILED",
  LOAD_MESSAGES = "LOAD_MESSAGES",
  SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT",
  LOAD_CHATS = "LOAD_CHATS",
  PICK_FILES = "PICK_FILES",
  DELETE_FILE = "DELETE_FILE",
  OPEN_FILES_MODAL = "OPEN_FILES_MODAL",
  CLOSE_FILES_MODAL = "CLOSE_FILES_MODAL",
  SET_CHATS_OBJECT = "SET_CHATS_OBJECT",
  SET_CHATS = "SET_CHATS",
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
  gotMessages: boolean
  files: File[]
  isOpenFilesModal: boolean
  openSendingFilesSnackBar: boolean
  chatsObject: any
}

export type combineActionTypes = SET_CHAT_STORE_FILED | LOAD_MESSAGES | SET_ACTIVE_CHAT | LOAD_CHATS |
  PICK_FILES | DELETE_FILE | OPEN_FILES_MODAL | CLOSE_FILES_MODAL | SET_CHATS_OBJECT | SET_CHATS

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

interface PICK_FILES {
  type: types.PICK_FILES
  payload: any
}

interface DELETE_FILE {
  type: types.DELETE_FILE
  payload: number
}

interface CLOSE_FILES_MODAL {
  type: types.CLOSE_FILES_MODAL
}

interface OPEN_FILES_MODAL {
  type: types.OPEN_FILES_MODAL
}

interface SET_CHATS_OBJECT {
  type: types.SET_CHATS_OBJECT,
  payload: Chat[]
}

interface SET_CHATS {
  type: types.SET_CHATS
  payload: Chat[]
}