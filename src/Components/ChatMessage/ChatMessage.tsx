import {FC} from 'react'
import {useSelector} from 'react-redux'
import {StoreType} from '../../Store'
import {Message} from "../../types";
import TextMessage from "../TextMessage/TextMessage";
import AlertMessage from "../AlertMessage/AlertMessage";

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

      if (messages.length === 1) {
        return true
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

    if(messageProps.type === "text") {
      return <TextMessage
            time={messageProps.time}
            isOwn={currentUserUid === messageProps.creatorUid}
            creator={creator}
            value={messageProps.value}
            renderUserInfo={renderUserInfo()}
          />
    }

    if(messageProps.type === "alert") {
      return <AlertMessage
        time={messageProps.time}
        value={messageProps.value}
      />
    }

  return (
    <></>
  )
}

export default ChatMessage