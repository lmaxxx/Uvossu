import classes from './ChatFromList.module.scss'
import {FC} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from '../../Store'
import {Chat, FormatDateType, Message} from '../../types'
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import {setActiveChat, readNewMessages, forwardMessage, setChatStoreField, endRecording} from "../../Store/chat/chatActions";
import FormatDate from "../../UI/FormatDate/FormatDate";
import {isEmpty} from "lodash";

interface PropsType {
  chat: Chat,
  message?: Message
}

const ChatFromList: FC<PropsType> = ({chat, message}) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const userUid = chat.membersUid.filter((uid: string) => uid != currentUser.uid)
  const chatUser = useSelector((state: StoreType) => state.app.usersObject[userUid[0]])
  const {theme} = currentUser
  const cls = [classes["ChatFromList" + theme]]

  if(chat.id === activeChat.id) {
    cls.push(classes["ChatFromList" + theme + "Active"])
  }

  if(!chat.readLastMessageMembersUid.includes(currentUser.uid as string)) {
    cls.push(classes["ChatFromList" + theme + "NewMessage"])
  }

  if(chat.isGroup) {
    return (
      <div className={cls.join(" ")} onClick={() => {
        if(message) {
          dispatch(forwardMessage(chat, message, currentUser.uid as string))
        } else {
          if(chat.id !== activeChat.id) {
            dispatch(setChatStoreField("replyingMessage", {} as Message))
            dispatch(endRecording(true))
            dispatch(setActiveChat(chat))
            if(!chat.readLastMessageMembersUid.includes(currentUser.uid as string)) {
              dispatch(readNewMessages(chat, currentUser.uid as string))
            }
          }
        }
      }}>
        <ImageLoader
          src={chat.photoURL as string}
          className={classes["ChatFromList" + theme + "Avatar"]}
          width={37}
          height={37}
          theme={theme}
        />
        <div className={classes["ChatFromList" + theme + "MessageBody"]}>
          <p className={classes["ChatFromList" + theme + "Name"]}>{chat.name}</p>
          {
            chat.lastMessage.value ?
              <p className={classes["ChatFromList" + theme + "LastMessage"]}>{chat.lastMessage.value}</p>
              :
              <i className={classes["ChatFromList" + theme + "LastMessage"]}>*Empty*</i>
          }
          {
            isEmpty(chat.lastMessage) ?
              <p
                className={classes["ChatFromList" + theme + "LastMessageTime"]}
              ></p>
              :
              <FormatDate
                className={classes["ChatFromList" + theme + "LastMessageTime"]}
                time={chat.lastMessage.time}
                type={FormatDateType.FullDate}
                milliseconds={chat.lastMessageTime}
              />
          }
        </div>
      </div>
    )
  }

  return (
    <div className={cls.join(" ")} onClick={() => {
      if(message) {
        dispatch(forwardMessage(chat, message, currentUser.uid as string))
      } else {
        if(chat.id !== activeChat.id) {
          dispatch(setChatStoreField("replyingMessage", {} as Message))
          dispatch(endRecording(true))
          dispatch(setActiveChat(chat))
          if(!chat.readLastMessageMembersUid.includes(currentUser.uid as string)) {
            dispatch(readNewMessages(chat, currentUser.uid as string))
          }
        }
      }
    }}>
      <ImageLoader
        src={chatUser?.photoURL as string}
        className={classes["ChatFromList" + theme + "Avatar"]}
        width={37}
        height={37}
        theme={theme}
      />
      <div className={classes["ChatFromList" + theme + "MessageBody"]}>
        <p className={classes["ChatFromList" + theme + "Name"]}>{chatUser?.displayName}</p>
        {
          chat.lastMessage.value ?
            <p className={classes["ChatFromList" + theme + "LastMessage"]}>{chat.lastMessage.value.replaceAll("\\n", "\n")}</p>
            :
            <i className={classes["ChatFromList" + theme + "LastMessage"]}>*Empty*</i>
        }
        {
          isEmpty(chat.lastMessage) ?
            <p
              className={classes["ChatFromList" + theme + "LastMessageTime"]}
            ></p>
            :
            <FormatDate
              className={classes["ChatFromList" + theme + "LastMessageTime"]}
              time={chat.lastMessage.time}
              type={FormatDateType.FullDate}
              milliseconds={chat.lastMessageTime}
            />
        }
      </div>
    </div>
  )
}

export default ChatFromList