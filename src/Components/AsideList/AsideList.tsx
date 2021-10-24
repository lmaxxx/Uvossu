import classes from './AsideList.module.scss'
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AsideUserList from '../AsideUserList/AsideUserList'
import {AsideActions, ChatTypes, Chat} from '../../types'
import {useSelector, useDispatch} from 'react-redux'
import {setAppStoreField} from "../../Store/app/appActions";
import {StoreType} from '../../Store'
import AsidePrivateChatsList from '../AsidePrivateChatsList/AsidePrivateChatsList'
import {useEffect} from "react";
import {firestore} from '../../firebase'
import {useCollectionData} from "react-firebase-hooks/firestore";
import {setChatStoreField} from "../../Store/chat/chatActions";

const AsideList = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme) 
  const activeAction = useSelector((state: StoreType) => state.app.activeAction)
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const ChatsQuery = firestore.collection("chats")
    .orderBy("lastMessageTime", "desc")
  const [chats] = useCollectionData(ChatsQuery, {idField: "id"})
  const dispatch = useDispatch()

  useEffect(() => {
    if(chats) {
      const ownChats = [...chats].filter((chat: Chat) => chat.membersUid.includes(currentUser.uid as string))
      const privateChats = ownChats.filter((chat: Chat) => parseInt(chat.type) === ChatTypes.PrivateChat)
      const groupChats = ownChats.filter((chat: Chat) => parseInt(chat.type) === ChatTypes.GroupChat)
      const favoriteChats = ownChats.filter((chat: Chat) => parseInt(chat.type) === ChatTypes.FavoriteChat)

      dispatch(setChatStoreField("privateChats", privateChats))
      if(privateChats.length == 0) {
        dispatch(setChatStoreField("activeChat", {}))
      }

      dispatch(setChatStoreField("groupChats", groupChats))
      if(groupChats.length == 0) {
        dispatch(setChatStoreField("activeChat", {}))
      }

      dispatch(setChatStoreField("favoriteChats", favoriteChats))
      if(favoriteChats.length == 0) {
        dispatch(setChatStoreField("activeChat", {}))
      }

      dispatch(setChatStoreField("gettedChats", true))
    }
  }, [chats])

  const getActiveStyle = () => {
    return classes["AsideList" + theme + "IconActive"]
  }

  return (
    <div className={classes["AsideList" + theme]}>
      {activeAction === AsideActions.PrivateChats && <AsidePrivateChatsList />}
      {activeAction === AsideActions.GroupChats && <p>GroupChats</p>}
      {activeAction === AsideActions.FavoriteChats && <p>FavoriteChats</p>}
      {activeAction === AsideActions.SearchUsers && <AsideUserList />}
      <nav className={classes["AsideList" + theme + "BottomNav"]}>
        <BottomNavigation
          sx={{backgroundColor: 'inherit'}}
          value={activeAction}
          onChange={(_, newValue) => {
            dispatch(setAppStoreField("activeAction", newValue))
            dispatch(setAppStoreField("activeUserUid", ''))
          }}
        >
          <BottomNavigationAction
            icon={
              <PersonOutlineRoundedIcon 
                className={activeAction === 0 ? getActiveStyle() : classes["AsideList" + theme + "Icon"]} 
              />
            } 
          />
          <BottomNavigationAction
            icon={
              <PeopleOutlineRoundedIcon 
                className={activeAction === 1 ? getActiveStyle() : classes["AsideList" + theme + "Icon"]} 
              />
            } 
          />
          <BottomNavigationAction
            icon={
              <StarBorderRoundedIcon 
                className={activeAction === 2 ? getActiveStyle() : classes["AsideList" + theme + "Icon"]} 
              />
            }            
          />
          <BottomNavigationAction
            icon={
              <SearchRoundedIcon 
                className={activeAction === 3 ? getActiveStyle() : classes["AsideList" + theme + "Icon"]} 
              />
            }            
          />
        </BottomNavigation>
      </nav>
    </div>
  )
}

export default AsideList