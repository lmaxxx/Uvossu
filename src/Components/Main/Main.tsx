import { Redirect } from 'react-router-dom';
import { auth, firestore } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import VerifyEmailMessage from '../VerifyEmailMessage/VerifyEmailMessage'
import { useCollectionData } from 'react-firebase-hooks/firestore';



function Main() {
  const [user] = useAuthState(auth)
  const citiesRef = firestore.collection("users").orderBy("uid")
  const [users] = useCollectionData(citiesRef, {idField: 'id'})
  console.table(users)
  
  if(!user) {
    return <Redirect to="auth" />
  } else {
    const {emailVerified, email} = auth.currentUser as {emailVerified: boolean, email: string}

    if(email) {
      return emailVerified ? 
      <div>
        {
          users?.map((user) => {
            return <div>
              <img style={{height: "100px", width: "100px"}} src={user.photoURL} />
              <p>{user.displayName}</p>
            </div>
          })
        }
      </div> 
      : <VerifyEmailMessage />
    }

    else return (
      <>
      {
        users?.map((user) => {
          return <div onClick={() => auth.signOut()}>
            <img style={{height: "100px", width: "100px"}} src={user.photoURL} />
            <p>{user.displayName}</p>
          </div>
        })
      }
      </>
    )
  }
}



export default Main;
