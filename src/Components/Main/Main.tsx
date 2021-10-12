import { Redirect } from 'react-router-dom';
import { auth } from '../../firebase'
import VerifyEmailMessage from '../VerifyEmailMessage/VerifyEmailMessage'
import ChatAppWrapper from '../ChatAppWrapper/ChatAppWrapper'

function Main() {
  if(auth.currentUser?.displayName === undefined) {
    return <Redirect to="auth" />
  } else {
    const {emailVerified, email} = auth.currentUser as {emailVerified: boolean, email: string}

    if(email) {
      return emailVerified ? <ChatAppWrapper /> : <VerifyEmailMessage />
    }

    return <ChatAppWrapper />
  }
}


export default Main;
