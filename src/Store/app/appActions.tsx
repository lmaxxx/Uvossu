import {types} from './appTypes'

export function setAppStoreField(filedName: string, value: any) {
  return {
    type: types.SET_APP_STORE_FILED,
    payload: {filedName, value}
  }
}