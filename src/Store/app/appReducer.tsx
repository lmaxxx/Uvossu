import {stateType, combineActionTypes, types} from './appTypes'
import {User} from '../../types'

export const initialState: stateType = {
  currentUser: {} as User,
  users: [],
  renderedUsers: [],
}

export default function app(state: stateType = initialState, action: combineActionTypes): stateType {
  const copyState = {...state} as any
  const copyRenderedUsers = {...state.renderedUsers}
  switch(action.type) {
    case types.SET_APP_STORE_FILED:      
      copyState[action.payload.filedName] = action.payload.value
      return copyState
    
    case types.LOAD_MORE_USERS:
      const startIndex = state.renderedUsers.length - 1 || 0

      for(let i = startIndex; i <= startIndex + 4; i++) {
        copyRenderedUsers.push(state.users[i])
      }

      return {...state, renderedUsers: copyRenderedUsers}
    default: 
      return state
  }
}