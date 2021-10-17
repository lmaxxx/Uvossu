import classes from './AsideListUser.module.scss'
import {User} from '../../types'
import {FC} from 'react'
import ImageLoader from '../../UI/ImageLoader/ImageLoader';

interface PropsType {
  user: User
}

const AsideListUser: FC<PropsType> = ({user}) => {
  return (
    <div className={classes.AsideListUser}>
      <ImageLoader src={user.photoURL} className={classes.AsideListUserAvatar} width={50} height={50} />
      <p className={classes.AsideListUserName}>{user.displayName}</p>
    </div>
  )
}

export default AsideListUser