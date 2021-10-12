import classes from './AsideList.module.scss'
import {useContext, useState} from 'react'
import {ThemeContext} from '../ChatAppWrapper/ChatAppWrapper'
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AsideUserList from '../AsideUserList/AsideUserList'
import {AsideActions} from '../../types'

const AsideList = () => {
  const theme = useContext(ThemeContext) 
  const [activeAction, setActiveAction] = useState<number>(0)

  const getActiveStyle = () => {
    return classes["AsideList" + theme + "IconActive"]
  }

  return (
    <div className={classes["AsideList" + theme]}>
      {activeAction === AsideActions.PrivateChats && <AsideUserList />}
      {activeAction === AsideActions.GroupChats && <AsideUserList />}
      {activeAction === AsideActions.FavoriteChats && <AsideUserList />}
      {activeAction === AsideActions.SearchUsers && <AsideUserList />}
      <nav className={classes["AsideList" + theme + "BottomNav"]}>
        <BottomNavigation
          sx={{backgroundColor: 'inherit'}}
          value={activeAction}
          onChange={(_, newValue) => {
            setActiveAction(newValue);
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