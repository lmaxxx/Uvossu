import classes from './AsideListWrapper.module.scss'
import {AsideActions, ChatTypes} from '../../types'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {StoreType} from '../../Store'
import ChatList from '../ChatList/ChatList'
import UserList from '../UserList/UserList'
import Button from "@mui/material/Button";
import {Tooltip} from "@mui/material";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import {useEffect} from "react";
import {clearGroupConstructor} from "../../Store/groupConstructor/groupConstructorActions";
import {setAppStoreField} from "../../Store/app/appActions";
import NavBar from '../NavBar/NavBar'
import useMedia from 'use-media'

const AsideListWrapper = () => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const {theme, uid} = currentUser
  const activeAction = useSelector((state: StoreType) => state.app.activeAction)
  const dispatch = useDispatch()
  const isTablet = useMedia({maxWidth: "850px"})

  const getActiveActionName = () => {
    if(activeAction === AsideActions.Chats) return "Chats"
    else if(activeAction === AsideActions.Users) return "Users"
    else return "Favorites"
  }

  useEffect(() => {
    dispatch(clearGroupConstructor(uid as string))
    dispatch(setAppStoreField("hasMoreUsers", true))
  }, [])
  

  return (
    <div className={classes["AsideListWrapper" + theme]}>
      <header className={classes["AsideListWrapper" + theme + "Header"]}>
        <h2 className={classes["AsideListWrapper" + theme + "ActionName"]}>{getActiveActionName()}</h2>
        {
          activeAction === AsideActions.Chats &&  <Tooltip title={"Add group"}>
              <NavLink to={"createGroup"}>
                  <Button className={classes["AsideListWrapper" + theme + "Button"]}>
                      <GroupAddOutlinedIcon className={classes["AsideListWrapper" + theme + "Icon"]} />
                  </Button>
              </NavLink>
          </Tooltip>
        }
      </header>
      {activeAction === AsideActions.Chats && <ChatList chatType={ChatTypes.DefaultChat}  />}
      {activeAction === AsideActions.Favorites && <ChatList chatType={ChatTypes.FavoriteChat} />}
      {activeAction === AsideActions.Users && <UserList inConstructor={false} />}
      {isTablet && <NavBar />}
    </div>
  )
}

export default AsideListWrapper