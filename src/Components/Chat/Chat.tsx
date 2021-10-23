import classes from './Chat.module.scss'
import {useSelector} from "react-redux";
import {StoreType} from "../../Store";
import ChatBar from '../ChatBar/ChatBar'
import ChatForm from '../ChatForm/ChatForm'
import ChatMessagesList from "../ChatMessagesList/ChatMessagesList";

const Chat = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)

  return (
    <div className={classes["Chat" + theme]}>
      <ChatBar />
      <ChatMessagesList />
      <ChatForm />
    </div>
  )
}

export default Chat