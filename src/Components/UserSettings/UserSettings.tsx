import {NavLink} from 'react-router-dom'
import {auth, firestore, storage} from '../../firebase'
import {User} from '../../types'
import {useState, useEffect, FormEvent} from 'react'
import classes from './UserSettings.module.scss'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SetAvatarForm from '../SetAvatarForm/SetAvatarForm';
import SetNameForm from '../SetNameForm/SetNameForm'
import SetPasswordForm from '../SetPasswordForm/SetPasswordForm'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import {Redirect} from 'react-router-dom'
import ToggleTheme from "react-toggle-theme";
import Loader from '../../UI/Loader/Loader'

const UserSettings = () => {
  const [userData, setUserData] = useState<User>()
  const [snackbarMessage, setSnackbarMessage] = useState<string>()
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false)
  const [snackbarType, setSnackbarType] = useState<any>()
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false)
  const [newName, setNewName] = useState<string>()
  const [isSignOut, setIsSignOut] = useState<boolean>(false)

  useEffect(() => {
    if(auth.currentUser?.uid !== undefined) {
      const {uid} = auth.currentUser as {uid: string}

      firestore.collection('users').doc(uid).get()
        .then((doc: any) => {
          setUserData(doc.data())
          setNewName(doc.data().displayName)
        })
    }
  }, [auth.currentUser])

  const setSnackbar = (message: string, type: string, show: boolean) => {
    setSnackbarMessage(message)
    setSnackbarType(type)
    setShowSnackbar(show)
  }

  const setDisplayName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await firestore.collection('users').doc(userData?.uid).update({
        displayName: newName
      })

      setSnackbar("Name changed", "success", true)
    } catch(_) {
      setSnackbar("Something went wrong", "error", true)
    }
  }

  const setAvatar = async (e: any) => {
    try {
      setShowBackdrop(true)
      const file = e.target.files[0]
      const fileRef = storage.ref().child("avatars/" + file.name)
      await fileRef.put(file)
      const fileUrl = await fileRef.getDownloadURL()
      await firestore.collection("users").doc(userData?.uid).update({photoURL: fileUrl})
      await firestore.collection('users').doc(userData?.uid).get().then((doc: any) => setUserData(doc.data()))
      setShowBackdrop(false)

      setSnackbar("Avatar changed", "success", true)
    } catch (_) {
      setSnackbar("Something went wrong", "error", true)
    }
  }

  const setPassword = async () => {
    try {
      if(typeof userData?.uemail === 'string') {
        await auth.sendPasswordResetEmail(userData?.uemail)
      }

      setSnackbar("We just sent yout reset link to you email", "success", true)
    } catch(_) {
      setSnackbar("Something went wrong", "error", true)
    }
  }

  const signOut = async () => {
    await auth.signOut()
    setIsSignOut(true)
  }

  const toggleTheme = async () => {
    setShowBackdrop(true)

    if(userData?.theme === 'light') {
      await firestore.collection('users').doc(userData?.uid).update({ theme: 'dark' })
    } else {
      await firestore.collection('users').doc(userData?.uid).update({ theme: 'light' })
    }

    await firestore.collection('users').doc(userData?.uid).get().then((doc: any) => setUserData(doc.data()))
    setShowBackdrop(false)
  }

  if(isSignOut) {
    return <Redirect to="/" />
  }

  if(userData === undefined) {
    return <Loader 
      height={"100vh"} 
      width={"100%"} 
      backgroundColor={'#fff'} 
      type={'Grid'}
    />
  } else {
    return (
      <div className={classes["UserSettings" + userData?.theme]}> 
        <nav className={classes["UserSettings" + userData?.theme + "Nav"]}>
          <NavLink className={classes["UserSettings" + userData?.theme + "Link"]}  to="/">
            <ArrowBackIosIcon className={classes["UserSettings" + userData?.theme + "Icon"]} />
          </NavLink>
          <h1 className={classes["UserSettings" + userData?.theme + "Title"]} >Settings</h1>
          <ToggleTheme
            onChange={toggleTheme}
            selectedTheme={userData?.theme as any}
          />
        </nav>
        <div className={classes["UserSettings" + userData?.theme + "Wrapper"]}>
          <SetAvatarForm 
            setAvatar={setAvatar} 
            userData={userData as User} 
            theme={userData?.theme as string}
          />
          <SetNameForm 
            setDisplayName={setDisplayName} 
            newName={newName as string}
            setNewName={setNewName}
            theme={userData?.theme as string}
          />
          {
            userData?.uemail ? 
            <SetPasswordForm 
              theme={userData?.theme as string}
              setPassword={setPassword} 
            />
            :
            null
          }
          <Button 
            variant="contained"
            color="error"
            className={classes["UserSettings" + userData?.theme + "SignOut"]} 
            onClick={signOut}
          >Sign out</Button>
        </div>
        <Snackbar open={showSnackbar} autoHideDuration={4000} onClose={() => setShowSnackbar(false)}>
            <Alert variant="filled" severity={snackbarType}>{snackbarMessage}</Alert>
        </Snackbar>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
  }
}

export default UserSettings