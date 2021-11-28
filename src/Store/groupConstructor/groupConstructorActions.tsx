import {types} from "../groupConstructor/groupConstructorTypes";
import {Dispatch} from "redux";
import {firestore, storage} from "../../firebase";
import {setAppStoreField} from "../app/appActions";
import {AsideActions, Chat, User, Message} from "../../types";
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

export function createGroup(
  currentUser: User,
  membersUid: string[],
  chatName: string,
  photoURL: string,
  photoFile: any
) {
  const ref = firestore.collection('chats').doc()
  const id = ref.id
  const date = new Date()
  let fileUrl: string = ''
  return async (dispatch: Dispatch) => {
    dispatch(setAppStoreField("showBackdrop", true))

    const group = {
      membersUid: membersUid,
      createdAt: date.getTime(),
      favoriteMembersUid: [],
      lastMessageTime: date.getTime(),
      lastMessage: {} as Message,
      isGroup: true,
      photoURL: photoURL,
      name: chatName,
      ownerUid: currentUser.uid,
      messagesCount: 0,
      id: id,
      readLastMessageMembersUid: [currentUser.uid] as string[]
    }

    if(photoFile.name) {
      const fileRef = storage.ref().child("avatars/" + photoFile.name)
      await fileRef.put(photoFile)
      fileUrl = await fileRef.getDownloadURL()
      group.photoURL = fileUrl
    }

    await firestore.collection("chats").doc(id).set(group)
    await sendAlertMessage(`${currentUser.displayName} created the group "${chatName}"`,
      group,
      currentUser.uid as string)

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
    await sendAlertMessage(`${user.displayName} left the chat`, group, user.uid as string)

    if(group.membersUid.length > 1) {
      dispatch(setChatStoreField("activeChat", {}))
      dispatch(setAppStoreField("showBackdrop", false))
    }
  }
}

export function saveGroupConstructor(
  group: Chat,
  membersUid: string[],
  chatName: string,
  photoURL: string,
  photoFile: any,
  currentUser: User,
  usersObject: any,
) {
  return async (dispatch: Dispatch) => {
    dispatch(setAppStoreField("showBackdrop", true))
    let fileUrl: string = ''
    const groupCopy = {...group}

    groupCopy.name = chatName
    groupCopy.photoURL = photoURL
    groupCopy.membersUid = membersUid

    if(photoFile.name) {
      const fileRef = storage.ref().child("avatars/" + photoFile.name)
      await fileRef.put(photoFile)
      fileUrl = await fileRef.getDownloadURL()
      groupCopy.photoURL = fileUrl
    }

    await firestore.collection("chats").doc(group.id).update(groupCopy)

    if(group.name?.trim() !== groupCopy.name?.trim()) {
      await sendAlertMessage(
        `${currentUser.displayName} changed group name to "${groupCopy.name}"`,
        groupCopy,
        currentUser.uid as string
      )
    }

    if(group.photoURL !== groupCopy.photoURL) {
      await sendAlertMessage(
        `${currentUser.displayName} changed group avatar`,
        groupCopy,
        currentUser.uid as string
      )
    }

    dispatch(setAppStoreField("showFilteredUsers", false))
    dispatch(setAppStoreField("showBackdrop", false))

    const newMembersUid = groupCopy.membersUid.filter((uid: string) => !group.membersUid.includes(uid))
    const removedMembersUid = group.membersUid.filter((uid: string) => !groupCopy.membersUid.includes(uid))

    for(const uid of newMembersUid) {
      await sendAlertMessage(
        `${currentUser.displayName} invited ${usersObject[uid].displayName}`,
        groupCopy,
        currentUser.uid as string
      )
    }

    for(const uid of removedMembersUid) {
      await sendAlertMessage(
        `${currentUser.displayName} removed ${usersObject[uid].displayName}`,
        groupCopy,
        currentUser.uid as string
      )
    }
  }
}

export function deleteGroupAvatar() {
  return {
    type: types.DELETE_GROUP_AVATAR
  }
}

export function setGroupAvatar(event: any) {
  return {
    type: types.SET_GROUP_AVATAR,
    payload: event
  }
}