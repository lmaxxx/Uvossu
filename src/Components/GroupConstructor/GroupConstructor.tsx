import classes from './GroupConstructor.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {StoreType} from '../../Store'
import {FC, useState} from 'react'
import ImageLoader from "../../UI/ImageLoader/ImageLoader"
import LightOutlineInput from "../../UI/OutlineInput/LightOutlineInput"
import DarkOutlineInput from "../../UI/OutlineInput/DarkOutlineInput"
import UserList from '../UserList/UserList'
import {setGroupConstructorStoreField} from "../../Store/groupConstructor/groupConstructorActions"
import ChatMember from '../ChatMember/ChatMember'
import Button from "@mui/material/Button"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import {
  createGroup,
  saveGroupConstructor,
  deleteGroupAvatar,
  setGroupAvatar
} from "../../Store/groupConstructor/groupConstructorActions"
import {NavLink, Redirect} from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {isEmpty} from "lodash";

interface PropsType {
  newGroup: boolean
}

const GroupConstructor: FC<PropsType> = ({newGroup}) => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const chatName = useSelector((state: StoreType) => state.groupConstructor.chatName)
  const membersUid = useSelector((state: StoreType) => state.groupConstructor.membersUid)
  const photoURL = useSelector((state: StoreType) => state.groupConstructor.photoURL)
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const avatarFile = useSelector((state: StoreType) => state.groupConstructor.avatarFile)
  const usersObject = useSelector((state: StoreType) => state.app.usersObject)
  const {theme} = currentUser
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const openMenu = (e: any) => {
    setAnchorEl(e.currentTarget);
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }

  const disabledSaveButton = () => {
    if(membersUid.length >= 2 && chatName.trim()) {
      return false
    }
    return true
  }

  if(isEmpty(currentUser)) {
    return <Redirect to={"/auth"} />
  }

  return (
    <div className={classes["GroupConstructor" + theme]}>
      <div className={classes["GroupConstructor" + theme + "Wrapper"]}>
        <header className={classes["GroupConstructor" + theme + "Bar"]}>
          <ImageLoader
            src={photoURL}
            className={classes["GroupConstructor" + theme + "Avatar"]}
            height={40}
            width={40}
            theme={theme}
            onClick={openMenu}
          />
          {
            theme === "light" ?
              <LightOutlineInput
                variant="outlined"
                id="user-search"
                placeholder="Chat name"
                className={classes["GroupConstructor" + theme + "Input"]}
                value={chatName}
                onChange={(e) => dispatch(setGroupConstructorStoreField("chatName", e.target.value))}
              />
              :
              <DarkOutlineInput
                variant="outlined"
                id="user-search"
                placeholder="Chat name"
                className={classes["GroupConstructor" + theme + "Input"]}
                value={chatName}
                onChange={(e) => dispatch(setGroupConstructorStoreField("chatName", e.target.value))}
              />
          }
          {
            disabledSaveButton() ?
              <Button
                disabled={true}
                className={classes["GroupConstructor" + theme + "Button"]}
              >
                <SaveOutlinedIcon className={classes["GroupConstructor" + theme + "Icon"]} />
              </Button>
              :
              <NavLink to={"/"}>
                <Button
                  className={classes["GroupConstructor" + theme + "Button"]}
                  onClick={() => {
                    if(newGroup){
                      dispatch(createGroup(currentUser, membersUid, chatName, photoURL, avatarFile))
                    } else {
                      dispatch(saveGroupConstructor(
                        activeChat,
                        membersUid,
                        chatName,
                        photoURL,
                        avatarFile,
                        currentUser,
                        usersObject
                      ))
                    }
                  }}
                >
                  <SaveOutlinedIcon className={classes["GroupConstructor" + theme + "Icon"]} />
                </Button>
              </NavLink>
          }
        </header>
        <div className={classes["GroupConstructor" + theme + "Main"]}>
          <UserList inConstructor />
          <div className={classes["GroupConstructor" + theme + "Members"]}>
            <header className={classes["GroupConstructor" + theme + "TitleWrapper"]}>
              <h3 className={classes["GroupConstructor" + theme + "Title"]}>Chat members</h3>
            </header>
            <div className={classes["GroupConstructor" + theme + "RelativeWrapper"]}>
              <div className={classes["GroupConstructor" + theme + "MembersWrapper"]}>
                {
                  membersUid.map((uid, index) => (
                    <ChatMember inConstructor={true} uid={uid} key={index} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <label htmlFor="upload-avatar">
            <input
              style={{display: 'none'}}
              accept="image/*"
              multiple={false}
              id="upload-avatar"
              type="file"
              onChange={(e: any) => {
                closeMenu()
                dispatch(setGroupAvatar(e))
              }}
            />
              Upload avatar
          </label>
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(deleteGroupAvatar())
          closeMenu()
        }}>Delete avatar</MenuItem>
      </Menu>
    </div>
  )
}

export default GroupConstructor