import {FC} from 'react'
import {useSelector} from 'react-redux'
import {StoreType} from '../../Store'
import {Message, MessageTypes} from "../../types";
import TextMessage from "../TextMessage/TextMessage";
import AlertMessage from "../AlertMessage/AlertMessage";
import TimeMessage from "../TimeMessage/TimeMessage";
import ImageMessage from "../ImageMessage/ImageMessage";
import VideoMessage from "../VideoMessage/VideoMessage";
import FileMessage from "../FileMessage/FileMessage";

interface TypeProps {
  messageProps: Message
  index: number
}

const ChatMessage: FC<TypeProps> =
  ({
     messageProps,
     index,
  }) => {
    const activeChatIsGroup = useSelector((state: StoreType) => state.chat.activeChat.isGroup)
    const messages: Message[] = useSelector((state: StoreType) => state.chat.messages)
    const currentUserUid = useSelector((state: StoreType) => state.app.currentUser.uid)
    const creator = useSelector((state: StoreType) => state.app.usersObject[messageProps.creatorUid])

    const renderUserInfo = () => {
      if (!activeChatIsGroup) {
        return false
      }

      if(creator.uid === currentUserUid) {
        return false
      }


      if (messages.length - 1 === index) {
        return true
      }

      if (messages[index + 1].creatorUid !== messages[index].creatorUid) {
        return true
      }

      const currentMessageMinutes = Math.floor(messageProps.createdAt / 60000)
      const previousMessageMinutes = Math.floor(messages[index + 1].createdAt / 60000)

      if(currentMessageMinutes - previousMessageMinutes < 10) {
        return false
      }

      return true
    }

    const renderDate = () => {
      if (messages.length - 1 === index) {
        return true
      }

      const currentMessageDate = new Date(messageProps.createdAt)
      const previousMessageDate = new Date(messages[index + 1].createdAt)
      const currentDateTime = currentMessageDate.getDate() + currentMessageDate.getMonth() + currentMessageDate.getFullYear()
      const previousDateTime = previousMessageDate.getDate() + previousMessageDate.getMonth() + previousMessageDate.getFullYear()

      if(currentDateTime !== previousDateTime) {
        return true
      }

      return false
    }

    switch(messageProps.type) {
      case MessageTypes.TEXT:
        return (
          <>
            <TextMessage
              time={messageProps.time}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              value={messageProps.value}
              renderUserInfo={renderUserInfo()}
            />
            {renderDate() && <TimeMessage milliseconds={messageProps.createdAt} time={messageProps.time} />}
          </>
        )

      case MessageTypes.ALERT:
        return (
          <>
            <AlertMessage
              time={messageProps.time}
              value={messageProps.value}
            />
            {renderDate() && <TimeMessage milliseconds={messageProps.createdAt} time={messageProps.time} />}
          </>
        )

      case MessageTypes.IMAGE:
        return (
          <>
            <ImageMessage
              src={messageProps.url as string}
              renderUserInfo={renderUserInfo()}
              time={messageProps.time}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              fileName={messageProps.fileName as string}
              fileExtension={messageProps.fileExtension as string}
            />
            {renderDate() && <TimeMessage milliseconds={messageProps.createdAt} time={messageProps.time} />}
          </>
        )

      case MessageTypes.VIDEO:
        return (
          <>
            <VideoMessage
              src={messageProps.url as string}
              renderUserInfo={renderUserInfo()}
              time={messageProps.time}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              fileName={messageProps.fileName as string}
              fileExtension={messageProps.fileExtension as string}
            />
            {renderDate() && <TimeMessage milliseconds={messageProps.createdAt} time={messageProps.time} />}
          </>
        )

      case MessageTypes.FILE:
        return (
          <>
            <FileMessage
              src={messageProps.url as string}
              renderUserInfo={renderUserInfo()}
              time={messageProps.time}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              fileName={messageProps.fileName as string}
            />
            {renderDate() && <TimeMessage milliseconds={messageProps.createdAt} time={messageProps.time} />}
          </>
        )
    }

  return (
    <></>
  )
}

export default ChatMessage