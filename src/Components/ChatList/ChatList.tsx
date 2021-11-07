import classes from "./ChatList.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from '../../Store'
import {AsideActions, Chat, ChatTypes} from '../../types'
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import Button from '@mui/material/Button';
import {setAppStoreField} from "../../Store/app/appActions";
import ChatFromList from '../ChatFromList/ChatFromList'
import {FC, useEffect, useState} from 'react'
import {firestore} from "../../firebase";
import InfiniteScroll from "react-infinite-scroll-component";
import {loadChats, setChatStoreField} from "../../Store/chat/chatActions";
import {useCollectionData} from "react-firebase-hooks/firestore";
import ChatFromListSkeleton from "../ChatFromListSkeleton/ChatFromListSkeleton";

interface PropsType {
  chatType: ChatTypes
}

const ChatList: FC<PropsType> = ({chatType}) => {
  const chats = useSelector((state: StoreType) => state.chat.chats)
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const gotChats = useSelector((state: StoreType) => state.chat.gotChats)
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const chatsLimit = useSelector((state: StoreType) => state.chat.chatsLimit)
  const hasMoreChats = useSelector((state: StoreType) => state.chat.hasMoreChats)
  let chatsQuery
  if(chatType === ChatTypes.FavoriteChat) {
    chatsQuery = firestore.collection("chats")
      .where("favoriteMembersUid", "array-contains", currentUser.uid)
      .orderBy("lastMessageTime", "desc")
      .limit(chatsLimit)
  } else{
    chatsQuery = firestore.collection("chats")
      .where("membersUid", "array-contains", currentUser.uid)
      .orderBy("lastMessageTime", "desc")
      .limit(chatsLimit)
  }
  const [uncontrolledChats] = useCollectionData(chatsQuery, {idField: "id"})
  const dispatch = useDispatch()
  const [skeletonRenderArr, setSkeletonRenderArr] = useState(Array.from({length: chatsLimit}))

  useEffect(() => {
    if(uncontrolledChats) {
      dispatch(setChatStoreField("chats", uncontrolledChats))
      dispatch(setChatStoreField("gotChats", true))
      if(uncontrolledChats.length < chatsLimit) {
        dispatch(setChatStoreField("hasMoreChats", false))
      }
    }
  }, [uncontrolledChats])


  if(chats.length === 0 && gotChats) {
    return (
      <div className={classes["ChatList" + theme + "ErrorWrapper"]}>
        <SentimentDissatisfiedRoundedIcon className={classes["ChatList" + theme + "ErrorIcon"]} />
        <p className={classes["ChatList" + theme + "ErrorText"]} >You don't have<br/> any {
          chatType === ChatTypes.FavoriteChat ? "favorite" : ""
        } chats</p>
        <Button
          onClick={() => {
            dispatch(setAppStoreField("activeAction", AsideActions.Users))
          }}
          className={classes["ChatList" + theme + "ErrorButton"]}
        >Search users</Button>
      </div>
    )
  }

  if(!gotChats) {
    return (
      <div className={classes["ChatList" + theme]}>
        <div className={classes["ChatList" + theme + "Wrapper"]}>
          {
            skeletonRenderArr?.map((_: any, index) => {
              return <ChatFromListSkeleton key={index} />
            })
          }
        </div>
      </div>
    )
  }

  return (
    <div className={classes["ChatList" + theme]}>
      <InfiniteScroll
        dataLength={chats.length}
        next={() => {
          dispatch(loadChats())
        }}
        className={classes["ChatList" + theme + "Wrapper"]}
        height={"100%"}
        hasMore={hasMoreChats}
        loader={<></>}
        scrollableTarget="scrollableDiv"
      >
        {
          chats?.map((chat: Chat, index) => {
            return <ChatFromList key={index} chat={chat} />
          })
        }
      </InfiniteScroll>
    </div>
  )

}

export default ChatList