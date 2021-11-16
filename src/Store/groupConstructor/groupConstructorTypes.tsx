export enum types {
  SET_GROUP_CONSTRUCTOR_STORE_FILED = "SET_GROUP_CONSTRUCTOR_STORE_FILED",
  ADD_USER_TO_CHAT = "ADD_USER_TO_CHAT",
  REMOVE_USER_FROM_CHAT = "REMOVE_USER_FROM_CHAT",
  CLEAR_GROUP_CONSTRUCTOR = "CLEAR_GROUP_CONSTRUCTOR"
}

export interface stateType {
  membersUid: string[],
  chatName: string,
  photoURL: string
}

export type combineActionTypes = SET_GROUP_CONSTRUCTOR_STORE_FILED | ADD_USER_TO_CHAT | REMOVE_USER_FROM_CHAT |
  CLEAR_GROUP_CONSTRUCTOR

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