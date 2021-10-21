import classes from './AsideListUser.module.scss'
import {User} from '../../types'
import {FC} from 'react'
import ImageLoader from '../../UI/ImageLoader/ImageLoader';
import {StoreType} from "../../Store";
import {useDispatch, useSelector} from "react-redux";
import {setActiveUserUid} from '../../Store/app/appActions'

interface PropsType {
  user: User
}

const AsideListUser: FC<PropsType> = ({user}) => {
  const activeUserUid = useSelector((state: StoreType) => state.app.activeUserUid)
  const dispatch = useDispatch()
  const cls = [classes.AsideListUser]

  if(activeUserUid === user.uid) {
    cls.push(classes.AsideListUserSelected)
  }

  return (
    <div
      className={cls.join(" ")}
      onClick={() => dispatch(setActiveUserUid(user.uid))}
    >
      <ImageLoader src={user.photoURL} className={classes.AsideListUserAvatar} width={50} height={50} />
      <p className={classes.AsideListUserName}>{user.displayName}</p>
    </div>
  )
}

export default AsideListUser