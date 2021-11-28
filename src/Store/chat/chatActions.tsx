import {types} from './chatTypes'
import {Dispatch} from "redux";
import {firestore, storage} from '../../firebase'
import {AsideActions, Chat, User} from '../../types'
import {setAppStoreField} from "../app/appActions";
import {MessageTypes, Message} from '../../types'
import axios from "axios";

export function setChatStoreField(filedName: string, value: any) {
  return {
    type: types.SET_CHAT_STORE_FILED,
    payload: {filedName, value}
  }
}

export function sendTextMessage(
  e: any,
  activeChat: Chat,
  chatFormInputValue: string,
  playSound: () => void,
  uid: string | undefined,
  ref: any
) {
  e.preventDefault()
    return async (dispatch: Dispatch) => {
      if(chatFormInputValue && !/^\n+$/.test(chatFormInputValue)) {
        dispatch(setChatStoreField("isSending", true))
        dispatch(setChatStoreField("chatFormInputValue", ""))
        playSound()
        const date = new Date()

        chatFormInputValue = chatFormInputValue.replaceAll("\n", "\\n")

        const message = {
          type: MessageTypes.TEXT,
          value: chatFormInputValue,
          createdAt: date.getTime(),
          creatorUid: uid as string,
          date: {
            year: date.getFullYear(),
            day: date.getDate(),
            month: date.getMonth() + 1
          },
          time: {
            hour: date.getHours(),
            minute: date.getMinutes()
          },
          id: ''
        }
        await firestore.collection("chats")
          .doc(activeChat.id)
          .collection("messages")
          .add(message)

        const copyChat = {...activeChat}
        copyChat.lastMessage = message
        copyChat.lastMessageTime = date.getTime()
        copyChat.messagesCount++
        copyChat.readLastMessageMembersUid = [uid as string]

        await firestore.collection("chats").doc(activeChat.id).update(copyChat)

        dispatch(setChatStoreField("isSending", false))
        dispatch(setChatStoreField("hasMoreMessages", true))
        ref.current.focus()
      }
    }
}

export async function sendAlertMessage(value: string, activeChat: Chat, uid: string) {
  const date = new Date()
  const message = {
    type: MessageTypes.ALERT,
    value: value,
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
    },
    id: '',
  }
  await firestore.collection("chats")
    .doc(activeChat.id)
    .collection("messages")
    .add(message)

  const copyChat = {...activeChat}
  copyChat.lastMessage = message
  copyChat.lastMessageTime = date.getTime()
  copyChat.messagesCount++
  copyChat.readLastMessageMembersUid = [uid]

  await firestore.collection("chats").doc(activeChat.id).update(copyChat)
}

export async function sendImageMessage(file: File, activeChat: Chat, uid: string) {
    const fileRef = storage.ref().child("images/" + file.name)
    await fileRef.put(file)
    const fileUrl = await fileRef.getDownloadURL()
    const date = new Date()

    const message = {
      type: MessageTypes.IMAGE,
      value: "Photo",
      url: fileUrl,
      fileName: file.name,
      fileExtension: file.type.slice(file.type.indexOf("/") + 1),
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
      },
      id: ''
    }

    await firestore.collection("chats")
      .doc(activeChat.id)
      .collection("messages")
      .add(message)

  const copyChat = {...activeChat}
  copyChat.lastMessage = message
  copyChat.lastMessageTime = date.getTime()
  copyChat.messagesCount++
  copyChat.readLastMessageMembersUid = [uid as string]

  await firestore.collection("chats").doc(activeChat.id).update(copyChat)
}

export async function sendVideoMessage(file: File, activeChat: Chat, uid: string) {
  const fileRef = storage.ref().child("videos/" + file.name)
  await fileRef.put(file)
  const fileUrl = await fileRef.getDownloadURL()
  const date = new Date()

  const message = {
    type: MessageTypes.VIDEO,
    value: "Video",
    url: fileUrl,
    fileName: file.name,
    fileExtension: file.type.slice(file.type.indexOf("/") + 1),
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
    },
    id: ''
  }

  await firestore.collection("chats")
    .doc(activeChat.id)
    .collection("messages")
    .add(message)

  const copyChat = {...activeChat}
  copyChat.lastMessage = message
  copyChat.lastMessageTime = date.getTime()
  copyChat.messagesCount++
  copyChat.readLastMessageMembersUid = [uid as string]

  await firestore.collection("chats").doc(activeChat.id).update(copyChat)
}

export async function sendFileMessage(file: File, activeChat: Chat, uid: string) {
  const fileRef = storage.ref().child("files/" + file.name)
  await fileRef.put(file)
  const fileUrl = await fileRef.getDownloadURL()
  const date = new Date()

  const message = {
    type: MessageTypes.FILE,
    value: file.name,
    url: fileUrl,
    fileName: file.name,
    fileExtension: file.type.slice(file.type.indexOf("/") + 1),
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
    },
    id: ''
  }

  await firestore.collection("chats")
    .doc(activeChat.id)
    .collection("messages")
    .add(message)

  const copyChat = {...activeChat}
  copyChat.lastMessage = message
  copyChat.lastMessageTime = date.getTime()
  copyChat.messagesCount++
  copyChat.readLastMessageMembersUid = [uid as string]

  await firestore.collection("chats").doc(activeChat.id).update(copyChat)
}

