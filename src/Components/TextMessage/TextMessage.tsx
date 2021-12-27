import classes from './TextMessage.module.scss'
import {FC, Ref, useRef} from 'react'
import {FormatDateType, Message, User} from '../../types'
import {useSelector} from "react-redux";
import {StoreType} from "../../Store";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import FormatDate from "../../UI/FormatDate/FormatDate";
import RepliedMessage from "../RepliedMessage/RepliedMessage";
import {isEmpty} from 'lodash'

interface PropsType {
  isOwn: boolean
  creator: User,
  renderUserInfo: boolean,
  time: {
    hour: number
    minute: number
  },
  value: string
  contextIsOpen: boolean
  onContextMenu: any
  setMessageRef: (param: any) => void
  replyingMessage: Message
}

const TextMessage: FC<PropsType> =
  ({
    isOwn,
     creator,
     renderUserInfo,
     time,
    value,
    onContextMenu,
     contextIsOpen,
     setMessageRef,
     replyingMessage,
  }) => {

  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const splitedValue = value.replaceAll("\\n", "\n").split("\n")
  const ref = useRef() as Ref<any>
  const spacedValue = splitedValue.map((line: string) => {
    if(line) {
      return <>{line}<br></br></>
    }
  })

  const openContext = (e: any) => {
    onContextMenu(e)
    setMessageRef(ref)
  }

  const getClass = (className: string) => {
    const cls = [classes["TextMessage" + theme + className]]

    if (isOwn) {
      cls.push(classes["TextMessage" + theme + className + "Own"])
    }

    if(contextIsOpen) {
      cls.push(classes["TextMessage" + theme + className + "Open"])
    }

    return cls
  }

  return (
    <div ref={ref} onContextMenu={openContext} className={getClass("").join(" ")}>
      <div className={getClass("MessageWrapper").join(" ")}>
        <div className={getClass("UserInfoWrapper").join(" ")}>
          {
            renderUserInfo ?
              <>
                <ImageLoader
                  className={getClass("Avatar").join(" ")}
                  src={creator.photoURL}
                  height={50}
                  width={50}
                />
                <p className={getClass("Name").join(" ")}>{creator.displayName}</p><br></br>
              </>
              :
              <></>
          }
        </div>
          <div className={getClass("RepliedMessageWrapper").join(" ")}>
            {!isEmpty(replyingMessage) && <RepliedMessage repliedMessage={replyingMessage} />}
          </div>
          <div className={getClass("TextWrapper").join(" ")}>
            <p className={getClass("Message").join(" ")}>
              {spacedValue}
            </p>
            <p className={getClass("Time").join(" ")}>
              <FormatDate
                type={FormatDateType.Hour}
                time={time}
              />
            </p>
          </div>
      </div>
    </div>
  )
}

export default TextMessage