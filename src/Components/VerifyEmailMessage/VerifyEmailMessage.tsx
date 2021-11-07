import classes from './VerifyEmailMessage.module.scss'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import CustomOutlineInput from '../../UI/OutlineInput/LightOutlineInput'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {useDispatch, useSelector} from 'react-redux'
import {StoreType} from '../../Store'
import {setAuthStoreField, changeUserEmail, signOut} from '../../Store/auth/authActions'
import {Redirect} from 'react-router-dom'

const VerifyEmailMessage = () => {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [newEmail, setNewEmail] = useState<string>('')
  const errorMessage = useSelector((state: StoreType) => state.auth.verifyErrorMessage)
  const showErrorMessage = useSelector((state: StoreType) => state.auth.verifyShowErrorMessage)
  const [emailError, setEmailError] = useState<boolean>(false)
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if(newEmail) {
      validate()
    }
  }, [newEmail])

  const validate = () => {
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(validEmail.test(newEmail)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }

  if(Object.entries(currentUser).length === 0) {
    return <Redirect to="/auth" />
  }

  return (
    <div className={classes.VerifyEmailMessage}>
      <div className={classes.VerifyEmailMessageBlock}>
        <MailOutlineIcon className={classes.VerifyEmailMessageIcon} />
        <h2 className={classes.VerifyEmailMessageTitle}>Verify your email</h2>
        <p>We just send your verify link to</p>
        <strong className={classes.VerifyEmailMessageEmail}>{currentUser.uemail}</strong>
        <p>If you verify it, <strong className={classes.VerifyEmailMessageEmail}>reload</strong> the page</p>
        <p onClick={() => setShowInput(prev => !prev)} className={classes.VerifyEmailMessageToggle} >Set other email</p>
        {
          showInput ? 
          <form 
            className={classes.VerifyEmailMessageForm} 
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              dispatch(changeUserEmail(e, newEmail))
              setShowInput(prev => !prev)
              setNewEmail('')
            }} 
          >
            <CustomOutlineInput 
              value={newEmail} 
              className={classes.VerifyEmailMessageInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)} 
              label="New Email" 
              variant="outlined" 
              error={emailError}
            />
            <Button disabled={!newEmail || !!emailError} type="submit" size="large" variant="outlined">Submit</Button>
          </form>
          :
          null
        }
        <Button style={{marginTop: "10px"}} color="error" variant='contained' onClick={() => dispatch(signOut())}>Sign out</Button>
      </div>
      <Snackbar open={showErrorMessage} autoHideDuration={3500} onClose={() => {
        dispatch(setAuthStoreField("verifyShowErrorMessage" ,false))
      }}>
          <Alert variant="filled" severity="error">{errorMessage}</Alert>
      </Snackbar>
    </div>
  )
}



export default VerifyEmailMessage;
