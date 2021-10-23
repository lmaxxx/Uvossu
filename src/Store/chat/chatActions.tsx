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
        await firestore.collection("chats")
          .doc(activeChat.id)
          .collection("messages")
          .add({
            type: "text",
            value: chatFormInputValue,
            createdAt: new Date().getTime(),
            creatorUid: uid
          })
        dispatch(setChatStoreField("isSending", false))
        dispatch(setChatStoreField("chatFormInputValue", ""))
        playSound()
      }
    }
}