import {useSelector, useDispatch} from "react-redux";
import classes from './ChatCodeEditor.module.scss'
import {useState, useEffect} from "react";
import {StoreType} from "../../Store";
import AceEditor from "react-ace";
import {changeCodeMode, setCodeStoreField} from "../../Store/code/codeActions";
import DarkOutlineInput from '../../UI/OutlineInput/DarkOutlineInput'
import LightOutlineInput from "../../UI/OutlineInput/LightOutlineInput";
import MenuItem from '@mui/material/MenuItem';
import modes from '../../editorModes'
import Button from "@mui/material/Button";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {sendCodeMessage} from "../../Store/chat/chatActions";
import useSound from "use-sound";
import sendMessageSound from "../../audio/send-message-sound.mp3";

const ChatCodeEditor = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const currentUserUid = useSelector((state: StoreType) => state.app.currentUser.uid)
  const replyingMessage = useSelector((state: StoreType) => state.chat.replyingMessage)
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const code = useSelector((state: StoreType) => state.code.chatCodeEditorValue)
  const editorMode = useSelector((state: StoreType) => state.code.chatCodeEditorMode)
  const [editorTheme, setEditorTheme] = useState<string>('tomorrow')
  const [play] = useSound(sendMessageSound)

  useEffect(() => {
    if(theme === "dark") {
      setEditorTheme("dracula")
    } else setEditorTheme("tomorrow")
  }, [theme])

  return (
    <div className={classes["ChatCodeEditor" + theme]}>
      <nav className={classes["ChatCodeEditor" + theme + "Navbar"]}>
        {
          theme === "dark" ?
            <DarkOutlineInput
              select
              label="Language"
              value={editorMode}
              onChange={(e: any) => dispatch(changeCodeMode(e.target.value))}
            >
              {
                modes.sort((a, b) =>
                  a.value.localeCompare(b.value)).map((mode: {value: string, label: string}) => (
                  <MenuItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </MenuItem>
                ))
              }
            </DarkOutlineInput>
            :
            <LightOutlineInput
              select
              label="Language"
              value={editorMode}
              onChange={(e: any) => dispatch(changeCodeMode(e.target.value))}
            >
              {
                modes.sort((a, b) =>
                  a.value.localeCompare(b.value)).map((mode: {value: string, label: string}) => (
                  <MenuItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </MenuItem>
                ))
              }
            </LightOutlineInput>
        }
        <Button
          onClick={() => dispatch(
          sendCodeMessage(
            code,
            editorMode,
            activeChat,
            currentUserUid as string,
            replyingMessage,
            play
          ))}
          className={classes["ChatCodeEditor" + theme + "Button"]}
        >
          <SendOutlinedIcon className={classes["ChatCodeEditor" + theme + "Icon"]} />
        </Button>
      </nav>
      <AceEditor
        placeholder="Write your code..."
        mode={editorMode}
        theme={editorTheme}
        name="messageCodeEditor"
        onChange={(newValue: string) => dispatch(setCodeStoreField("chatCodeEditorValue", newValue))}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        height={"100%"}
        width={"100%"}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}/>
    </div>
  )
}

export default ChatCodeEditor