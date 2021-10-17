import {Dispatch} from 'redux'
import {types} from './authTypes'
import {auth, firestore} from '../../firebase'
import {User} from '../../types'
import {FormEvent} from 'react'
import {setAppStoreField} from '../app/appActions'

import { 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification,
  updateEmail,
} from "firebase/auth"

export function signInWithGoogle() {
  return async (dispatch: Dispatch) => {
    try {
      const provider = new GoogleAuthProvider();
      dispatch(setAuthStoreField("isSigning", true))
      dispatch(setAuthStoreField("showLoader", true))
      await auth.signInWithPopup(provider)
      const {uid, displayName, photoURL, email} = auth.currentUser as User
      const userDoc: any = await firestore.collection("users").doc(uid).get()
      if(!userDoc.exists) {
        await createUser({uid, displayName, photoURL, email})
      } 
      dispatch(setAuthStoreField("isSigning", false))
    } catch(err) {
      dispatch(setAuthStoreField("showLoader", false))
      dispatch(setAuthStoreField("isSigning", false))
    }
  }
}

export function signUpWithEmailAndPassword(
  e: FormEvent<HTMLFormElement>,
  name: string,
  email: string,
  password: string
  )  {
  e.preventDefault()
  return async (dispatch: Dispatch) => {
    dispatch(setAuthStoreField("isSigning", true))
    dispatch(setAuthStoreField("showLoader", true))
    try{
      await createUserWithEmailAndPassword(auth, email, password)
      const {uid} = auth.currentUser as {uid: string}
      await sendEmailVerification(auth.currentUser as any)
      await createUser({
        uid, displayName: 
        name, photoURL: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F51%2F83%2Fef%2F5183ef65b82a66cf573f324e59cf028b.png&f=1&nofb=1',
        email
      })
      dispatch(setAuthStoreField("isSigning", false))
    } catch(err: any) {
      dispatch(setAuthStoreField("isSigning", false))
      dispatch(setAuthStoreField("showLoader", false))
      if(err.message === "Firebase: The email address is already in use by another account. (auth/email-already-in-use).") {
        dispatch(setAuthStoreField("errorMessage", "Email is already in use."))
        dispatch(setAuthStoreField("showErrorMessage", true))
      }
    }
  }
}

export function signINWithEmailAndPassword(e: FormEvent<HTMLFormElement>, email: string, password: string) {
  e.preventDefault()
  return async (dispatch: Dispatch) => {
    dispatch(setAuthStoreField("isSigning", true))
    dispatch(setAuthStoreField("showLoader", true))
    try {
      await signInWithEmailAndPassword(auth, email, password)
      dispatch(setAuthStoreField("isSigning", false))
    } catch(err) {
      dispatch(setAuthStoreField("showLoader", false))
      dispatch(setAuthStoreField("isSigning", false))
      dispatch(setAuthStoreField("errorMessage", "Invalid Email or Password"))
      dispatch(setAuthStoreField("showErrorMessage", true))
    }
  }
}

export function changeUserEmail(e: FormEvent<HTMLFormElement>, newEmail: string) {
  e.preventDefault()
  return async (dispatch: Dispatch) => {
    try {
      await updateEmail(auth.currentUser as any, newEmail)
      await sendEmailVerification(auth.currentUser as any)

    } catch(err) {
      dispatch(setAuthStoreField("verifyErrorMessage", "Email is already in use."))
      dispatch(setAuthStoreField("verifyShowErrorMessage", true))
    }
  }

}

export function createUser({
  uid,
  displayName, 
  photoURL, 
  email
}: User) {
  firestore.collection('users').doc(uid).set({
    uid,
    displayName,
    photoURL,
    theme: 'light',
    uemail: email
  })
}

export function setAuthStoreField(filedName: string, value: any) {
  return {
    type: types.SET_AUTH_STORE_FILED,
    payload: {filedName, value}
  }
}

export function signOut() {
  return async (dispatch: Dispatch) => {
    await auth.signOut()
    dispatch(setAppStoreField("currentUser", {}))
  }
}