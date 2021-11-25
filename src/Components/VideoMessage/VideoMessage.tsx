import classes from './VideoMessage.module.scss'
import {useSelector, useDispatch} from "react-redux"
import {FC} from 'react'
import ReactPlayer from "react-player";
import {StoreType} from "../../Store";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {downloadFile} from "../../Store/chat/chatActions";
import FormatDate from "../../UI/FormatDate/FormatDate";
import {FormatDateType, User} from "../../types";

interface PropsType {
  src: string
  isOwn: boolean
  creator: User
  renderUserInfo: boolean
  fileName: string
  fileExtension: string
  time: {
    hour: number
    minute: number
  }
}

const VideoMessage: FC<PropsType> = (
  {
    src,
    isOwn,
    creator,
    renderUserInfo,
    time,
    fileName,
    fileExtension
  }
) => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const dispatch = useDispatch()

  const getClass = (className: string) => {
    const cls = [classes["VideoMessage" + theme + className]]

    if (isOwn) {
      cls.push(classes["VideoMessage" + theme + className + "Own"])
    }

    return cls
  }

  return (
    <div className={getClass("").join(" ")}>
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
        <div className={getClass("ImageWrapper").join(" ")}>
          <ReactPlayer
            url={src}
            controls
            width={"400px"}
            height={"100%"}
          />
          <FileDownloadOutlinedIcon
            onClick={() => dispatch(downloadFile(src, fileName, fileExtension))}
            className={getClass("Icon").join(" ")}
          />
        </div>
        <p className={getClass("Time").join(" ")}>
          <FormatDate
            type={FormatDateType.Hour}
            time={time}
          />
        </p>
      </div>
    </div>
  )
}

export default VideoMessage