import classes from './ChatBar.module.scss'
import {useSelector} from "react-redux";
import {StoreType} from "../../Store";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";

const ChatBar = () => {
  const currentUserId = useSelector((state: StoreType) => state.app.currentUser.uid)
  const userUid = useSelector((state: StoreType) =>
    state.chat.activeChat.membersUid.filter((id) => id !== currentUserId)[0])
  const user = useSelector((state: StoreType) => state.app.usersObject[userUid])

  return (
    <div className={classes.ChatBar}>
      <ImageLoader
        src={user.photoURL}
        className={classes.ChatBarAvatar}
        width={50}
        height={50}
      />
      <p className={classes.ChatBarName}>{user.displayName}</p>
    </div>
  )
}

export default ChatBar