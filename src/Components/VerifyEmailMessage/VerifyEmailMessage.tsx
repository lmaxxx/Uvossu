import { auth } from '../../firebase'
import classes from './VerifyEmailMessage.module.scss'
import { useState, ChangeEvent, FormEvent } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateEmail, sendEmailVerification } from "firebase/auth";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const VerifyEmailMessage = () => {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [newEmail, setNewEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
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

  return (
    <div className={classes.VerifyEmailMessage}>
      <h1>Verify your email</h1>
      <p onClick={() => auth.signOut()}>We just send your verify link to {email}</p>
      <p onClick={() => setShowInput(prev => !prev)} >Set other email</p>
      {
        showInput ? 
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => changeUserEmail(e)} >
          <TextField value={newEmail} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)} label="New Email" variant="outlined" />
          <Button type="submit" size="large" variant="outlined">Submit</Button>
        </form>
        :
        null
      }
      <Snackbar open={showErrorMessage} autoHideDuration={4000} onClose={() => setShowErrorMessage(false)}>
        <Alert variant="filled" severity="error">{errorMessage}</Alert>
      </Snackbar>
    </div>
  )
}



export default VerifyEmailMessage;
