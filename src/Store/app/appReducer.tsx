import {combineActionTypes, stateType, types} from './appTypes'
import {AsideActions, User} from '../../types'

export const initialState: stateType = {
  currentUser: {} as User,
  users: [],
  usersObject: {},
  hasMoreUsers: true,
  activeAction: AsideActions.Chats,
  filterUsersInputValue: "",
  showFilteredUsers: false,
  filterUsersQuery: '',
  showBackdrop: false,
  usersLimit: 20,
  gotUsers: false,
  showImageViewer: false,
  imageForView: ''
}

export default function app(state: stateType = initialState, action: combineActionTypes): stateType {
  const copyState = {...state} as any
  switch(action.type) {
    case types.SET_APP_STORE_FILED:      
      copyState[action.payload.filedName] = action.payload.value
      return copyState

    case types.LOAD_MORE_USERS:
      return {
        ...state,
        usersLimit: state.usersLimit + 20
      }

    case types.FILTER_USERS:
      action.payload.preventDefault()
      return state.filterUsersInputValue.trim() ?
       {
        ...state,
        usersLimit: 20,
        filterUsersQuery: state.filterUsersInputValue,
        showFilteredUsers: true,
        filterUsersInputValue: ""
      } : {...state}

    case types.CLEAR_FILTERED_USERS:
      return {
        ...state,
        usersLimit: 20,
        filterUsersQuery: '',
        showFilteredUsers: false,
        filterUsersInputValue: ""
      }

    case types.OPEN_IMAGE_VIEWER:
      return {
        ...state,
        showImageViewer: true,
        imageForView: action.payload
      }

    case types.CLOSE_IMAGE_VIEWER:
      return {
        ...state,
        showImageViewer: false,
        imageForView: ''
      }

    case types.SET_EMAIL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          uemail: action.payload
        }
      }

    default:
      return state
  }
}