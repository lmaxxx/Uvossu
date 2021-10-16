import {stateType, combineActionTypes, types} from './settingsTypes'

const initialState: stateType = {
  snackbarMessage: '',
  showSnackbar: false,
  snackbarType: '',
  newName: '',
  showBackdrop: false
}

export default function settings(state: stateType = initialState, action: combineActionTypes): stateType {
  const copyState = {...state} as any
  switch(action.type) {
    case types.SET_SETTINGS_STORE_FILED:      
      copyState[action.payload.filedName] = action.payload.value
      return copyState

    default: 
      return state
  }
}