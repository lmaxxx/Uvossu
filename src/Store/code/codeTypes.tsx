export enum types {
  SET_CODE_STORE_FIELD = "SET_CODE_STORE_FIELD",
  TOGGLE_CHAT_CODE_EDITOR = "TOGGLE_CHAT_CODE_EDITOR"
}

export interface stateType {
  inOpenChatCodeEditor: boolean
  chatCodeEditorValue: string
  chatCodeEditorMode: string
}

export type combineActionTypes = SET_CODE_STORE_FIELD | TOGGLE_CHAT_CODE_EDITOR

interface SET_CODE_STORE_FIELD {
  type: types.SET_CODE_STORE_FIELD
  payload: {
    filedName: string
    value: any
  }
}

interface TOGGLE_CHAT_CODE_EDITOR {
  type: types.TOGGLE_CHAT_CODE_EDITOR
}

