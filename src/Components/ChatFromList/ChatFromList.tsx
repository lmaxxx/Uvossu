import classes from './ChatFromList.module.scss'
import {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from '../../Store'
import {Chat, FormatDateType, User} from '../../types'
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import {setActiveChat} from "../../Store/chat/chatActions";
import FormatDate from "../../UI/FormatDate/FormatDate";
import {isEmpty} from "lodash";

interface PropsType {
  chat: Chat
}

const ChatFromList: FC<PropsType> = ({chat}) => {
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

  if(chat.isGroup) {
    return (
      <div className={cls.join(" ")} onClick={() => {
        if(chat.id !== activeChat.id) {
          dispatch(setActiveChat(chat))
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
      if(chat.id !== activeChat.id) {
        dispatch(setActiveChat(chat))
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