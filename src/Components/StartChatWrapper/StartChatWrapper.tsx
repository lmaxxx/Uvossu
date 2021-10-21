import classes from './StartChatWrapper.module.scss'
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from "../../Store";
import {User} from '../../types'
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import Button from "@mui/material/Button";

const StartChatWrapper = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const users = useSelector((state: StoreType) => state.app.users)
  const activeUserUid = useSelector((state: StoreType) => state.app.activeUserUid)
  let activeUser: User = {} as User

  for(const user of users) {
    if(user.uid === activeUserUid) {
      activeUser = {...user}
      break
    }
  }

  if(!activeUserUid) {
    return (
      <div className={classes["StartChatWrapper" + theme]}>
        <h3 className={classes["StartChatWrapper" + theme + "Error"]}>Select a user to start chatting</h3>
      </div>
    )
  }

  return (
    <div className={classes["StartChatWrapper" + theme]}>
      <div className={classes["StartChatWrapper" + theme + "Wrapper"]}>
        <ImageLoader className={classes["StartChatWrapper" + theme + "Avatar"]} width={200} height={200} src={activeUser.photoURL} />
        <p className={classes["StartChatWrapper" + theme + "Name"]}>{activeUser.displayName}</p>
        <Button
          variant={"contained"}
          sx={{backgroundColor: "#6588DE"}}
        >Start to chat with {activeUser.displayName}</Button>
      </div>
    </div>
  )
}

export default StartChatWrapper