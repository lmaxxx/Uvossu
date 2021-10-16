import classes from './AuthSignInForm.module.scss'
import Button from '@mui/material/Button';
import {ChangeEvent, useState} from 'react'
import CustomOutlineInput from '../../UI/CustomOutlineInput/CustomOutlineInput';
import {useDispatch} from 'react-redux'
import {signINWithEmailAndPassword} from '../../Store/auth/authActions'

const AuthSignInForm = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch()

  const isDisabled = () => {
    return !email || !password
  }
  
  return (
    <div className={classes.AuthSignInForm}>
      <h1 className={classes.AuthSignInFormTitle}>Sign in</h1>
      <form className={classes.AuthSignInFormFormEl} onSubmit={e => dispatch(signINWithEmailAndPassword(e, email, password))}>
          <CustomOutlineInput 
            value={email}
            label="Email" 
            variant="outlined" 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className={classes.AuthSignInFormInput}
          />
          <CustomOutlineInput 
            value={password}
            type={"password"} 
            label="Password" 
            variant="outlined" 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className={classes.AuthSignInFormInput}
          />
        <Button className={classes.AuthSignInFormSubmit} disabled={isDisabled()} type="submit" size="large" variant="outlined">Submit</Button>
      </form>
    </div>
  )
}

export default AuthSignInForm