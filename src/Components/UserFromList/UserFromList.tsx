import classes from './UserFromList.module.scss'
import {User} from '../../types'
import {FC} from 'react'
import ImageLoader from '../../UI/ImageLoader/ImageLoader';
import {StoreType} from "../../Store";
import {useDispatch, useSelector} from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import {createChat} from "../../Store/chat/chatActions";


interface PropsType {
  user: User
}

const UserFromList: FC<PropsType> = ({user}) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const chats = useSelector((state: StoreType) => state.chat.chats)
  const {theme} = currentUser

  return (
    <div className={classes["UserFromList" + theme]} >
      <ImageLoader
        src={user.photoURL as string}
        className={classes["UserFromList" + theme + "Avatar"]}
        width={37}
        height={37}
        theme={theme}/>
      <div className={classes["UserFromList" + theme + "UserBody"]}>
        <p className={classes["UserFromList" + theme + "Name"]}>{user.displayName}</p>
        <Tooltip placement={"right"} title={"Start chat"}>
          <Button onClick={() => dispatch(createChat(currentUser, user, chats))} className={classes["UserFromList" + theme + "Button"]}>
            <SendIcon className={classes["UserFromList" + theme + "Icon"]} />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default UserFromList