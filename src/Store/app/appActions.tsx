import {types} from './appTypes'
import {Dispatch} from 'redux'
import {AsideActions, Message} from '../../types'
import {endRecording, setChatStoreField} from "../chat/chatActions";

export function setAppStoreField(filedName: string, value: any) {
  return {
    type: types.SET_APP_STORE_FILED,
    payload: {filedName, value}
  }
}

export function loadMoreUsers() {
  return {
    type: types.LOAD_MORE_USERS
  }
}

export function updateRenderedUsers() {
  return {
    type: types.UPDATE_RENDERED_USERS
  }
}

export function filterUsers(e: any) {
  return {
    type: types.FILTER_USERS,
    payload: e
  }
}

export function clearFilteredUsers() {
  return {
    type: types.CLEAR_FILTERED_USERS
  }
}

export function setActiveUserUid(uid: string | undefined) {
  return (dispatch: Dispatch) => {
    dispatch(setAppStoreField("activeUserUid", uid))
  }
}

export function setActiveAction(newAction: AsideActions) {
  return (dispatch: Dispatch) => {
    dispatch(setAppStoreField("activeAction", newAction))
    dispatch(setChatStoreField("chatsLimit", 20))
    dispatch(setAppStoreField("usersLimit", 20))
    dispatch(setChatStoreField("hasMoreChats", true))
    dispatch(setAppStoreField("hasMoreUsers", true))
    dispatch(setChatStoreField("gotChats", false))
    dispatch(setAppStoreField("gotUsers", false))
  }
}

export function openImageViewer(src: string) {
  return {
    type: types.OPEN_IMAGE_VIEWER,
    payload: src
  }
}

export function closeImageViewer() {
  return {
    type: types.CLOSE_IMAGE_VIEWER,
  }
}

export function setEmail(email: string) {
  return {
    type: types.SET_EMAIL,
    payload: email
  }
}

export function goBackToList() {
  return async (dispatch: any) => {
    await dispatch(endRecording(true))
    dispatch(setChatStoreField("activeChat", {}))
  }
}