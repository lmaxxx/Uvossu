import classes from './NavBar.module.scss'
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from "../../Store";
import Logo from '../../img/logo.png'
import Button from '@mui/material/Button';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import {useState} from 'react'
import {signOut} from '../../Store/auth/authActions'
import {setActiveAction} from '../../Store/app/appActions'
import {toggleTheme} from '../../Store/settings/settingsActions'
import {AsideActions} from "../../types";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import {NavLink} from "react-router-dom";

const Navbar = () => {
  const currentUser = useSelector((state:StoreType) => state.app.currentUser)
  const activeAction = useSelector((state: StoreType) => state.app.activeAction)
  const {theme} = currentUser
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const onChangeActiveAction = (action: AsideActions) => {
    if(action !== activeAction) {
      return dispatch(setActiveAction(action))
    }

    return null
  }

  return (
    <div className={classes["NavBar" + theme]}>
      <div className={classes["NavBar" + theme + "TopBlock"]}>
        <img className={classes["NavBar" + theme + "Logo"]} src={Logo} alt=""/>
        <Tooltip title="Chats" placement="right">
          <Button
            onClick={() => onChangeActiveAction(AsideActions.Chats)}
            variant="text"
            className={AsideActions.Chats === activeAction ?
              classes["NavBar" + theme + "ButtonActive"] :
              classes["NavBar" + theme + "Button"]}
          >
            <ChatBubbleOutlineOutlinedIcon className={classes["NavBar" + theme + "Icon"]} />
          </Button>
        </Tooltip>
        <Tooltip title="Users" placement="right">
          <Button
            onClick={() => onChangeActiveAction(AsideActions.Users)}
            variant="text"
            className={AsideActions.Users === activeAction ?
              classes["NavBar" + theme + "ButtonActive"] :
              classes["NavBar" + theme + "Button"]}
          >
            <PersonOutlineRoundedIcon className={classes["NavBar" + theme + "Icon"]} />
          </Button>
        </Tooltip>
        <Tooltip title="Favorites" placement="right">
          <Button
            onClick={() => onChangeActiveAction(AsideActions.Favorites)}
            variant="text"
            className={AsideActions.Favorites === activeAction ?
              classes["NavBar" + theme + "ButtonActive"] :
              classes["NavBar" + theme + "Button"]}
          >
            <StarBorderRoundedIcon className={classes["NavBar" + theme + "Icon"]} />
          </Button>
        </Tooltip>
      </div>
      <div className={classes["NavBar" + theme + "BottomBlock"]}>
        <Tooltip title="Dark mode" placement="right">
          <Button
            variant="text"
            className={classes["NavBar" + theme + "Button"]}
            onClick={() =>  dispatch(toggleTheme(theme!, currentUser))}
          >
            <DarkModeOutlinedIcon className={classes["NavBar" + theme + "IconDark"]}/>
          </Button>
        </Tooltip>
        <ImageLoader
          onClick={handleClick}
          src={currentUser.photoURL}
          className={classes["NavBar" + theme + "Avatar"]}
          height={37}
          width={37}
          theme={theme as string}
        />
      </div>

      <Menu
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to={"/settings"}>Settings</NavLink>
        </MenuItem>
        <MenuItem onClick={() => dispatch(signOut())}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default Navbar