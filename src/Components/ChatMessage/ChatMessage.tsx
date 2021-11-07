import classes from './ChatMessage.module.scss'
import {FC} from 'react'
import {useSelector} from 'react-redux'
import {StoreType} from '../../Store'
import {FormatDateType, Message, User} from "../../types";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import FormatDate from "../../UI/FormatDate/FormatDate";

interface TypeProps {
  user: User
  messageProps: Message
  index: number
  isOwn: boolean
}

const ChatMessage: FC<TypeProps> =
  ({
     messageProps,
     index,
     isOwn,
     user,
  }) => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const activeChatIsGroup = useSelector((state: StoreType) => state.chat.activeChat.isGroup)
  const messages: Message[] = useSelector((state: StoreType) => state.chat.messages)


  const getClass = (className: string) => {
    const cls = [classes["ChatMessage" + theme  + className]]

    if(isOwn) {
      cls.push(classes["ChatMessage" + theme  + className + "Own"])
    }

    if(activeChatIsGroup) {
      cls.push(classes["ChatMessage" + theme  + className + "Group"])
    }

    return cls
  }

  const renderName = () => {
    if(!activeChatIsGroup) {
      return false
    }
  }

  const renderAvatar = () => {
    if(!activeChatIsGroup) {
      return false
    }

    if(messages.length === 1){
      return true
    }

    if(messages.length - 1 === index) {
      return true
    }

    if(messages[index + 1].creatorUid !== user.uid) {
      return true
    }

    const currentMessageMinutes = Math.floor(messageProps.createdAt / 60000)
    const previousMessageMinutes = Math.floor(messages[index + 1].createdAt / 60000)

    if(currentMessageMinutes - previousMessageMinutes < 10) {
      return false
    }

    return true
  }

  return (
    <div className={getClass("MessageWrapper").join(" ")}>
      {
        renderAvatar() ?
          <ImageLoader
            className={getClass("Avatar").join(" ")}
            src={user.photoURL}
            height={50}
            width={50}
          />
          :
          <></>
      }
      <div className={getClass("TextWrapper").join(" ")}>
        {renderName() && <><p className={getClass("Name").join(" ")}>{user.displayName}</p><br></br></>}
        <p className={getClass("Message").join(" ")}>{messageProps.value}</p>
        <p className={getClass("Time").join(" ")}>
          <FormatDate
            type={FormatDateType.Hour}
            time={messageProps.time}
          />
        </p>
      </div>
    </div>
  )

}

export default ChatMessage