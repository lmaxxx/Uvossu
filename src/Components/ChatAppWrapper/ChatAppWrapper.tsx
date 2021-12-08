import classes from './ChatAppWrapper.module.scss'
import Loader from '../../UI/Loader/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {AsideActions} from "../../types";
import {StoreType} from '../../Store'
import ChatIsNotSelected from '../ChatIsNotSelected/ChatIsNotSelected'
import {useEffect} from "react";
import {firestore} from "../../firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {setAppStoreField} from "../../Store/app/appActions";
import isEmpty from "lodash/isEmpty";
import Chat from '../Chat/Chat'
import NavBar from '../NavBar/NavBar'
import AsideListWrapper from "../AsideListWrapper/AsideListWrapper";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from "@mui/material/CircularProgress";
import CodeCompiler from '../CodeCompiler/CodeCompiler'

const ChatAppWrapper = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const activeAction = useSelector((state: StoreType) => state.app.activeAction)
  const showBackdrop = useSelector((state: StoreType) => state.app.showBackdrop)
  const usersQuery = firestore.collection("users")
  const [users] = useCollectionData(usersQuery, {idField: "id"})
  const dispatch = useDispatch()

  useEffect(() => {
    if(users) {
      const usersObject: any = {}

      for(const user of users) {
        usersObject[user.uid] = user
      }

      dispatch(setAppStoreField("usersObject", usersObject))
    }
  }, [users])

  const mainClass = () => {
    return activeAction === AsideActions.CodeCompiler ?
      [classes["ChatAppWrapper" + theme], classes["ChatAppWrapper" + theme + "CodeIsActive"]]
      :
      [classes["ChatAppWrapper" + theme]]
  }

  if(theme === undefined) {
    return <Loader width={'100%'} height={'100vh'} backgroundColor={'#fff'} type={'Grid'} />
  } else return (
    <div className={mainClass().join(" ")}>
      <NavBar />
      {
        activeAction === AsideActions.CodeCompiler ?
          <CodeCompiler />
          :
          <>
            <AsideListWrapper />
            {
              isEmpty(activeChat) ? <ChatIsNotSelected /> : <Chat />
            }
          </>
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