export function sendFiles(files: File[], activeChat: Chat, uid: string) {
  return async (dispatch: Dispatch) => {
    dispatch(closeFilesModal())
    dispatch(setChatStoreField("openSendingFilesSnackBar", true))

    for(let i = 0; i < files.length; i++) {
      if(files[i].type.startsWith("image/")) {
        await sendImageMessage(files[i], activeChat, uid)
      }
      else if(files[i].type.startsWith("video/")) {
        await sendVideoMessage(files[i], activeChat, uid)
      }
      else await sendFileMessage(files[i], activeChat, uid)
    }

    dispatch(setChatStoreField("openSendingFilesSnackBar", false))
  }
}

export function pickFiles(e: any, files?: File[]) {
  if(files?.length! > 0) {
    return {
      type: types.PICK_FILES,
      payload: files
    }
  }

  return {
    type: types.PICK_FILES,
    payload: e.target.files
  }
}

export function deleteFile(index: number) {
  return {
    type: types.DELETE_FILE,
    payload: index
  }
}

export function openFilesModal() {
  return {
    type: types.OPEN_FILES_MODAL
  }
}

export function closeFilesModal() {
  return {
    type: types.CLOSE_FILES_MODAL
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
        isGroup: false,
        messagesCount: 0,
        readLastMessageMembersUid: [currentUser.uid]
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

export function deleteChat(chat: Chat, uid: string) {
  return async (dispatch: Dispatch) => {
    dispatch(setAppStoreField("showBackdrop", true))
    const userIndex = chat.membersUid.indexOf(uid)
    chat.membersUid.splice(userIndex, 1)

    await firestore.collection("chats").doc(chat.id).update(chat)
  }
}

export function downloadFile(url: string, fileName: string, fileExtension: string) {
  return (dispatch: Dispatch) => {
    dispatch(setAppStoreField("showBackdrop", true))
    let downloadAttrValue = fileName

    if(!fileName.includes(".")) {
      downloadAttrValue = fileName + fileExtension
    }

    axios({
      url: url,
      method: 'GET',
      responseType: 'blob'
    })
      .then((response) => {
        const url = window.URL
          .createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', downloadAttrValue);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        dispatch(setAppStoreField("showBackdrop", false))
      })
  }
}

export function copyTextToClipBoard(text: string) {
  navigator.clipboard.writeText(text);
}

export function deleteMessage(
  messageId: string,
  chat: Chat,
  closeContextMenu: () => void,
  previousMessage: Message,
  messageIndex: number
) {
  return async (dispatch: Dispatch) => {
    closeContextMenu()
    dispatch(setAppStoreField("showBackdrop", true))

    await firestore.collection("chats")
      .doc(chat.id)
      .collection("messages")
      .doc(messageId)
      .delete()

    if(messageIndex === 0) {
      const copyChat = {...chat}
      copyChat.messagesCount -= 1

      if(previousMessage) {
        copyChat.lastMessage = previousMessage
      } else copyChat.lastMessage = {} as Message

      await firestore.collection("chats").doc(chat.id).update(copyChat)
    }

    dispatch(setAppStoreField("showBackdrop", false))
  }
}

export function setChatObject(chats: Chat[]) {
  return {
    type: types.SET_CHATS_OBJECT,
    payload: chats
  }
}

export function setChats(chats: Chat[]) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: types.SET_CHATS,
      payload: chats
    })

    dispatch(setChatObject(chats))
  }

}

export function checkNewMessages(
  uncontrolledChats: Chat[],
  chatObject: any,
  usersObject: any,
  activeChatId: string,
  currentUserUid: string,
  playSound: () => void
) {
  uncontrolledChats.forEach((chat) => {
    if(
      chatObject[chat.id as string] &&
      chat.messagesCount > chatObject[chat.id as string].messagesCount &&
      chat.lastMessage.creatorUid !== currentUserUid
    ) {
      switch (Notification.permission) {
        case "granted":
          if(document.hidden || activeChatId !== chat.id) {
            new Notification("Uvossu", {
              body:  `${usersObject[chat.lastMessage.creatorUid].displayName}: ${chat.lastMessage.value.replaceAll("\\n", "\n")}`,
              icon: usersObject[chat.lastMessage.creatorUid].photoURL
            })
          }
          return

        case "default":
        case "denied":
          if(document.hidden || activeChatId !== chat.id) {
            playSound()
          }
      }
    }
  })
}

export function readNewMessages(chat: Chat, currentUserUid: string) {
  return async (_: Dispatch) => {
    const copyChat = {...chat}
    copyChat.readLastMessageMembersUid.push(currentUserUid)

    firestore.collection("chats").doc(chat.id).update(copyChat)
  }
}

export function forwardMessage(chat: Chat, message: Message, currentUserUid: string) {
  return async (dispatch: Dispatch) => {
    dispatch(setAppStoreField("showBackdrop", true))
    const date = new Date()
    const copyMessage = {...message}
    const copyChat = {...chat}

    copyMessage.creatorUid = currentUserUid
    copyMessage.createdAt = date.getTime()
    copyMessage.date = {
      year: date.getFullYear(),
        day: date.getDate(),
        month: date.getMonth() + 1
    }
      copyMessage.time = {
      hour: date.getHours(),
        minute: date.getMinutes()
    }
    copyMessage.id = ''


    await firestore.collection("chats")
      .doc(chat.id)
      .collection("messages")
      .add(copyMessage)


    copyChat.lastMessage = copyMessage
    copyChat.lastMessageTime = date.getTime()
    copyChat.messagesCount++
    copyChat.readLastMessageMembersUid = [currentUserUid]

    await firestore.collection("chats").doc(chat.id).update(copyChat)
    dispatch(setChatStoreField("activeChat", copyChat))
    dispatch(setAppStoreField("showBackdrop", false))
  }
}
