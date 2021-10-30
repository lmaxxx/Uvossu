import {types} from './chatTypes'
import {Dispatch} from "redux";
import {firestore} from'../../firebase'
import {Chat} from '../../types'
import {FormEvent} from 'react'

export function setChatStoreField(filedName: string, value: any) {
  return {
    type: types.SET_CHAT_STORE_FILED,
    payload: {filedName, value}
  }
}

export function sendMessage(
  e: FormEvent<HTMLFormElement>,
  activeChat: Chat,
  chatFormInputValue: string,
  playSound: () => void,
  uid: string | undefined,
) {
  e.preventDefault()
    return async (dispatch: Dispatch) => {
      if(chatFormInputValue) {
        dispatch(setChatStoreField("isSending", true))
        const date = new Date()
        await firestore.collection("chats")
          .doc(activeChat.id)
          .collection("messages")
          .add({
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

export function setActiveChat(chat: Chat) {
  return {
    type: types.SET_ACTIVE_CHAT,
    payload: chat
  }
}