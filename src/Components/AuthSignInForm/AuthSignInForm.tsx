import classes from './AuthSignInForm.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FC} from 'react'
import {ChangeEvent, FormEvent, useState} from 'react'

interface propsType {
  signInWithEmailAndPassword: (e: FormEvent<HTMLFormElement>, email: string, password: string) => void
}

const AuthSignInForm: FC<propsType> = ({signInWithEmailAndPassword}) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <div className={classes.AuthSignInForm}>
      <h1>Sign in</h1>
      <form onSubmit={e => signInWithEmailAndPassword(e, email, password)}>
        <TextField 
          value={email}
          label="Email" 
          variant="outlined" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <TextField 
          value={password}
          type={"password"} 
          label="Password" 
          variant="outlined" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </div>
  )
}

export default AuthSignInForm