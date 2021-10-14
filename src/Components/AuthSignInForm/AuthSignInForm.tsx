import classes from './AuthSignInForm.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FC} from 'react'
import {ChangeEvent, FormEvent, useState} from 'react'
import CustomOutlineInput from '../../UI/CustomOutlineInput/CustomOutlineInput';

interface propsType {
  signInWithEmailAndPassword: (e: FormEvent<HTMLFormElement>, email: string, password: string) => void
}

const AuthSignInForm: FC<propsType> = ({signInWithEmailAndPassword}) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const isDisabled = () => {
    return !email || !password
  }

  return (
    <div className={classes.AuthSignInForm}>
      <h1 className={classes.AuthSignInFormTitle}>Sign in</h1>
      <form className={classes.AuthSignInFormFormEl} onSubmit={e => signInWithEmailAndPassword(e, email, password)}>
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