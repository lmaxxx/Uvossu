import {stateType, combineActionTypes, types} from "./groupConstructorTypes"

const initialState: stateType = {
  membersUid: [],
  chatName: '',
  photoURL: '',
  ownerUid: '',
  nextOwnerUid: '',
  avatarFile: {}
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
        photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgywobEnJnrgLffAMsJwIdwK04Mo1PaYPWBQ&usqp=CAU',
        avatarFile: {}
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
        ownerUid: activeChat.ownerUid as string,
      }

    case types.DELETE_GROUP_AVATAR:
      return {
        ...state,
        photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgywobEnJnrgLffAMsJwIdwK04Mo1PaYPWBQ&usqp=CAU',
        avatarFile: {}
      }

    case types.SET_GROUP_AVATAR:
      const file = action.payload.target.files[0]
      const url = URL.createObjectURL(file)

      return {
        ...state,
        photoURL: url,
        avatarFile: file
      }

    default: return state
  }
}
