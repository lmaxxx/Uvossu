import classes from './AuthSignUpForm.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FC } from 'react'
import { ChangeEvent, FormEvent, useState } from 'react'

interface propsType {
  signUpWithEmailAndPassword: (e: FormEvent<HTMLFormElement>, nickname: string, email: string, password: string) => void
}

const AuthForm: FC<propsType> = ({signUpWithEmailAndPassword}) => {
  const [nickname, setNickname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')
  const [emailErrorText, setEmailErrorText] = useState<string>('')
  const [passwordErrorText, setPasswordErrorText] = useState<string>('')
  const [repeatPasswordErrorText, setRepeatPasswordErrorText] = useState<string>('')
  
  const isDisabled = () => {
    return ((!nickname || !email || !password || !repeatPassword) || (!!emailErrorText || !!passwordErrorText || !!repeatPasswordErrorText))
  } 

  const validate = (validatableInput: string) => {
    if(validatableInput === 'email') {
      const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(validEmail.test(email)) {
        setEmailErrorText('')
      } else {
        setEmailErrorText("Unvalid email address")
      }
    } 

    else if(validatableInput === 'password') {
      if(password.trim().length < 6) {
        setPasswordErrorText("Password should be at least 6 characters")
      } 
      else if(repeatPasswordErrorText && password === repeatPassword) {
        setRepeatPasswordErrorText('')
      }
      else if(!repeatPasswordErrorText && password !== repeatPassword) {
        setRepeatPasswordErrorText("Those passwords didn’t match")
      }
      else {
        setPasswordErrorText('')
      }
    } 
    
    else {
      if(!passwordErrorText && password !== repeatPassword) {
        setRepeatPasswordErrorText("Those passwords didn’t match")
      } else {
        setRepeatPasswordErrorText('')
      }
    }
  }

  return (
    <div className={classes.AuthForm}>
      <h1>Sign up</h1>
      <form onSubmit={e => signUpWithEmailAndPassword(e, nickname, email, password)}>
        <TextField
          value={nickname} 
          label="Nickname" 
          variant="outlined" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
        />
        <TextField
          error={!!emailErrorText}
          helperText={emailErrorText}
          value={email} 
          label="Email" 
          variant="outlined" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          onBlur={() => validate("email")}
        />
        <TextField
          error={!!passwordErrorText}
          helperText={passwordErrorText}
          value={password} 
          type={"password"} 
          label="Password" 
          variant="outlined" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          onBlur={() => validate("password")}
        />
        <TextField 
          error={!!repeatPasswordErrorText}
          helperText={repeatPasswordErrorText}
          value={repeatPassword}
          type={"password"} 
          label="Repeat Password" 
          variant="outlined" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setRepeatPassword(e.target.value)}
          onBlur={() => validate("repeatPassword")}
        />
        <Button 
          type="submit" 
          variant="contained"
          disabled={isDisabled()}
        >Submit</Button>
      </form>
    </div>
  )
}

export default AuthForm