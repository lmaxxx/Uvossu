import {types} from './appTypes'
import {FormEvent} from 'react'
import {Dispatch} from 'redux'
import {User, ChatTypes, AsideActions} from '../../types'
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
  const ref = firestore.collection('chats').doc();
  const id = ref.id;
  const date = new Date()
  const currentTime = date.getTime()
  return async (dispatch: Dispatch) => {

    await firestore.collection("chats").doc(id).set({
      type: ChatTypes.PrivateChat,
      membersUid: [currentUser.uid, activeUser.uid],
      createdAt: currentTime,
      favoriteMembersUid: [],
      lastMessageTime: currentTime,
      lastMessage: {}
    })

    firestore.collection("chats").doc(id)
      .get()
      .then((doc: any) => {
        dispatch(setChatStoreField("activeChat", {...doc.data(), id}))
        dispatch(setAppStoreField("activeAction", AsideActions.PrivateChats))
        dispatch(setAppStoreField("activeUserUid", ''))
        dispatch(setAppStoreField("showFilteredUsers", false))
      })
  }
}