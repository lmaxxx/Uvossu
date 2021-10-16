import {stateType, combineActionTypes, types} from './appTypes'
import {User} from '../../types'

export const initialState: stateType = {
  currentUser: {} as User,
}

export default function app(state: stateType = initialState, action: combineActionTypes): stateType {
  const copyState = {...state} as any
  switch(action.type) {
    case types.SET_APP_STORE_FILED:      
      copyState[action.payload.filedName] = action.payload.value
      return copyState

    default: 
      return state
  }
}