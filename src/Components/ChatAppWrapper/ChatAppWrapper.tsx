import classes from './ChatAppWrapper.module.scss'
import Loader from '../../UI/Loader/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {StoreType} from '../../Store'
import ChatIsNotSelected from '../ChatIsNotSelected/ChatIsNotSelected'
import {useEffect} from "react";
import {firestore} from "../../firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {clearFilteredUsers, setAppStoreField} from "../../Store/app/appActions";
import {setChatStoreField} from "../../Store/chat/chatActions";
import isEmpty from "lodash/isEmpty";
import Chat from '../Chat/Chat'
import NavBar from '../NavBar/NavBar'
import AsideListWrapper from "../AsideListWrapper/AsideListWrapper";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from "@mui/material/CircularProgress";

const ChatAppWrapper = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const showBackdrop = useSelector((state: StoreType) => state.app.showBackdrop)
  const usersQuery = firestore.collection("users")
  const [users] = useCollectionData(usersQuery, {idField: "id"})
  const dispatch = useDispatch()
  const activeChatQuery = firestore.collection("chats").where("id",  "==", activeChat.id || "")
  const [uncontrolledActiveChat] = useCollectionData(activeChatQuery, {})

  useEffect(() => {
    if(uncontrolledActiveChat && uncontrolledActiveChat.length !== 0) {
      console.log("Changed")
      if(uncontrolledActiveChat[0].membersUid.length === 1) {
        firestore.collection("chats").doc(activeChat.id).delete()
          .then((_) => {
            dispatch(setChatStoreField("activeChat", {}))
            dispatch(setAppStoreField("showBackdrop", false))
          })

      } else {
        dispatch(setChatStoreField("activeChat", uncontrolledActiveChat[0]))
      }

    }
  }, [uncontrolledActiveChat])

  useEffect(() => {
    if(users) {
      const usersObject: any = {}

      for(const user of users) {
        usersObject[user.uid] = user
      }

      dispatch(setAppStoreField("usersObject", usersObject))
    }
  }, [users])

  if(theme === undefined) {
    return <Loader width={'100%'} height={'100vh'} backgroundColor={'#fff'} type={'Grid'} />
  } else return (
    <div className={classes["ChatAppWrapper" + theme]}>
      <NavBar />
      <AsideListWrapper />
      {
        isEmpty(activeChat) ? <ChatIsNotSelected /> : <Chat />
      }
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default ChatAppWrapper