import classes from './ChatMessagesList.module.scss'
import {useSelector, useDispatch} from "react-redux";
import {firestore} from "../../firebase";
import {StoreType} from '../../Store'
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Message} from '../../types'
import {useEffect, useRef} from "react";
import {setChatStoreField, loadMessages} from "../../Store/chat/chatActions";
import InfiniteScroll from 'react-infinite-scroll-component'
import ChatMessage from "../ChatMessage/ChatMessage";


const ChatMessagesList = () => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const chatUserUid = useSelector((state: StoreType) => state.chat.activeChat.membersUid.filter((uid) => uid !== currentUser.uid)[0])
  const chatUser = useSelector((state: StoreType) => state.app.usersObject[chatUserUid])
  const messages = useSelector((state: StoreType) => state.chat.messages)
  const messagesLimit = useSelector((state: StoreType) => state.chat.messagesLimit)
  const hasMoreMessages = useSelector((state: StoreType) => state.chat.hasMoreMessages)
  const query = firestore.collection("chats")
    .doc(activeChat.id)
    .collection("messages")
    .orderBy("createdAt", "desc")
    .limit(messagesLimit)
  const [uncontrolledMessages] = useCollectionData(query, {idField: "id"})
  const dispatch = useDispatch()
  // const wrapperHeight = useSelector((state: StoreType) => state.app.wrapperHeight)

  // useEffect(() => {
  //   if(uncontrolledMessages) {
  //     dispatch(setChatStoreField("messages", uncontrolledMessages))
  //     if(uncontrolledMessages.length < messagesLimit) {
  //       dispatch(setChatStoreField("hasMoreMessages", false))
  //     }
  //   }
  // }, [uncontrolledMessages])
  //
  return (
    <div className={classes.ChatMessagesList}>
      {/*<InfiniteScroll*/}
      {/*  dataLength={messages.length}*/}
      {/*  next={() => dispatch(loadMessages())}*/}
      {/*  style={{display: 'flex', flexDirection: 'column-reverse'}}*/}
      {/*  inverse={true}*/}
      {/*  hasMore={hasMoreMessages}*/}
      {/*  height={wrapperHeight + 'px'}*/}
      {/*  loader={<h4>Loading...</h4>}*/}
      {/*>*/}
      {/*  {messages?.map((message:Message, index) => (*/}
      {/*    <ChatMessage*/}
      {/*      index={index}*/}
      {/*      key={index}*/}
      {/*      messageProps={message}*/}
      {/*      user={chatUserUid === message.creatorUid ? chatUser : currentUser}*/}
      {/*      isOwn={chatUserUid === message.creatorUid ? false : true}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</InfiniteScroll>*/}

    </div>
  )
}

export default ChatMessagesList