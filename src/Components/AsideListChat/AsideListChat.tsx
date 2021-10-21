import classes from './AsideListChat.module.scss'
import {FC, useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from '../../Store'
import {Chat, User} from '../../types'
import ImageLoader from "../../UI/ImageLoader/ImageLoader";

interface PropsType {
  chat: Chat
}

const AsideListChat: FC<PropsType> = ({chat}) => {
  // const dispatch = useDispatch()
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const usersObject = useSelector((state: StoreType) => state.app.usersObject)
  const [chatUser, setChatUser] = useState<User>()

  useEffect(() => {
    setChatUser(usersObject[chat.membersUid.filter((uid: string) => uid !== currentUser.uid)[0]])
  }, [usersObject])

  return (
    <div className={classes.AsideListChat}>
      <ImageLoader src={chatUser?.photoURL as string} className={classes.AsideListChatAvatar} width={50} height={50} />
      <p className={classes.AsideListChatName}>{chatUser?.displayName}</p>
    </div>
  )
}

export default AsideListChat