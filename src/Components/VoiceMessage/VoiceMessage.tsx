import classes from './VoiceMessage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../Store";
import {FC} from 'react'
import {FormatDateType, User} from "../../types";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import FormatDate from "../../UI/FormatDate/FormatDate";
import AudioPlayer from 'react-h5-audio-player';
import '../../player.scss'

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
}

const VoiceMessage: FC<PropsType> =
  ({
     isOwn,
     creator,
     renderUserInfo,
     time,
     fileName,
     fileExtension,
     src,
     onContextMenu,
     contextIsOpen
  }) => {
  const dispatch = useDispatch()
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const getClass = (className: string) => {
    const cls = [classes["VoiceMessage" + theme + className]]

    if (isOwn) {
      cls.push(classes["VoiceMessage" + theme + className + "Own"])
    }

    if(contextIsOpen) {
      cls.push(classes["VoiceMessage" + theme + className + "Open"])
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
            <AudioPlayer
              src={src}
              showSkipControls={false}
              showJumpControls={false}
              showDownloadProgress={false}
              customAdditionalControls={[]}
              layout={'horizontal-reverse'}
              className={getClass("Player").join(" ")}
              autoPlayAfterSrcChange={false}
            />
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

export default VoiceMessage