import classes from './AuthSignUpForm.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FC } from 'react'
import { ChangeEvent, FormEvent, useState } from 'react'

interface propsType {
  signUpWithEmailAndPassword: (e: FormEvent<HTMLFormElement>, name: string, email: string, password: string) => void
}

const AuthForm: FC<propsType> = ({signUpWithEmailAndPassword}) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')
  const [emailErrorText, setEmailErrorText] = useState<string>('')
  const [passwordErrorText, setPasswordErrorText] = useState<string>('')
  const [repeatPasswordErrorText, setRepeatPasswordErrorText] = useState<string>('')
  const [nameErrorText, setNameErrorText] = useState<string>('')
  
  const isDisabled = () => {
    return ((!name || !email || !password || !repeatPassword) || (!!emailErrorText || !!passwordErrorText || !!repeatPasswordErrorText || !!nameErrorText))
  } 

  const validate = (validatableInput: 'email' | 'password' | 'repeatPassword' | 'name') => {
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
      else if(!repeatPasswordErrorText && password !== repeatPassword && repeatPassword !== '') {
        setRepeatPasswordErrorText("Those passwords didn’t match")
      }
      else {
        setPasswordErrorText('')
      }
    } 
    
    else if(validatableInput === 'repeatPassword') {
      if(!passwordErrorText && password !== repeatPassword) {
        setRepeatPasswordErrorText("Those passwords didn’t match")
      } else {
        setRepeatPasswordErrorText('')
      }
    }

    else {
      if(name.trim().length < 3) {
        setNameErrorText("Name should be at least 3 characters")
      } else {
        setNameErrorText('')
      }
    }
  }

  return (
    <div className={classes.AuthSignUpForm}>
      <h1 className={classes.AuthSignUpFormTitle}>Sign up</h1>
      <form className={classes.AuthSignUpFormFormEl} onSubmit={e => signUpWithEmailAndPassword(e, name, email, password)}>
        <TextField          
          error={!!nameErrorText}
          helperText={nameErrorText}
          value={name} 
          label="Name" 
          variant="outlined" 
          onChange={(e: ChangeEvent<HTMLInputElement>) =>  setName(e.target.value)}
          className={classes.AuthSignUpFormInput}
          onBlur={() => validate("name")}
        />
        <TextField
          error={!!emailErrorText}
          helperText={emailErrorText}
          value={email} 
          label="Email" 
          variant="outlined" 
          onChange={(e: ChangeEvent<HTMLInputElement>) =>  setEmail(e.target.value)}
          onBlur={() => validate("email")}
          className={classes.AuthSignUpFormInput}
        />
        <TextField
          error={!!passwordErrorText}
          helperText={passwordErrorText}
          value={password} 
          type={"password"} 
          label="Password" 
          variant="outlined" 
          onChange={(e: ChangeEvent<HTMLInputElement>) =>  setPassword(e.target.value)}
          onBlur={() => validate("password")}
          className={classes.AuthSignUpFormInput}
        />
        <TextField 
          error={!!repeatPasswordErrorText}
          helperText={repeatPasswordErrorText}
          value={repeatPassword}
          type={"password"} 
          label="Repeat Password" 
          variant="outlined" 
          onChange={(e: ChangeEvent<HTMLInputElement>) =>  setRepeatPassword(e.target.value)}
          onBlur={() => validate("repeatPassword")}
          className={classes.AuthSignUpFormInput}
        />
        <Button 
          type="submit" 
          variant="outlined"
          disabled={isDisabled()}
          size="large"
        >Submit</Button>
      </form>
    </div>
  )
}

export default AuthForm