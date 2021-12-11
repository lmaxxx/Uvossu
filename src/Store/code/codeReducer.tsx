import {stateType, combineActionTypes, types} from "./codeTypes";

const initialState: stateType = {
  inOpenChatCodeEditor: false,
  chatCodeEditorValue: '',
  chatCodeEditorMode: 'javascript',
  codeEditorValue: "",
  codeEditorMode: "javascript",
  codeEditorOutput: "",
  isCompiling: false
}

export default function code(state = initialState, action: combineActionTypes): stateType {
  const copyState = {...state} as any
  switch(action.type) {
    case types.SET_CODE_STORE_FIELD:
      copyState[action.payload.filedName] = action.payload.value
      return copyState

    case types.TOGGLE_CHAT_CODE_EDITOR:
      return {
        ...state,
        inOpenChatCodeEditor: !state.inOpenChatCodeEditor
      }

    case types.CLEAR_CODE_OUTPUT:
      return {
        ...state,
        codeEditorOutput: ''
      }

    default: return state
  }
}