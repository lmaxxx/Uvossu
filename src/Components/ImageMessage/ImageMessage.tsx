import classes from './ImageMessage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {FC} from 'react'
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import {FormatDateType, User} from "../../types";
import {StoreType} from "../../Store";
import FormatDate from "../../UI/FormatDate/FormatDate";
import {openImageViewer} from "../../Store/app/appActions";
import {downloadFile} from "../../Store/chat/chatActions";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


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

const ImageMessage: FC<PropsType> = (
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
    const cls = [classes["ImageMessage" + theme + className]]

    if (isOwn) {
      cls.push(classes["ImageMessage" + theme + className + "Own"])
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
          {/*<ImageLoader*/}
          {/*  src={src}*/}
          {/*  theme={theme}*/}
          {/*  square*/}
          {/*/>*/}
        <div className={getClass("ImageWrapper").join(" ")}>
          <img
            src={src}
            className={getClass("Image").join(" ")}
            alt=""
            onClick={() => dispatch(openImageViewer(src))}
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

export default ImageMessage