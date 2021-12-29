import classes from './CodeMessage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {FC, Ref, useEffect, useRef, useState} from 'react'
import {StoreType} from "../../Store";
import {FormatDateType, User} from "../../types";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import FormatDate from "../../UI/FormatDate/FormatDate";
import AceEditor from "react-ace";
import Tooltip  from "@material-ui/core/Tooltip";
import Button from "@mui/material/Button";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {copyTextToClipBoard} from "../../Store/chat/chatActions";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {runCodeFromChat} from "../../Store/code/codeActions";
import modes from '../../compilerModes'
import {isEmpty} from "lodash";
import RepliedMessage from "../RepliedMessage/RepliedMessage";

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
  setMessageRef: (param: any) => void
  replyingMessage: any
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
     contextIsOpen,
     setMessageRef,
     replyingMessage
  }) => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const dispatch = useDispatch()
  const [isImported, setIsImported] = useState<boolean>(false)
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const wrappedCode = code.replaceAll("\\n", "\n")
  const ref = useRef() as Ref<any>


    useEffect(() => {
      import(`ace-builds/src-noconflict/mode-${codeMode}`)
        .then(() => setIsImported(true))
    }, []);

    const openContext = (e: any) => {
      onContextMenu(e)
      setMessageRef(ref)
    }

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
        <div className={getClass("ButtonWrapper").join(" ")}>
          {
            modes.filter((obj: any) => obj.value === codeMode).length > 0 && <Tooltip
              title={"Run code"}
              placement={isOwn? "left" : "right"}
            >
              <Button
                className={getClass("Button").join(" ")}
                onClick={() => dispatch(runCodeFromChat(wrappedCode, codeMode))}
              >
                <PlayArrowIcon className={getClass("Icon").join(" ")} />
              </Button>
            </Tooltip>
          }

          <Tooltip
            arrow
            title={"Copied"}
            placement={isOwn? "right" : "left"}
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