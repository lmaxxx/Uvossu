import classes from './Auth.module.scss'
import AuthSignUpForm from '../AuthSignUpForm/AuthSignUpForm'
import AuthSignInForm from '../AuthSignInForm/AuthSignInForm'
import { GoogleLoginButton } from "react-social-login-buttons"
import { auth, firestore } from '../../firebase'
import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import {useDispatch, useSelector} from 'react-redux'
import {signInWithGoogle, setAuthStoreField} from '../../Store/auth/authActions'
import {setAppStoreField} from '../../Store/app/appActions'
import {StoreType} from '../../Store/'


const Auth = () => {
  const errorMessage = useSelector((state: StoreType) => state.auth.errorMessage)
  const showErrorMessage = useSelector((state: StoreType) => state.auth.showErrorMessage)
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const [activeForm, setActiveForm] = useState<string>('signup')
  const dispatch = useDispatch()
  const isSigning = useSelector((state: StoreType) => state.auth.isSigning)

  useEffect(() => {
    if(auth.currentUser?.uid !== undefined) {
      firestore.collection('users').doc(auth.currentUser.uid).get()
        .then((doc: any) => {
          dispatch(setAppStoreField("currentUser", doc.data()))
        })
    }
  }, [auth.currentUser])

  if(Object.entries(currentUser).length !== 0 && !isSigning) {
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
          <TabPanel value="signup"><AuthSignUpForm /></TabPanel>
          <TabPanel value="signin"><AuthSignInForm /></TabPanel>
        </TabContext>
        <p>or</p>
        <GoogleLoginButton 
          align={'center'}
          onClick={() => dispatch(signInWithGoogle())}
          style={{color: '#52585D'}}
        >Continue with Google</GoogleLoginButton>
      </div>
      <Snackbar open={showErrorMessage} autoHideDuration={3500} onClose={() => dispatch(setAuthStoreField('showErrorMessage', false))}>
        <Alert variant="filled" severity="error">{errorMessage}</Alert>
      </Snackbar>
    </div>
  )
}

export default Auth