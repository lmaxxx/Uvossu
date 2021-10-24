import classes from './ChatForm.module.scss'
import CustomOutlineInput from "../../UI/CustomOutlineInput/CustomOutlineInput";
import LoadingButton from "@mui/lab/LoadingButton";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, setChatStoreField} from "../../Store/chat/chatActions";
import {StoreType} from '../../Store'
import SendIcon from '@mui/icons-material/Send';
import sendMessageSound from '../../audio/send-message-sound.mp3'
import useSound from 'use-sound'

const ChatForm = () => {
  const dispatch = useDispatch()
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const currentUserUid = useSelector((state: StoreType) => state.app.currentUser.uid)
  const chatFormInputValue = useSelector((state: StoreType) => state.chat.chatFormInputValue)
  const isSending = useSelector((state: StoreType) => state.chat.isSending)
  const [play] = useSound(sendMessageSound)


  return (
    <form onSubmit={(e) => {
      dispatch(sendMessage(e, activeChat, chatFormInputValue, play, currentUserUid))
    }}>
      <CustomOutlineInput  value={chatFormInputValue} onChange={(e) => dispatch(setChatStoreField("chatFormInputValue", e.target.value))} />
      <LoadingButton
        type={"submit"}
        loading={isSending}
        loadingPosition="end"
        endIcon={<SendIcon />}
        variant="outlined"
      >Send</LoadingButton>
    </form>
  )
}

export default ChatForm