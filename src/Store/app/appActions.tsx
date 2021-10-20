import {types} from './appTypes'

export function setAppStoreField(filedName: string, value: any) {
  return {
    type: types.SET_APP_STORE_FILED,
    payload: {filedName, value}
  }
}

export function loadMoreUsers() {
  return {
    type: types.LOAD_MORE_USERS
  }
}

export function updateRenderedUsers() {
  return {
    type: types.UDPATE_RENDERED_USERS
  }
}