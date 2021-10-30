import {stateType, combineActionTypes, types} from "./chatTypes";
import {Chat} from '../../types'

const initialState: stateType = {
  privateChats: [],
  groupChats: [],
  favoriteChats: [],
  activeChat: {} as  Chat,
  chatFormInputValue: '',
  isSending: false,
  gettedChats: false,
  messagesLimit: 30,
  messages: [],
  hasMoreMessages: true
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

    case types.SET_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.payload,
        messagesLimit: 30,
        hasMoreMessages: true
      }

    default: return state
  }
}