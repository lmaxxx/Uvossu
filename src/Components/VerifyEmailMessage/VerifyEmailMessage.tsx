import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import classes from './VerifyEmailMessage.module.scss'
import { FC, useState } from 'react'

interface propsType {
  email: string
}

const VerifyEmailMessage: FC<propsType> = ({email}) => {
  return (
    <div className={classes.VerifyEmailMessage}>
      <h1>We just send your verify link to {email}</h1>
    </div>
  )
}



export default VerifyEmailMessage;
