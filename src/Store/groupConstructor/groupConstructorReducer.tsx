import {stateType, combineActionTypes, types} from "./groupConstructorTypes"

const initialState: stateType = {
  membersUid: [],
  chatName: '',
  photoURL: '',
  ownerUid: '',
  nextOwnerUid: ''
}

export default function groupConstructor(state = initialState, action: combineActionTypes): stateType {
  const copyState = {...state} as any
  switch(action.type) {
    case types.SET_GROUP_CONSTRUCTOR_STORE_FILED:
      copyState[action.payload.filedName] = action.payload.value
      return copyState

    case types.ADD_USER_TO_CHAT:
      return {
        ...state,
        membersUid: [...state.membersUid, action.payload]
      }

    case types.REMOVE_USER_FROM_CHAT:
      return {
        ...state,
        membersUid: copyState.membersUid.filter((uid: string) => uid !== action.payload)
      }

    case types.CLEAR_GROUP_CONSTRUCTOR:
      return {
        ...state,
        membersUid: [action.payload],
        ownerUid: action.payload,
        chatName: '',
        photoURL: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F166%2F166258.png&f=1&nofb=1',
      }

    case types.SET_GROUP_DATA:
      const {activeChat, currentUserUid} = action.payload
      const userIndex = activeChat.membersUid.indexOf(currentUserUid as string)

      activeChat.membersUid.splice(userIndex, 1)
      activeChat.membersUid.unshift(currentUserUid)

      return {
        ...state,
        membersUid: activeChat.membersUid,
        photoURL: activeChat.photoURL as string,
        chatName: activeChat.name as string,
        ownerUid: activeChat.ownerUid as string
      }

    default: return state
  }
}