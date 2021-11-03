import classes from './ChatFromList.module.scss'
import {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from '../../Store'
import {Chat, FormatDateType, User} from '../../types'
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import {setActiveChat} from "../../Store/chat/chatActions";
import FormatDate from "../../UI/FormatDate/FormatDate";

interface PropsType {
  chat: Chat
}

const ChatFromList: FC<PropsType> = ({chat}) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const usersObject = useSelector((state: StoreType) => state.app.usersObject)
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const chats = useSelector((state: StoreType) => state.chat.chats)
  const [chatUser, setChatUser] = useState<User>()
  const {theme} = currentUser
  const cls = [classes["ChatFromList" + theme]]

  if(chat.id === activeChat.id) {
    cls.push(classes["ChatFromList" + theme + "Active"])
  }

  useEffect(() => {
    setChatUser(usersObject[chat.membersUid.filter((uid: string) => uid !== currentUser.uid)[0]])
  }, [usersObject])

  useEffect(() => {
    setChatUser(usersObject[chat.membersUid.filter((uid: string) => uid !== currentUser.uid)[0]])
  }, [chats])

  return (
    <div className={cls.join(" ")} onClick={() => {
      dispatch(setActiveChat(chat))
    }}>
      <ImageLoader src={chatUser?.photoURL as string} className={classes["ChatFromList" + theme + "Avatar"]} width={50} height={50} />
      <div className={classes["ChatFromList" + theme + "MessageBody"]}>
        <p className={classes["ChatFromList" + theme + "Name"]}>{chatUser?.displayName}</p>
        <p className={classes["ChatFromList" + theme + "LastMessage"]}>{chat.lastMessage.value ? chat.lastMessage.value : "*Empty*"}</p>
        <FormatDate
          className={classes["ChatFromList" + theme + "LastMessageTime"]}
          time={chat.lastMessage.time}
          type={FormatDateType.FullDate}
          milliseconds={chat.lastMessageTime}
        />
      </div>
    </div>
  )
}

export default ChatFromList