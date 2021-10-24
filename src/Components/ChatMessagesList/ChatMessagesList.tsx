import classes from './ChatMessagesList.module.scss'
import {useSelector, useDispatch} from "react-redux";
import {firestore} from "../../firebase";
import {StoreType} from '../../Store'
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Message} from '../../types'
import {useEffect, useState} from "react";
import {setChatStoreField} from "../../Store/chat/chatActions";
import InfiniteScroll from 'react-infinite-scroll-component'

const ChatMessagesList = () => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const chatUserUid = useSelector((state: StoreType) => state.chat.activeChat.membersUid.filter((uid) => uid !== currentUser.uid)[0])
  const chatUser = useSelector((state: StoreType) => state.app.usersObject[chatUserUid])
  const messages = useSelector((state: StoreType) => state.chat.messages)
  const [limit, setLimit] = useState<number>(30)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const query = firestore.collection("chats")
    .doc(activeChat.id)
    .collection("messages")
    .orderBy("createdAt", "desc")
    .limit(limit)
  const [uncontrolledMessages] = useCollectionData(query, {idField: "id"})
  const dispatch = useDispatch()
  const wrapperHeight = useSelector((state: StoreType) => state.app.wrapperHeight)

  useEffect(() => {
    if(uncontrolledMessages) {
      dispatch(setChatStoreField("messages", uncontrolledMessages))
      if(uncontrolledMessages.length < limit) {
        setHasMore(false)
      }
    }
  }, [uncontrolledMessages])

  if(uncontrolledMessages === undefined) {
    return <p>Loading</p>
  }

  return (
    <div className={classes.ChatMessagesList}>
      <InfiniteScroll
        dataLength={messages.length}
        next={() => setLimit((prev) => prev + 25)}
        style={{display: 'flex', flexDirection: 'column-reverse'}}
        inverse={true}
        // hasMore={limit > messages.length}
        hasMore={hasMore}
        height={wrapperHeight + 'px'}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {messages?.map((message:Message, index) => (
          <div style={{display: "flex"}}>
          <strong style={{marginRight: "10px"}}>{chatUserUid === message.creatorUid ? chatUser.displayName : currentUser.displayName}</strong>
          <p>{message.value}</p>
          </div>
        ))}
      </InfiniteScroll>

    </div>
  )
}

export default ChatMessagesList