import {stateType, combineActionTypes, types} from "./chatTypes";
import {User} from '../../types'

const initialState: stateType = {
  privateChats: [],
  groupChats: [],
  favoriteChats: [],
  activeUser: {} as User
}

export default function chat(state = initialState, action: combineActionTypes): stateType {
  const copyState = {...state} as any
  switch(action.type) {
    case types.SET_CHAT_STORE_FILED:
      copyState[action.payload.filedName] = action.payload.value
      return copyState


    default: return state
  }
}