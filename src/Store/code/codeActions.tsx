import {types} from './codeTypes'
import {Dispatch} from "redux";
import axios from "axios";
import modes from '../../compilerModes'
import {setAppStoreField} from "../app/appActions";
import {AsideActions} from "../../types";
import qs from "qs"

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

export function changeCodeMode(newMode: string, isCompiler?: boolean) {
  return async (dispatch: Dispatch) => {
    await import(`ace-builds/src-noconflict/mode-${newMode}`)
    await import(`ace-builds/src-noconflict/snippets/${newMode}`)

    if(isCompiler) {
      dispatch(setCodeStoreField("codeEditorMode", newMode))
    } else {
      dispatch(setCodeStoreField("chatCodeEditorMode", newMode))
    }
  }
}

export function clearCodeOutput() {
  return {
    type: types.CLEAR_CODE_OUTPUT
  }
}

export function compileCode(code: string, mode: string) {
  const modeObj = modes.filter((obj: any) => obj.value === mode)[0]

  return async (dispatch: Dispatch) => {
    dispatch(setCodeStoreField("isCompiling", true))

    try {
      const {data} = await axios({
        method: 'post',
        url: 'https://api.codex.jaagrav.in',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
          code: code,
          language: modeObj.compileFormat,
          input: ""
        })
      })

      if(data.error) {
        dispatch(setCodeStoreField("codeEditorOutput", data.error))
        dispatch(setCodeStoreField("isCompiling", false))
        return
      }

      dispatch(setCodeStoreField("codeEditorOutput", data.output))
      dispatch(setCodeStoreField("isCompiling", false))
    } catch (err: any) {
      dispatch(setCodeStoreField("isCompiling", false))
    }
  }
}

export function runCodeFromChat(code: string, mode: string) {
  return (dispatch: any) => {
    dispatch(compileCode(code, mode))
    dispatch(setCodeStoreField("codeEditorMode", mode))
    dispatch(setCodeStoreField("codeEditorValue", code))
    dispatch(setCodeStoreField("codeEditorOutput", ""))
    dispatch(setAppStoreField("activeAction", AsideActions.CodeCompiler))
  }
}
