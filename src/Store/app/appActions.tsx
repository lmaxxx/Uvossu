import {types} from './appTypes'
import {FormEvent} from 'react'
import {Dispatch} from 'redux'
import {User, ChatTypes} from '../../types'
import {firestore} from '../../firebase'
import {setChatStoreField} from "../chat/chatActions";

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

export function filterUsers(e: FormEvent<HTMLFormElement>) {
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

export function createChat(currentUser: User, activeUser: User) {
  return async (dispatch: Dispatch) => {
    await firestore.collection("chats").add({
      type: ChatTypes.PrivateChat,
      membersUid: [currentUser.uid, activeUser.uid],
      createdAt: new Date().getTime(),
      favoriteMembersUid: [],
      lastMessageTime: new Date().getTime()
    })

    dispatch(setChatStoreField("activeUser", activeUser))
  }
}