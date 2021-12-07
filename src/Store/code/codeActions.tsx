import {types} from './codeTypes'
import {Dispatch} from "redux";

export function setCodeStoreField(filedName: string, value: any) {
  return {
    type: types.SET_CODE_STORE_FIELD,
    payload: {filedName, value}
  }
}

export function toggleChatCodeEditor() {
  return {
    type: types.TOGGLE_CHAT_CODE_EDITOR
  }
}

export function changeCodeMode(newMode: string) {
  return async (dispatch: Dispatch) => {
    await import(`ace-builds/src-noconflict/mode-${newMode}`)
    await import(`ace-builds/src-noconflict/snippets/${newMode}`)
    dispatch(setCodeStoreField("chatCodeEditorMode", newMode))
  }
}