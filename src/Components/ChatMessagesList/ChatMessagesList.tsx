import classes from './ChatMessagesList.module.scss'
import {useSelector, useDispatch} from "react-redux";
import {firestore} from "../../firebase";
import {StoreType} from '../../Store'
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Message} from '../../types'
import {useEffect, useRef, useState} from "react";
import {setChatStoreField} from "../../Store/chat/chatActions";

const ChatMessagesList = () => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const chatUserUid = useSelector((state: StoreType) => state.chat.activeChat.membersUid.filter((uid) => uid !== currentUser.uid)[0])
  const chatUser = useSelector((state: StoreType) => state.app.usersObject[chatUserUid])
  const query = firestore.collection("chats").doc(activeChat.id).collection("messages").orderBy("createdAt")
  const [messages] = useCollectionData(query, {idField: "id"})
  const dispatch = useDispatch()
  const wrapperRef = useRef()
  const [wrapperHeight, setWrapperHeight] = useState<number>()

  useEffect(() => {
    if(wrapperRef) {
      const currentRef: any = wrapperRef.current
      setWrapperHeight(currentRef.clientHeight)
    }
  }, [wrapperRef])


  return (
    <div ref={wrapperRef as any} className={classes.ChatMessagesList}>
      <div className={classes.ChatMessagesListWrapper} style={{height: wrapperHeight}}>
        {
          messages?.map((message: Message) => {
            return <div style={{display: "flex"}}>
              <strong style={{marginRight: "10px"}}>{chatUserUid === message.creatorUid ? chatUser.displayName : currentUser.displayName}</strong>
              <p>{message.value}</p>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default ChatMessagesList