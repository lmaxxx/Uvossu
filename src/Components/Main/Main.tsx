import { Redirect } from 'react-router-dom';
import { auth } from '../../firebase'
import VerifyEmailMessage from '../VerifyEmailMessage/VerifyEmailMessage'
import ChatAppWrapper from '../ChatAppWrapper/ChatAppWrapper'
import {useSelector} from 'react-redux'
import {StoreType} from '../../Store'

function Main() {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)


  if(Object.entries(currentUser).length === 0) {
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
