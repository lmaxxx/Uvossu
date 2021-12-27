import classes from './VoiceMessage.module.scss'
import {useSelector} from "react-redux";
import {StoreType} from "../../Store";
import {FC, Ref, useRef} from 'react'
import {FormatDateType, Message, User} from "../../types";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import FormatDate from "../../UI/FormatDate/FormatDate";
import AudioPlayer from 'react-h5-audio-player';
import '../../player.scss'
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
  onContextMenu: any
  contextIsOpen: boolean
  setMessageRef: (param: any) => void
  replyingMessage: Message
}

const VoiceMessage: FC<PropsType> =
  ({
     isOwn,
     creator,
     renderUserInfo,
     time,
     src,
     onContextMenu,
     contextIsOpen,
     setMessageRef,
     replyingMessage
  }) => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const ref = useRef() as Ref<any>
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
                  <p className={getClass("Name").join(" ")}>{creator.displayName}</p><br></br>
                </>
                :
                <></>
            }
          </div>
          <div className={getClass("TextWrapper").join(" ")}>
            {!isEmpty(replyingMessage) && <RepliedMessage repliedMessage={replyingMessage} />}
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