import {types} from './chatTypes'
import {Dispatch} from "redux";
import {firestore} from'../../firebase'
import {AsideActions, Chat, User} from '../../types'
import {setAppStoreField} from "../app/appActions";

export function setChatStoreField(filedName: string, value: any) {
  return {
    type: types.SET_CHAT_STORE_FILED,
    payload: {filedName, value}
  }
}

export function sendMessage(
  e: any,
  activeChat: Chat,
  chatFormInputValue: string,
  playSound: () => void,
  uid: string | undefined,
) {
  e.preventDefault()
    return async (dispatch: Dispatch) => {
      if(chatFormInputValue && !/^\n+$/.test(chatFormInputValue)) {
        dispatch(setChatStoreField("isSending", true))
        const date = new Date()
        const message = {
          type: "text",
          value: chatFormInputValue,
          createdAt: date.getTime(),
          creatorUid: uid,
          date: {
            year: date.getFullYear(),
            day: date.getDate(),
            month: date.getMonth() + 1
          },
          time: {
            hour: date.getHours(),
            minute: date.getMinutes()
          }
        }
        await firestore.collection("chats")
          .doc(activeChat.id)
          .collection("messages")
          .add(message)

        await firestore.collection("chats").doc(activeChat.id).update({
          lastMessage: message,
          lastMessageTime: date.getTime()
        })

        dispatch(setChatStoreField("isSending", false))
        dispatch(setChatStoreField("chatFormInputValue", ""))
        playSound()
      }
    }
}

export function loadMessages() {
  return {
    type: types.LOAD_MESSAGES
  }
}

export function loadChats() {
  return {
    type: types.LOAD_CHATS
  }
}

export function setActiveChat(chat: Chat) {
  return {
    type: types.SET_ACTIVE_CHAT,
    payload: chat
  }
}

export function createChat(currentUser: User, activeUser: User, chats: Chat[]) {
  const ref = firestore.collection('chats').doc();
  const id = ref.id;
  const date = new Date()
  return async (dispatch: Dispatch) => {
    
    chats = chats.filter((chat) => (
      !chat.isGroup &&
      chat.membersUid.includes(currentUser.uid as string) &&
      chat.membersUid.includes(activeUser.uid as string)
    ))

    if(chats.length === 1) {
      dispatch(setChatStoreField("activeChat", chats[0]))
      dispatch(setAppStoreField("activeAction", AsideActions.Chats))
      dispatch(setAppStoreField("activeUserUid", ''))
      dispatch(setAppStoreField("showFilteredUsers", false))
    } else {
      dispatch(setAppStoreField("showBackdrop", true))
      await firestore.collection("chats").doc(id).set({
        membersUid: [currentUser.uid, activeUser.uid],
        createdAt: date.getTime(),
        favoriteMembersUid: [],
        lastMessageTime: date.getTime(),
        lastMessage: "",
        isGroup: false
      })

      firestore.collection("chats").doc(id)
        .get()
        .then((doc: any) => {
          dispatch(setChatStoreField("activeChat", {...doc.data(), id}))
          dispatch(setAppStoreField("activeAction", AsideActions.Chats))
          dispatch(setAppStoreField("activeUserUid", ''))
          dispatch(setAppStoreField("showFilteredUsers", false))
          dispatch(setAppStoreField("showBackdrop", false))
        })
    }
  }
}

export function addToFavorite(currentUserUid: string, chat: Chat) {
  const chatCopy = {...chat}
  chatCopy.favoriteMembersUid.push(currentUserUid)

  return async (dispatch: Dispatch) => {
    dispatch(setAppStoreField("showBackdrop", true))

    await firestore.collection("chats").doc(chat.id).update(chatCopy)

    dispatch(setChatStoreField("activeChat", chatCopy))
    dispatch(setAppStoreField("showBackdrop", false))
  }
}

export function removeFromFavorite(currentUserUid: string, chat: Chat) {
  const chatCopy = {...chat}
  const currentUserUidIndex = chatCopy.favoriteMembersUid.indexOf(currentUserUid)
  chatCopy.favoriteMembersUid.splice(currentUserUidIndex, 1)


  return async (dispatch: Dispatch) => {
    dispatch(setAppStoreField("showBackdrop", true))

    await firestore.collection("chats").doc(chat.id).update(chatCopy)

    dispatch(setChatStoreField("activeChat", chatCopy))
    dispatch(setAppStoreField("showBackdrop", false))
  }
}

export function deleteChat(chatId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(setAppStoreField("showBackdrop", true))

    await firestore.collection("chats").doc(chatId).delete()

    dispatch(setChatStoreField("activeChat", {}))
    dispatch(setAppStoreField("showBackdrop", false))
  }
}