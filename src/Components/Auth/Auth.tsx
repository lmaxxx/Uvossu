import classes from './Auth.module.scss'
import AuthSignUpForm from '../AuthSignUpForm/AuthSignUpForm'
import AuthSignInForm from '../AuthSignInForm/AuthSignInForm'
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
import Loader from '../../UI/Loader/Loader'
import GoogleButton from 'react-google-button'
import {isEmpty} from 'lodash'
import BackgroundVideo from '../../video/video.mp4'
import Logo from '../../img/logo.png'

const Auth = () => {
  const errorMessage = useSelector((state: StoreType) => state.auth.errorMessage)
  const showErrorMessage = useSelector((state: StoreType) => state.auth.showErrorMessage)
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const [activeForm, setActiveForm] = useState<string>('signup')
  const dispatch = useDispatch()
  const isSigning = useSelector((state: StoreType) => state.auth.isSigning)
  const showLoader = useSelector((state: StoreType) => state.auth.showLoader)
  const [user] = useAuthState(auth)

  useEffect(() => {
    if(auth.currentUser?.uid !== undefined) {

      firestore.collection('users').doc(auth.currentUser.uid).get()
        .then((doc: any) => {
          dispatch(setAppStoreField("currentUser", doc.data()))
        })
    }
  }, [user])


  useEffect(() => {
    dispatch(setAuthStoreField("showLoader", false))
  }, [])

  if(!isEmpty(currentUser) && !isSigning) {
    return <Redirect to="/" />
  }

  return (
    <div className={classes.Auth}>
      <div className={classes.AuthForm}>
        {showLoader && <Loader
          style={{
            position: 'absolute',
            top: "0",
            left: "0",
            zIndex: "2",
            borderRadius: "8px"
          }}
          width={"100%"}
          height={"100%"}
          backgroundColor={"#fff"}
          loaderHeight={70}
          loaderWidth={70}
          type={"ThreeDots"}
        />}
        <TabContext value={activeForm}>
          <TabList variant="fullWidth" onChange={(_, newValue) => setActiveForm(newValue)} aria-label="lab API tabs example">
            <Tab label="Sign up" value="signup" />
            <Tab label="Sign in" value="signin" />
          </TabList>
          <TabPanel value="signup"><AuthSignUpForm /></TabPanel>
          <TabPanel value="signin"><AuthSignInForm /></TabPanel>
        </TabContext>
        <GoogleButton
          onClick={() => dispatch(signInWithGoogle())}
          label='Continue with Google'
          className={classes.AuthGoogleButton}
        >Continue with Google</GoogleButton>
      </div>
      <div className={classes.AuthVideoWrapper}>
        <div className={classes.AuthBrandWrapper}>
          <img className={classes.AuthLogo} src={Logo} alt=""/>
          <p className={classes.AuthBrandName}>Uvossu</p>
        </div>
        <video
          autoPlay
          loop
          muted
          className={classes.AuthVideo}
        >
          <source src={BackgroundVideo} type={"video/mp4"}/>
        </video>
      </div>
      <Snackbar open={showErrorMessage} autoHideDuration={3500} onClose={() => dispatch(setAuthStoreField('showErrorMessage', false))}>
        <Alert variant="filled" severity="error">{errorMessage}</Alert>
      </Snackbar>
    </div>
  )
}

export default Auth