export enum types {
  SET_SETTINGS_STORE_FILED = "SET_SETTINGS_STORE_FILED",
}

export interface stateType {
  snackbarMessage: string
  showSnackbar: boolean
  snackbarType: string
  newName: string
  showBackdrop: boolean
}

export type combineActionTypes = SET_SETTINGS_STORE_FILED

interface SET_SETTINGS_STORE_FILED {
  type: types.SET_SETTINGS_STORE_FILED
  payload: {
    filedName: string
    value: any
  }
}

