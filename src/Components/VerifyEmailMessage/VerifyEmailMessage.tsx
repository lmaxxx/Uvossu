import { auth } from '../../firebase'
import classes from './VerifyEmailMessage.module.scss'
import { useState, ChangeEvent, FormEvent } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateEmail, sendEmailVerification } from "firebase/auth";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const VerifyEmailMessage = () => {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [newEmail, setNewEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const {email} = auth.currentUser as {email: string}

  const changeUserEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await updateEmail(auth.currentUser as any, newEmail).catch((err) => console.log(err))
      await sendEmailVerification(auth.currentUser as any)
      setShowInput(prev => !prev)
      setNewEmail('')
    } catch(err) {
      setErrorMessage("Email is already in use.")
      setShowErrorMessage(true)
    }
  }

  const validate = () => {
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(validEmail.test(newEmail)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }

  return (
    <div className={classes.VerifyEmailMessage}>
      <div className={classes.VerifyEmailMessageBlock}>
        <MailOutlineIcon className={classes.VerifyEmailMessageIcon} />
        <h2 className={classes.VerifyEmailMessageTitle}>Verify your email</h2>
        <p onClick={() => auth.signOut()}>We just send your verify link to</p>
        <strong className={classes.VerifyEmailMessageEmail}>{email}</strong>
        <p onClick={() => setShowInput(prev => !prev)} className={classes.VerifyEmailMessageToggle} >Set other email</p>
        {
          showInput ? 
          <form className={classes.VerifyEmailMessageForm} onSubmit={(e: FormEvent<HTMLFormElement>) => changeUserEmail(e)} >
            <TextField 
              value={newEmail} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setNewEmail(e.target.value)
                validate()
              }} 
              label="New Email" 
              variant="outlined" 
              error={emailError}
            />
            <Button disabled={!newEmail || !!emailError} type="submit" size="large" variant="outlined">Submit</Button>
          </form>
          :
          null
        }
      </div>
      <Snackbar open={showErrorMessage} autoHideDuration={4000} onClose={() => setShowErrorMessage(false)}>
          <Alert variant="filled" severity="error">{errorMessage}</Alert>
      </Snackbar>
    </div>
  )
}



export default VerifyEmailMessage;
