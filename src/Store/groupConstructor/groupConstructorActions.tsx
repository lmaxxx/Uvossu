import {types} from "../groupConstructor/groupConstructorTypes";
import {Dispatch} from "redux";
import {firestore} from "../../firebase";
import {setAppStoreField} from "../app/appActions";
import {AsideActions, Chat, User} from "../../types";
import {setChatStoreField, sendAlertMessage} from "../chat/chatActions";


export function setGroupConstructorStoreField(filedName: string, value: any) {
  return {
    type: types.SET_GROUP_CONSTRUCTOR_STORE_FILED,
    payload: {filedName, value}
  }
}

export function addUserToChat(uid: string) {
  return {
    type: types.ADD_USER_TO_CHAT,
    payload: uid
  }
}

export function removeUserFromChat(uid: string) {
  return {
    type: types.REMOVE_USER_FROM_CHAT,
    payload: uid
  }
}

export function clearGroupConstructor(uid: string) {
  return {
    type: types.CLEAR_GROUP_CONSTRUCTOR,
    payload: uid
  }
}

export function setGroupData(activeChat: Chat, currentUserUid: string) {
  return {
    type: types.SET_GROUP_DATA,
    payload: {activeChat, currentUserUid}
  }
}

export function createGroup(currentUser: User, membersUid: string[], chatName: string, photoURL: string) {
  const ref = firestore.collection('chats').doc()
  const id = ref.id
  const date = new Date()
  return async (dispatch: Dispatch) => {
    dispatch(setAppStoreField("showBackdrop", true))
    await firestore.collection("chats").doc(id).set({
      membersUid: membersUid,
      createdAt: date.getTime(),
      favoriteMembersUid: [],
      lastMessageTime: date.getTime(),
      lastMessage: "",
      isGroup: true,
      photoURL: photoURL,
      name: chatName,
      ownerUid: currentUser.uid
    })

    await sendAlertMessage(`${currentUser.displayName} created the group "${chatName}"`, id)

    firestore.collection("chats").doc(id).get()
      .then((doc: any) => {
        dispatch(setChatStoreField("activeChat", {...doc.data(), id}))
        dispatch(setAppStoreField("activeAction", AsideActions.Chats))
        dispatch(setAppStoreField("activeUserUid", ''))
        dispatch(setAppStoreField("showFilteredUsers", false))
        dispatch(setAppStoreField("showBackdrop", false))
      })
  }
}

export function leaveFromGroup(group: Chat, user: User, nextOwnerUid?: string) {
  return async (dispatch: Dispatch) => {
    dispatch(setAppStoreField("showBackdrop", true))
    const userMembersUidIndex = group.membersUid.indexOf(user.uid as string)
    const userFavoritesUidIndex = group.membersUid.indexOf(user.uid as string)
    group.membersUid.splice(userMembersUidIndex, 1)
    group.favoriteMembersUid.splice(userFavoritesUidIndex, 1)

    if(nextOwnerUid) {
      group.ownerUid = nextOwnerUid
    }

    await firestore.collection("chats").doc(group.id).update(group)
    await sendAlertMessage(`${user.displayName} left the chat`, group.id as string)

    if(group.membersUid.length > 1) {
      dispatch(setChatStoreField("activeChat", {}))
      dispatch(setAppStoreField("showBackdrop", false))
    }
  }
}

export function saveGroupConstructor(groupId: string, membersUid: string[], chatName: string, photoURL: string) {
  return async (dispatch: Dispatch) => {
    dispatch(setAppStoreField("showBackdrop", true))
    await firestore.collection("chats").doc(groupId).update({
      name: chatName,
      photoURL: photoURL,
      membersUid: membersUid
    })
    dispatch(setAppStoreField("showFilteredUsers", false))
    dispatch(setAppStoreField("showBackdrop", false))
  }
}