import classes from './FileMessage.module.scss'
import {FC} from 'react'
import {FormatDateType, Message, User} from '../../types'
import {useSelector} from "react-redux";
import {StoreType} from "../../Store";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import FormatDate from "../../UI/FormatDate/FormatDate";

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
}

const FileMessage: FC<PropsType> =
  ({
     isOwn,
     creator,
     renderUserInfo,
     time,
     fileName,
     src,
     onContextMenu
   }) => {

    const theme = useSelector((state: StoreType) => state.app.currentUser.theme)

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
            <a
              href={src}
              className={getClass("Message").join(" ")}>
              {fileName}
            </a>
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