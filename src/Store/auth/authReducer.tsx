import {stateType, combineActionTypes, types} from './authTypes'

const initialState: stateType = {
  isSigning: false,
  errorMessage: '',
  showErrorMessage: false,
  verifyErrorMessage: '',
  verifyShowErrorMessage: false,
  newEmail: '',
  showLoader: false
}

export default function auth(state: stateType = initialState, action: combineActionTypes): stateType {
  const copyState = {...state} as any
  switch(action.type) {
    case types.SET_AUTH_STORE_FILED:      
      copyState[action.payload.filedName] = action.payload.value
      return copyState


    default: 
      return state
  }
}