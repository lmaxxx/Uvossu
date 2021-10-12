import classes from './AsideListUser.module.scss'
import {User} from '../../types'
import {FC} from 'react'
import ImageLoader from '../../UI/ImageLoader/ImageLoader';

interface PropsType {
  user: User
  isSelected: boolean
  setSelectedUserIndex: () => void
}

const AsideListUser: FC<PropsType> = ({user, isSelected, setSelectedUserIndex}) => {
  const cls = [classes.AsideListUser]

  if(isSelected) {
    cls.push(classes.AsideListUserSelected)
  }

  return (
    <div onClick={setSelectedUserIndex} className={cls.join(" ")}>
      <ImageLoader src={user.photoURL} className={classes.AsideListUserAvatar} width={50} height={50} />
      <p className={classes.AsideListUserName}>{user.displayName}</p>
    </div>
  )
}

export default AsideListUser