import classes from './Auth.module.scss'
import AuthSignUpForm from '../AuthSignUpForm/AuthSignUpForm'
import AuthSignInForm from '../AuthSignInForm/AuthSignInForm'
import { GoogleLoginButton } from "react-social-login-buttons"
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { auth, firestore } from '../../firebase'
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { FormEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';

const Auth = () => {
  const [user] = useAuthState(auth)

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).catch()
    const {uid, displayName, photoURL} = auth.currentUser as {uid: string, displayName: string, photoURL: string}
    const userDoc = await getDoc(doc(firestore, 'users', uid))
    if(!userDoc.exists()) {
      createUser({uid, displayName, photoURL})
    } 

    localStorage.setItem("will-signin", "true")
  }

  const createUser = ({uid, displayName, photoURL}: {uid: string, displayName: string, photoURL: string}) => {
    setDoc(doc(firestore, "users", uid), {
      uid,
      displayName,
      photoURL
    })
  }

  const signUpWithEmailAndPassword = async (
    e: FormEvent<HTMLFormElement>,
    nickname: string,
    email: string,
    password: string
    ) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(auth.currentUser as any)
  }

  const signINWithEmailAndPassword = (e: FormEvent<HTMLFormElement>, email: string, password: string) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
  }

  if(user) {
    return <Redirect to="/" />
  }


  return (
    <div className={classes.Auth}>
      <AuthSignUpForm signUpWithEmailAndPassword={signUpWithEmailAndPassword} />
      <AuthSignInForm signInWithEmailAndPassword={signINWithEmailAndPassword} />
      <p>Or</p>
      <GoogleLoginButton 
        align={'center'}
        onClick={signInWithGoogle}
      >Continue with Google</GoogleLoginButton>
    </div>
  )
}

export default Auth