import classes from './UserFromList.module.scss'
import {User} from '../../types'
import {FC} from 'react'
import ImageLoader from '../../UI/ImageLoader/ImageLoader';
import {StoreType} from "../../Store";
import {useDispatch, useSelector} from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import {createChat} from "../../Store/chat/chatActions";
import {addUserToChat} from "../../Store/groupConstructor/groupConstructorActions";

interface PropsType {
  user: User
  inConstructor: boolean
  disabled: boolean
}

const UserFromList: FC<PropsType> = ({user, inConstructor, disabled}) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const chats = useSelector((state: StoreType) => state.chat.chats)
  const {theme} = currentUser

  const isDisabledClass = () => {
    if(disabled) {
      return [classes["UserFromList" + theme + disabled], classes["UserFromList" + theme]]
    }
    return [classes["UserFromList" + theme]]

  }

  return (
    <div className={isDisabledClass().join(" ")} >
      <ImageLoader
        src={user.photoURL as string}
        className={classes["UserFromList" + theme + "Avatar"]}
        width={37}
        height={37}
        theme={theme}/>
      <div className={classes["UserFromList" + theme + "UserBody"]}>
        <p className={classes["UserFromList" + theme + "Name"]}>{user.displayName}</p>
        <Tooltip placement={"right"} title={inConstructor ? "Add member" :"Start chat"}>
          <Button disabled={disabled} onClick={() => {
            if(inConstructor) {
              dispatch(addUserToChat(user.uid as string))
            } else dispatch(createChat(currentUser, user, chats))
          }} className={classes["UserFromList" + theme + "Button"]}>
            {
              inConstructor ?
              <AddIcon className={classes["UserFromList" + theme + "Icon"]} />
              :
              <SendIcon className={classes["UserFromList" + theme + "Icon"]} />
            }

          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default UserFromList