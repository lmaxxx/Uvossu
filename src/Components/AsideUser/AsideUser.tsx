import classes from './AsideUser.module.scss'
import SettingsIcon from '@mui/icons-material/Settings'
import {NavLink} from 'react-router-dom'
import ImageLoader from '../../UI/ImageLoader/ImageLoader'
import {useSelector} from 'react-redux'
import {StoreType} from '../../Store/'

const AsideUser = () => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const {theme} = currentUser

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