import {stateType, combineActionTypes, types} from './appTypes'
import {User} from '../../types'

export const initialState: stateType = {
  currentUser: {} as User,
  users: [],
  renderedUsers: [],
  loadUsers: true,
  lastRenderedUserIndex: 0,
  usersRenderStep: 0
}

export default function app(state: stateType = initialState, action: combineActionTypes): stateType {
  const copyState = {...state} as any
  const copyRenderedUsers = [...state.renderedUsers]
  switch(action.type) {
    case types.SET_APP_STORE_FILED:      
      copyState[action.payload.filedName] = action.payload.value
      return copyState
    
    case types.LOAD_MORE_USERS:
      console.log("Load more")
      for(let i = state.lastRenderedUserIndex; i < state.lastRenderedUserIndex + state.usersRenderStep; i++) {
        if(copyRenderedUsers.length === state.users.length) {
          return {...state, renderedUsers: copyRenderedUsers, loadUsers: false, lastRenderedUserIndex: state.lastRenderedUserIndex + i}
        }
        copyRenderedUsers.push(state.users[i])
      }

      return {...state, renderedUsers: copyRenderedUsers, lastRenderedUserIndex: state.lastRenderedUserIndex + state.usersRenderStep}

    case types.UDPATE_RENDERED_USERS:
      const updatedRenderedUsers: User[] = []
      for(let i = 0; i < state.renderedUsers.length; i++) {
        updatedRenderedUsers.push(state.users[i])
      }

      return {...state, renderedUsers: updatedRenderedUsers}


    default:
      return state
  }
}