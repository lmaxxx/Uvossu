import { Switch, Route } from 'react-router-dom';
import "react-awesome-lightbox/build/style.css";
import Auth from './Components/Auth/Auth'
import Main from './Components/Main/Main'
import UserSettings from './Components/UserSettings/UserSettings'
import GroupConstructor from "./Components/GroupConstructor/GroupConstructor";
import {useDispatch, useSelector} from "react-redux";
import {firestore} from "./firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useEffect} from "react";
import {setChatStoreField, readNewMessages} from "./Store/chat/chatActions";
import {setAppStoreField} from "./Store/app/appActions";
import {StoreType} from "./Store";

function App() {
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const dispatch = useDispatch()
  const currentUserUid = useSelector((state: StoreType) => state.app.currentUser.uid)
  const activeChatQuery = firestore.collection("chats").where("id",  "==", activeChat.id || "")
  const [uncontrolledActiveChat] = useCollectionData(activeChatQuery, {})

  useEffect(() => {
    if(uncontrolledActiveChat && uncontrolledActiveChat.length !== 0) {
      if(uncontrolledActiveChat[0].membersUid.length === 1) {
        firestore.collection("chats").doc(activeChat.id).delete()
          .then((_) => {
            dispatch(setChatStoreField("activeChat", {}))
            dispatch(setAppStoreField("showBackdrop", false))
          })
      } else {
        if(!uncontrolledActiveChat[0].readLastMessageMembersUid.includes(currentUserUid)) {
          dispatch(readNewMessages(uncontrolledActiveChat[0], currentUserUid as string))
        }

        dispatch(setChatStoreField("activeChat", uncontrolledActiveChat[0]))
      }

    }
  }, [uncontrolledActiveChat])

  useEffect(() => {
    if(Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, []);


  return (
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path="/auth" component={Auth} />
      <Route path="/settings" component={UserSettings} />
      <Route path="/createGroup"><GroupConstructor newGroup /></Route>
      <Route path="/editGroup"><GroupConstructor newGroup={false} /></Route>
    </Switch>
  )
}



export default App;
