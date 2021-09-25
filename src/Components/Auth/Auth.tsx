import classes from './Auth.module.scss'
import AuthSignUpForm from '../AuthSignUpForm/AuthSignUpForm'
import AuthSignInForm from '../AuthSignInForm/AuthSignInForm'
import { GoogleLoginButton } from "react-social-login-buttons"
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { auth, firestore } from '../../firebase'
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { FormEvent, useState, SyntheticEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';


const Auth = () => {
  const [user] = useAuthState(auth)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
  const [activeForm, setActiveForm] = useState<string>('signup')

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
      const {uid, displayName, photoURL} = auth.currentUser as {uid: string, displayName: string, photoURL: string}
      const userDoc = await getDoc(doc(firestore, 'users', uid))
      if(!userDoc.exists()) {
        createUser({uid, displayName, photoURL})
      } 
    } catch(err) {}
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
    name: string,
    email: string,
    password: string
    ) => {
    e.preventDefault()
    try{
      await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(auth.currentUser as any)
    } catch(err: any) {
      if(err.message === "Firebase: Error (auth/email-already-in-use).") {
        setErrorMessage("Email is already in use.")
        setShowErrorMessage(true)
      }
    }
  }

  const signINWithEmailAndPassword = async (e: FormEvent<HTMLFormElement>, email: string, password: string) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch(err) {
      setErrorMessage("Invalid Email or Password")
      setShowErrorMessage(true)
    }
  }

  if(user) {
    return <Redirect to="/" />
  }

  return (
    <div className={classes.Auth}>
      <div className={classes.AuthForm}>
        <TabContext value={activeForm}>
          <TabList variant="fullWidth" onChange={(_, newValue) => setActiveForm(newValue)} aria-label="lab API tabs example">
            <Tab label="Sign up" value="signup" />
            <Tab label="Sign in" value="signin" />
          </TabList>
          <TabPanel value="signup"><AuthSignUpForm signUpWithEmailAndPassword={signUpWithEmailAndPassword} /></TabPanel>
          <TabPanel value="signin"><AuthSignInForm signInWithEmailAndPassword={signINWithEmailAndPassword} /></TabPanel>
        </TabContext>
        <p>or</p>
        <GoogleLoginButton 
          align={'center'}
          onClick={signInWithGoogle}
        >Continue with Google</GoogleLoginButton>
      </div>
      <Snackbar open={showErrorMessage} autoHideDuration={4000} onClose={() => setShowErrorMessage(false)}>
        <Alert variant="filled" severity="error">{errorMessage}</Alert>
      </Snackbar>
    </div>
  )
}

export default Auth