import {Chat} from '../../types'

export enum types {
  SET_GROUP_CONSTRUCTOR_STORE_FILED = "SET_GROUP_CONSTRUCTOR_STORE_FILED",
  ADD_USER_TO_CHAT = "ADD_USER_TO_CHAT",
  REMOVE_USER_FROM_CHAT = "REMOVE_USER_FROM_CHAT",
  CLEAR_GROUP_CONSTRUCTOR = "CLEAR_GROUP_CONSTRUCTOR",
  SET_GROUP_DATA = "SET_GROUP_DATA",
  DELETE_GROUP_AVATAR = "DELETE_GROUP_AVATAR",
  SET_GROUP_AVATAR = "SET_GROUP_AVATAR"
}

export interface stateType {
  membersUid: string[],
  chatName: string,
  photoURL: string
  ownerUid: string
  nextOwnerUid: string
  avatarFile: any
}

export type combineActionTypes = SET_GROUP_CONSTRUCTOR_STORE_FILED | ADD_USER_TO_CHAT | REMOVE_USER_FROM_CHAT |
  CLEAR_GROUP_CONSTRUCTOR | SET_GROUP_DATA | DELETE_GROUP_AVATAR | SET_GROUP_AVATAR

interface SET_GROUP_CONSTRUCTOR_STORE_FILED {
  type: types.SET_GROUP_CONSTRUCTOR_STORE_FILED
  payload: {
    filedName: string
    value: any
  }
}

interface ADD_USER_TO_CHAT {
  type: types.ADD_USER_TO_CHAT
  payload: string
}

interface REMOVE_USER_FROM_CHAT {
  type: types.REMOVE_USER_FROM_CHAT
  payload: string
}

interface CLEAR_GROUP_CONSTRUCTOR {
  type: types.CLEAR_GROUP_CONSTRUCTOR
  payload: string
}

interface SET_GROUP_DATA {
  type: types.SET_GROUP_DATA
  payload: {activeChat: Chat,  currentUserUid: string}
}

interface DELETE_GROUP_AVATAR {
  type: types.DELETE_GROUP_AVATAR
}

interface SET_GROUP_AVATAR {
  type: types.SET_GROUP_AVATAR
  payload: any
}