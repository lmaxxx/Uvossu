export enum types {
  CREATE_USER = "CREATE_USER",
  SING_IN_WITH_GOOGLE = "SING_IN_WITH_GOOGLE",
  SET_AUTH_STORE_FILED = "SET_AUTH_STORE_FILED",
}

export interface stateType {
  isSigning: boolean
  errorMessage: string
  showErrorMessage: boolean
  verifyErrorMessage: string
  verifyShowErrorMessage: boolean
  newEmail: string
}

export type combineActionTypes = SING_IN_WITH_GOOGLE | SET_AUTH_STORE_FILED

interface SING_IN_WITH_GOOGLE {
  type: types.SING_IN_WITH_GOOGLE
}

interface SET_AUTH_STORE_FILED {
  type: types.SET_AUTH_STORE_FILED
  payload: {
    filedName: string
    value: any
  }
}

