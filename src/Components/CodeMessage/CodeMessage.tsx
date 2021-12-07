import classes from './CodeMessage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {FC, useEffect, useState} from 'react'
import {StoreType} from "../../Store";
import {FormatDateType, User} from "../../types";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import FormatDate from "../../UI/FormatDate/FormatDate";
import AceEditor from "react-ace";
import Tooltip  from "@material-ui/core/Tooltip";
import Button from "@mui/material/Button";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {copyTextToClipBoard} from "../../Store/chat/chatActions";

interface PropsType {
  isOwn: boolean
  creator: User,
  renderUserInfo: boolean,
  time: {
    hour: number
    minute: number
  },
  code: string
  codeMode: string
  contextIsOpen: boolean
  onContextMenu: any
}

const CodeMessage: FC<PropsType> =
  ({
     isOwn,
     creator,
     renderUserInfo,
     time,
     codeMode,
     code,
     onContextMenu,
     contextIsOpen
  }) => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const dispatch = useDispatch()
  const [isImported, setIsImported] = useState<boolean>(false)
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const wrappedCode = code.replaceAll("\\n", "\n")


    useEffect(() => {
      import(`ace-builds/src-noconflict/mode-${codeMode}`)
        .then(() => setIsImported(true))
    }, []);

  const getClass = (className: string) => {
    const cls = [classes["CodeMessage" + theme + className]]

    if (isOwn) {
      cls.push(classes["CodeMessage" + theme + className + "Own"])
    }

    if(contextIsOpen) {
      cls.push(classes["CodeMessage" + theme + className + "Open"])
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
        <div className={getClass("ButtonWrapper").join(" ")}>
          <Tooltip
            arrow
            title={"Copied"}
            placement={isOwn? "left" : "right"}
            open={showTooltip}
            leaveDelay={1000}
            onClose={() => setShowTooltip(false)}
          >
            <Button
              className={getClass("Button").join(" ")}
              onClick={() => {
                copyTextToClipBoard(wrappedCode)
                setShowTooltip(true)
              }}
            >
              <ContentCopyIcon className={getClass("Icon").join(" ")} />
            </Button>
          </Tooltip>
        </div>

          <AceEditor
              mode={isImported ? codeMode : ""}
              theme={theme === "dark" ? "dracula" : "tomorrow"}
              name={code}
              fontSize={13}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={false}
              readOnly={true}
              value={wrappedCode}
              minLines={1}
              maxLines={Infinity}
              setOptions={{
                showLineNumbers: true,
                tabSize: 2,
              }}
              className={getClass("Editor").join(" ")}
              style={theme === "light" ? {border: "1px solid #dcdcdc"} : {}}
          />
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



export default CodeMessage