import classes from './ChatMessagesList.module.scss'
import {useSelector, useDispatch} from "react-redux";
import {firestore} from "../../firebase";
import {StoreType} from '../../Store'
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Message} from '../../types'
import {useEffect} from "react";
import {setChatStoreField, loadMessages} from "../../Store/chat/chatActions";
import InfiniteScroll from 'react-infinite-scroll-component'
import ChatMessage from "../ChatMessage/ChatMessage";
import Loader from '../../UI/Loader/Loader'


const ChatMessagesList = () => {
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const messages = useSelector((state: StoreType) => state.chat.messages)
  const messagesLimit = useSelector((state: StoreType) => state.chat.messagesLimit)
  const hasMoreMessages = useSelector((state: StoreType) => state.chat.hasMoreMessages)
  const query = firestore.collection("chats")
    .doc(activeChat.id)
    .collection("messages")
    .orderBy("createdAt", "desc")
    .limit(messagesLimit)
  const [uncontrolledMessages] = useCollectionData(query, {idField: "id"})
  const gotMessages = useSelector((state: StoreType) => state.chat.gotMessages)
  const dispatch = useDispatch()

  useEffect(() => {
    if(uncontrolledMessages) {
      dispatch(setChatStoreField("messages", uncontrolledMessages))
      dispatch(setChatStoreField("gotMessages", true))
      dispatch(setChatStoreField("isSending", false))
      if(uncontrolledMessages.length < messagesLimit) {
        dispatch(setChatStoreField("hasMoreMessages", false))
      } else {
        dispatch(setChatStoreField("hasMoreMessages", true))
      }
    }
  }, [uncontrolledMessages])

  if(!gotMessages) {
    return <Loader
      height={"100%"}
      width={"100%"}
      type={"ThreeDots"}
      backgroundColor={"initial"}
      loaderHeight={50}
      loaderWidth={50}
    />
  }

  return (
    <div className={classes.ChatMessagesList}>
      <InfiniteScroll
        dataLength={messages.length}
        next={() => dispatch(loadMessages())}
        style={{display: 'flex', flexDirection: 'column-reverse'}}
        className={classes.ChatMessagesListWrapper}
        inverse={true}
        hasMore={hasMoreMessages}
        height={"100%"}
        loader={<></>}
      >
        {messages?.map((message:Message, index) => (
          <ChatMessage
            index={index}
            key={message.id}
            messageProps={message}
          />
        ))}
      </InfiniteScroll>

    </div>
  )
}

export default ChatMessagesList