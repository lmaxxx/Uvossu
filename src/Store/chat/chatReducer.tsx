import {stateType, combineActionTypes, types} from "./chatTypes";
import {Chat} from '../../types'

const initialState: stateType = {
  chats: [],
  chatsLimit: 20,
  hasMoreChats: true,
  activeChat: {} as  Chat,
  chatFormInputValue: '',
  isSending: false,
  gotChats: false,
  messagesLimit: 30,
  messages: [],
  hasMoreMessages: true,
  gotMessages: false,
  files: [],
  isOpenFilesModal: false,
  openSendingFilesSnackBar: false,
  chatsObject: {},
}

export default function chat(state = initialState, action: combineActionTypes): stateType {
  const copyState = {...state} as any
  switch(action.type) {
    case types.SET_CHAT_STORE_FILED:
      copyState[action.payload.filedName] = action.payload.value
      return copyState

    case types.LOAD_MESSAGES:
      return {
        ...state,
        messagesLimit: state.messagesLimit + 30
      }

    case types.LOAD_CHATS:
      return {
        ...state,
        chatsLimit: state.chatsLimit + 20
      }

    case types.SET_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.payload,
        messagesLimit: 30,
        hasMoreMessages: true,
        gotMessages: false,
        chatFormInputValue: ''
      }

    case types.PICK_FILES:
      return {
        ...state,
        files: Array.from(action.payload)
      }

    case types.DELETE_FILE:
      if(state.files.length === 1) {
        return {
          ...state,
          files: [],
          isOpenFilesModal: false
        }
      }

      return {
        ...state,
        files: state.files.filter((_, index) => index !== action.payload)
      }

    case types.OPEN_FILES_MODAL:
      return {
        ...state,
        isOpenFilesModal: true
      }

    case types.CLOSE_FILES_MODAL:
      return {
        ...state,
        isOpenFilesModal: false,
        files: []
      }

    case types.SET_CHATS_OBJECT:
      const chatsObject: any = {}

      for(const chat of action.payload) {
        chatsObject[chat.id as string] = chat
      }

      return {
        ...state,
        chatsObject: chatsObject
      }

    case types.SET_CHATS:
      return {
        ...state,
        chats: action.payload
      }

    default: return state
  }
}