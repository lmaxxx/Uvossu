import classes from './AsideUser.module.scss'
import {useContext, useState, useEffect} from 'react'
import {ThemeContext} from '../ChatAppWrapper/ChatAppWrapper'
import {firestore, auth} from '../../firebase'
import {User as UserType} from '../../types'
import SettingsIcon from '@mui/icons-material/Settings'
import {NavLink} from 'react-router-dom'
import ImageLoader from '../../UI/ImageLoader/ImageLoader'

const AsideUser = () => {
  const theme = useContext(ThemeContext)
  const [currentUser, setCurrentUser] = useState<UserType>()

  useEffect(() => {
    if(auth.currentUser?.uid !== undefined) {
      const {uid} = auth.currentUser as {uid: string}

      firestore.collection('users').doc(uid).get()
        .then((doc: any) => {
          setCurrentUser(doc.data())
        })
    }
  }, [auth.currentUser])

  return (
    <div className={classes["User" + theme]}>
      <div className={classes["User" + theme + "AvatarNameWrapper"]}>
        <ImageLoader width={50} height={50} src={currentUser?.photoURL as string} className={classes["User" + theme + "Avatar"]} />
        <p className={classes["User" + theme + "Name"]}>{currentUser?.displayName}</p>
      </div>
      <NavLink to="/settings"><SettingsIcon className={classes["User" + theme + "Icon"]} /></NavLink>
    </div>
  )


}

export default AsideUser