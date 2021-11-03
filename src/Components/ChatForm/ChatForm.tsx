import classes from './ChatForm.module.scss'
import LoadingButton from "@mui/lab/LoadingButton";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, setChatStoreField} from "../../Store/chat/chatActions";
import {StoreType} from '../../Store'
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import sendMessageSound from '../../audio/send-message-sound.mp3'
import useSound from 'use-sound'
import TextareaAutosize from 'react-textarea-autosize';
import {KeyboardEvent} from "react";

const ChatForm = () => {
  const dispatch = useDispatch()
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const currentUserUid = useSelector((state: StoreType) => state.app.currentUser.uid)
  const chatFormInputValue = useSelector((state: StoreType) => state.chat.chatFormInputValue)
  const isSending = useSelector((state: StoreType) => state.chat.isSending)
  const [play] = useSound(sendMessageSound)

  const textAreaKeyDown = (e: any) => {
    if(e.ctrlKey && e.keyCode === 13) {
      dispatch(setChatStoreField("chatFormInputValue", e.target.value + "\n"))
    }
    else if(e.keyCode === 13) {
      dispatch(sendMessage(e, activeChat, chatFormInputValue, play, currentUserUid))
    }
  }

  return (
    <form onSubmit={(e) => {
      dispatch(sendMessage(e, activeChat, chatFormInputValue, play, currentUserUid))
    }}>
      <TextareaAutosize
        cacheMeasurements
        value={chatFormInputValue}
        onChange={(e) => dispatch(setChatStoreField("chatFormInputValue", e.target.value))}
        onKeyDown={(e:KeyboardEvent<HTMLTextAreaElement>) => textAreaKeyDown(e)}
      />
      <LoadingButton
        type={"submit"}
        loading={isSending}
        loadingPosition="end"
        endIcon={chatFormInputValue && !/^\n+$/.test(chatFormInputValue) ? <SendIcon /> : <MicIcon />}
        variant="text"
      ></LoadingButton>
    </form>
  )
}

export default ChatForm