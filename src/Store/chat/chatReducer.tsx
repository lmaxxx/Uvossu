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
  gotMessages: false
}

export default function chat(state = initialState, action: combineActionTypes): stateType {
  const copyState = {...state} as any
  const copyMessages = [...state.messages]
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

    default: return state
  }
}