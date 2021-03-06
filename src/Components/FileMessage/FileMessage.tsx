import classes from './FileMessage.module.scss'
import {FC, Ref, useRef} from 'react'
import {FormatDateType, Message, User} from '../../types'
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../Store";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import FormatDate from "../../UI/FormatDate/FormatDate";
import {downloadFile} from "../../Store/chat/chatActions";
import {isEmpty} from "lodash";
import RepliedMessage from "../RepliedMessage/RepliedMessage";

interface PropsType {
  isOwn: boolean
  creator: User
  renderUserInfo: boolean,
  time: {
    hour: number
    minute: number
  },
  src: string
  fileName: string
  onContextMenu: any
  fileExtension: string
  contextIsOpen: boolean
  setMessageRef: (param: any) => void
  replyingMessage: Message
}

const FileMessage: FC<PropsType> =
  ({
     isOwn,
     creator,
     renderUserInfo,
     time,
     fileName,
     fileExtension,
     src,
     onContextMenu,
     contextIsOpen,
     setMessageRef,
     replyingMessage
   }) => {

    const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
    const dispatch = useDispatch()
    const ref = useRef() as Ref<any>

    const getClass = (className: string) => {
      const cls = [classes["FileMessage" + theme + className]]

      if (isOwn) {
        cls.push(classes["FileMessage" + theme + className + "Own"])
      }

      if(contextIsOpen) {
        cls.push(classes["FileMessage" + theme + className + "Open"])
      }

      return cls
    }

    const openContext = (e: any) => {
      onContextMenu(e)
      setMessageRef(ref)
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
                  <p className={getClass("Name").join(" ")}>{creator.displayName}</p>
                </>
                :
                <></>
            }
          </div>
          <div className={getClass("RepliedMessageWrapper").join(" ")}>
            {!isEmpty(replyingMessage) && <RepliedMessage repliedMessage={replyingMessage} />}
          </div>
          <div className={getClass("TextWrapper").join(" ")}>
            <p
              onClick={() => dispatch(downloadFile(src, fileName, fileExtension))}
              className={getClass("Message").join(" ")}
              style={{cursor: "pointer"}}
            >
              {fileName}
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

export default FileMessage