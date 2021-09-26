import classes from './Auth.module.scss'
import AuthSignUpForm from '../AuthSignUpForm/AuthSignUpForm'
import AuthSignInForm from '../AuthSignInForm/AuthSignInForm'
import { GoogleLoginButton } from "react-social-login-buttons"
import { auth, firestore } from '../../firebase'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { FormEvent, useState } from 'react'
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
      await auth.signInWithPopup(provider)
      const {uid, displayName, photoURL} = auth.currentUser as {uid: string, displayName: string, photoURL: string}
      const userDoc: any = await firestore.collection("users").doc(uid).get()
      if(!userDoc.exists) {
        await createUser({uid, displayName, photoURL})
      } 
    } catch(err) {console.log(err)}
  }

  const createUser = ({uid, displayName, photoURL}: {uid: string, displayName: string, photoURL: string}) => {
    firestore.collection('users').doc(uid).set({
      uid,
      displayName,
      photoURL,
      theme: 'light'
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
      const {uid} = auth.currentUser as {uid: string}
      await sendEmailVerification(auth.currentUser as any)
      await createUser({uid, displayName: name, photoURL: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F51%2F83%2Fef%2F5183ef65b82a66cf573f324e59cf028b.png&f=1&nofb=1'})
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