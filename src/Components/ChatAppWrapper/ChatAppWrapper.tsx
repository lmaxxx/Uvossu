import classes from './ChatAppWrapper.module.scss'
import Loader from '../../UI/Loader/Loader'
import Aside from '../Aside/Aside'
import {useDispatch, useSelector} from 'react-redux'
import {StoreType} from '../../Store'
import StartChatWrapper from '../StartChatWrapper/StartChatWrapper'
import {AsideActions} from '../../types'
import {useEffect} from "react";
import {firestore} from "../../firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {setAppStoreField} from "../../Store/app/appActions";
import isEmpty from "lodash/isEmpty";
import Chat from '../Chat/Chat'

const ChatAppWrapper = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const activeAction = useSelector((state: StoreType) => state.app.activeAction)
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const query = firestore.collection("users")
  const [users] = useCollectionData(query, {idField: "id"})
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

  if(theme === undefined) {
    return <Loader width={'100%'} height={'100vh'} backgroundColor={'#fff'} type={'Grid'} />
  } else return (
    <div style={{ backgroundColor: theme === 'dark' ? "#222222": "#fff"}} className={classes.ChatAppWrapper}>
      <Aside />
      {
        isEmpty(activeChat) ? <StartChatWrapper /> :
          activeAction === AsideActions.SearchUsers ? <StartChatWrapper /> : <Chat />
      }
    </div>

  )
}

export default ChatAppWrapper