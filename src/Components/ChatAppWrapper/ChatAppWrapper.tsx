import classes from './ChatAppWrapper.module.scss'
import Loader from '../../UI/Loader/Loader'
import Aside from '../Aside/Aside'
import {useSelector, useDispatch} from 'react-redux'
import { StoreType } from '../../Store'
import StartChatWrapper from '../StartChatWrapper/StartChatWrapper'
import {AsideActions} from '../../types'
import {useEffect} from "react";
import {firestore} from "../../firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {setAppStoreField} from "../../Store/app/appActions";
// import {setChatStoreField} from '../../Store/chat/chatActions'

const ChatAppWrapper = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const activeAction = useSelector((state: StoreType) => state.app.activeAction)
  // const activeUser = useSelector((state: StoreType) => state.chat.activeUser)
  const query = firestore.collection("users")
  const [users] = useCollectionData(query, {idField: "id"})
  const dispatch = useDispatch()

  useEffect(() => {
    if(users) {
      const usersObject: any = {}

      for(const user of users) {
        usersObject[user.uid] = user
      }

      // if(Object.values(activeUser).length !== 0) {
      //   dispatch(setChatStoreField("activeUser", usersObject[usersObject.uid]))
      // }

      dispatch(setAppStoreField("usersObject", usersObject))
    }
  }, [users])

  if(theme === undefined) {
    return <Loader width={'100%'} height={'100vh'} backgroundColor={'#fff'} type={'Grid'} />
  } else return (
    <div style={{ backgroundColor: theme === 'dark' ? "#222222": "#fff"}} className={classes.ChatAppWrapper}>
      <Aside />
      {(activeAction === AsideActions.PrivateChats ||
        activeAction === AsideActions.SearchUsers) && <StartChatWrapper />}
    </div>

  )
}

export default ChatAppWrapper