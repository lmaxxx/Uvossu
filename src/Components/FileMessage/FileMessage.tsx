import classes from './FileMessage.module.scss'
import {FC} from 'react'
import {FormatDateType, Message, User} from '../../types'
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../Store";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import FormatDate from "../../UI/FormatDate/FormatDate";
import {downloadFile} from "../../Store/chat/chatActions";

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
     onContextMenu
   }) => {

    const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
    const dispatch = useDispatch()

    const getClass = (className: string) => {
      const cls = [classes["FileMessage" + theme + className]]

      if (isOwn) {
        cls.push(classes["FileMessage" + theme + className + "Own"])
      }

      return cls
    }

    return (
      <div onContextMenu={onContextMenu} className={getClass("").join(" ")}>
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
          <div className={getClass("TextWrapper").join(" ")}>
            <p
              onClick={() => dispatch(downloadFile(src, fileName, fileExtension))}
              className={getClass("Message").join(" ")}>
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