import { Redirect } from 'react-router-dom';
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import VerifyEmailMessage from '../VerifyEmailMessage/VerifyEmailMessage'

function Main() {
  const [user] = useAuthState(auth)
  
  if(!user) {
    return <Redirect to="auth" />
  } else {
    const {emailVerified, email} = auth.currentUser as {emailVerified: boolean, email: string}

    if(email) {
      return emailVerified ? <h1 onClick={() => auth.signOut()}>Main</h1> : <VerifyEmailMessage />
    }

    else return <h1 onClick={() => auth.signOut()}>Main</h1>
  }
}



export default Main;
