import {types} from './settingsTypes'
import {Dispatch} from 'redux'
import {FormEvent} from 'react'
import {firestore, storage, auth} from '../../firebase'
import {setAppStoreField} from '../app/appActions'
import {User} from '../../types'

export function setSettingsStoreField(filedName: string, value: any) {
  return {
    type: types.SET_SETTINGS_STORE_FILED,
    payload: {filedName, value}
  }
}

export function setSettingsSnackBar(message: string, type: string, show: boolean, dispatch: Dispatch) {
  dispatch(setSettingsStoreField("snackbarMessage", message))
  dispatch(setSettingsStoreField("snackbarType", type))
  dispatch(setSettingsStoreField("showSnackbar", show))
}

export function setDisplayName(e: FormEvent<HTMLFormElement>, newName :string, currentUser: User) {
  e.preventDefault()
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setSettingsStoreField("showBackdrop", true))
      await firestore.collection('users').doc(currentUser.uid).update({
        displayName: newName
      })

      const copy = {...currentUser}
      copy.displayName = newName

      dispatch(setAppStoreField("currentUser", copy))
      dispatch(setSettingsStoreField("showBackdrop", false))
      setSettingsSnackBar("Name changed", "success", true, dispatch)
    } catch(_) {
      setSettingsSnackBar("Something went wrong", "error", true, dispatch)
    }
  }
}

export function setAvatar(e: any, currentUser: User) {
  return async (dispatch: Dispatch) => {
    try {
      const copy = {...currentUser}
      dispatch(setSettingsStoreField("showBackdrop", true))
      const file = e.target.files[0]
      const fileRef = storage.ref().child("avatars/" + file.name)
      await fileRef.put(file)
      const fileUrl = await fileRef.getDownloadURL()
      await firestore.collection("users").doc(currentUser.uid).update({photoURL: fileUrl})
      copy.photoURL = fileUrl
      dispatch(setAppStoreField("currentUser", copy))
      dispatch(setSettingsStoreField("showBackdrop", false))
  
      setSettingsSnackBar("Avatar changed", "success", true, dispatch)
    } catch (_) {
      setSettingsSnackBar("Something went wrong", "error", true, dispatch)
    }
  }
}

export function setPassword(currentUser: User) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setSettingsStoreField("showBackdrop", true))
      
      if(typeof currentUser.uemail === 'string') {
        await auth.sendPasswordResetEmail(currentUser.uemail)
      }

      dispatch(setSettingsStoreField("showBackdrop", false))
      setSettingsSnackBar("We just sent yout reset link to you email", "success", true, dispatch)
    } catch(_) {
      setSettingsSnackBar("Something went wrong", "error", true, dispatch)
    }
  }

}

export function toggleTheme(theme: string, currentUser: User) {
  if(theme) {
    const copy = {...currentUser}

    return async (dispatch: Dispatch) => {
      dispatch(setSettingsStoreField("showBackdrop", true))
  
      if(theme === 'light') {
        await firestore.collection('users').doc(currentUser.uid).update({ theme: 'dark' })
        copy.theme = "dark"
      } else {
        await firestore.collection('users').doc(currentUser.uid).update({ theme: 'light' })
        copy.theme = "light"
      }
  
      dispatch(setAppStoreField("currentUser", copy))
      dispatch(setSettingsStoreField("showBackdrop", false))
    }
  }
}
