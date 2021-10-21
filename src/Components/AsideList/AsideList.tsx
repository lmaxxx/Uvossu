import classes from './AsideList.module.scss'
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AsideUserList from '../AsideUserList/AsideUserList'
import {AsideActions, ChatTypes} from '../../types'
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
  const privateChatsQuery = firestore.collection("chats")
    .where("membersUid", "array-contains", currentUser.uid)
    .where("type", "==", ChatTypes.PrivateChat)
  const groupChatsQuery = firestore.collection("chats")
    .where("membersUid", "array-contains", currentUser.uid)
    .where("type", "==", ChatTypes.GroupChat)
  const favoriteChatsQuery = firestore.collection("chats")
    .where("membersUid", "array-contains", currentUser.uid)
    .where("type", "==", ChatTypes.FavoriteChat)
  const [privateChats] = useCollectionData(privateChatsQuery, {idField: "id"})
  const [groupChats] = useCollectionData(groupChatsQuery, {idField: "id"})
  const [favoriteChats] = useCollectionData(favoriteChatsQuery, {idField: "id"})
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setChatStoreField("privateChats",
      privateChats?.sort((a, b) => a.lastMessageTime - b.lastMessageTime)))
  }, [privateChats])

  useEffect(() => {
    dispatch(setChatStoreField("groupChats",
      groupChats?.sort((a, b) => a.lastMessageTime - b.lastMessageTime)))
  }, [groupChats])

  useEffect(() => {
    dispatch(setChatStoreField("favoriteChats",
      favoriteChats?.sort((a, b) => a.lastMessageTime - b.lastMessageTime)))
  }, [favoriteChats])

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