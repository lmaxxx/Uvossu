import classes from './GroupConstructor.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {StoreType} from '../../Store'
import {FC, useEffect} from 'react'
import ImageLoader from "../../UI/ImageLoader/ImageLoader"
import LightOutlineInput from "../../UI/OutlineInput/LightOutlineInput"
import DarkOutlineInput from "../../UI/OutlineInput/DarkOutlineInput"
import UserList from '../UserList/UserList'
import {setGroupConstructorStoreField} from "../../Store/groupConstructor/groupConstructorActions"
import ChatMember from '../ChatMember/ChatMember'
import Button from "@mui/material/Button"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import {createGroup} from "../../Store/groupConstructor/groupConstructorActions"
import {NavLink} from 'react-router-dom'

interface PropsType {
  newGroup: boolean
}

const GroupConstructor: FC<PropsType> = ({newGroup}) => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const chatName = useSelector((state: StoreType) => state.groupConstructor.chatName)
  const membersUid = useSelector((state: StoreType) => state.groupConstructor.membersUid)
  const photoURL = useSelector((state: StoreType) => state.groupConstructor.photoURL)
  const {theme, uid} = currentUser
  const dispatch = useDispatch()

  const disabledSaveButton = () => {
    if(membersUid.length >= 2 && chatName.trim()) {
      return false
    }
    return true
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
                onClick={() => dispatch(createGroup(uid as string, membersUid, chatName, photoURL))}
              >
                <SaveOutlinedIcon className={classes["GroupConstructor" + theme + "Icon"]} />
              </Button>
              :
              <NavLink to={"/"}>
                <Button
                  className={classes["GroupConstructor" + theme + "Button"]}
                  onClick={() => dispatch(createGroup(uid as string, membersUid, chatName, photoURL))}
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
                    <ChatMember uid={uid} key={index} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupConstructor