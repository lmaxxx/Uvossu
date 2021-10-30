import classes from './AsideListChat.module.scss'
import {FC, useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from '../../Store'
import {Chat, User} from '../../types'
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import {setActiveChat} from "../../Store/chat/chatActions";
import isEqual from 'lodash/isEqual';

interface PropsType {
  chat: Chat
}

const AsideListChat: FC<PropsType> = ({chat}) => {
  const cls = [classes.AsideListChat]
  const dispatch = useDispatch()
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const usersObject = useSelector((state: StoreType) => state.app.usersObject)
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const privateChats = useSelector((state: StoreType) => state.chat.privateChats)
  const [chatUser, setChatUser] = useState<User>()

  if(isEqual(chat, activeChat)) {
    cls.push(classes.AsideListChatSelected)
  }

  useEffect(() => {
    setChatUser(usersObject[chat.membersUid.filter((uid: string) => uid !== currentUser.uid)[0]])
  }, [usersObject])

  useEffect(() => {
    setChatUser(usersObject[chat.membersUid.filter((uid: string) => uid !== currentUser.uid)[0]])
  }, [privateChats])

  useEffect(() => {
    if(isEqual(chat, activeChat)) {
      cls.push(classes.AsideListChatSelected)
    }
  }, [activeChat])

  return (
    <div className={cls.join(" ")} onClick={() => {
      dispatch(setActiveChat(chat))
    }}>
      <ImageLoader src={chatUser?.photoURL as string} className={classes.AsideListChatAvatar} width={50} height={50} />
      <p className={classes.AsideListChatName}>{chatUser?.displayName}</p>
    </div>
  )
}

export default AsideListChat