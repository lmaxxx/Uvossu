import {stateType, combineActionTypes, types} from './appTypes'
import {User} from '../../types'
import {AsideActions} from '../../types'

export const initialState: stateType = {
  currentUser: {} as User,
  users: [],
  usersObject: {},
  renderedUsers: [],
  loadUsers: true,
  lastRenderedUserIndex: 0,
  usersRenderStep: 0,
  activeAction: AsideActions.PrivateChats,
  filteredUsers: [],
  filterUsersInputValue: "",
  showFilteredUsers: false,
  filterUsersQuery: '',
  activeUserUid: '',
}

export default function app(state: stateType = initialState, action: combineActionTypes): stateType {
  const copyState = {...state} as any
  const copyRenderedUsers = [...state.renderedUsers]
  switch(action.type) {
    case types.SET_APP_STORE_FILED:      
      copyState[action.payload.filedName] = action.payload.value
      return copyState
    
    case types.LOAD_MORE_USERS:
      for(let i = state.lastRenderedUserIndex; i < state.lastRenderedUserIndex + state.usersRenderStep; i++) {
        if(state.showFilteredUsers) {
          if(copyRenderedUsers.length === state.filteredUsers.length) {
            return {...state, renderedUsers: copyRenderedUsers, loadUsers: false, lastRenderedUserIndex: state.lastRenderedUserIndex + i}
          }
          copyRenderedUsers.push(state.filteredUsers[i])
        } else {
          if(copyRenderedUsers.length === state.users.length) {
            return {...state, renderedUsers: copyRenderedUsers, loadUsers: false, lastRenderedUserIndex: state.lastRenderedUserIndex + i}
          }
          copyRenderedUsers.push(state.users[i])
        }
      }

      return {...state, renderedUsers: copyRenderedUsers, lastRenderedUserIndex: state.lastRenderedUserIndex + state.usersRenderStep}

    case types.UPDATE_RENDERED_USERS:
      const updatedRenderedUsers: User[] = []
      for(let i = 0; i < state.renderedUsers.length; i++) {
        if(state.showFilteredUsers) {
          const updatedFilteredUsers = state.users.filter((user: User) => (
            user.displayName.trim().toLowerCase().includes(state.filterUsersQuery.trim().toLowerCase()))
          )
          updatedRenderedUsers.push(updatedFilteredUsers[i])
        } else {
          updatedRenderedUsers.push(state.users[i])
        }
      }

      return {...state, renderedUsers: updatedRenderedUsers}

    case types.FILTER_USERS:
      action.payload.preventDefault()
      if(state.filterUsersInputValue.trim()) {
        const filteredUsers = state.users.filter((user: User) => (
          user.displayName.trim().toLowerCase().includes(state.filterUsersInputValue.trim().toLowerCase()))
        )
        let changedState = {
          ...state,
          filteredUsers: filteredUsers,
          renderedUsers: filteredUsers,
          filterUsersInputValue: "",
          showFilteredUsers: true,
          loadUsers: true,
          lastRenderedUserIndex: state.usersRenderStep,
          filterUsersQuery: state.filterUsersInputValue
        }

        if(filteredUsers.length === 0) {
          changedState.loadUsers = false
          return changedState
        }

        if(filteredUsers.length < state.usersRenderStep) {
          return changedState
        }

        changedState.renderedUsers = filteredUsers.slice(0, state.usersRenderStep)
        return changedState
      }

      return state

    case types.CLEAR_FILTERED_USERS:
      return {
        ...state,
        showFilteredUsers: false,
        filterUsersInputValue: '',
        lastRenderedUserIndex: 0,
        renderedUsers: [],
        filteredUsers: [],
        filterUsersQuery: '',
        loadUsers:  true
      }

    default:
      return state
  }
}