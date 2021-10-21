import classes from './StartChatWrapper.module.scss'
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from "../../Store";
import {User} from '../../types'
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import Button from "@mui/material/Button";
import {createChat} from "../../Store/app/appActions";
import {useEffect, useState} from 'react'

const StartChatWrapper = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const usersObject = useSelector((state: StoreType) => state.app.usersObject)
  const activeUserUid = useSelector((state: StoreType) => state.app.activeUserUid)
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const dispatch = useDispatch()
  const [activeUser, setActiveUser] = useState<User>()

  useEffect(() => {
    if(usersObject !== undefined && activeUserUid) {
      setActiveUser(usersObject[activeUserUid])
    }
  }, [usersObject])

  useEffect(() => {
    setActiveUser(usersObject[activeUserUid])
  }, [activeUserUid])

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
        <ImageLoader className={classes["StartChatWrapper" + theme + "Avatar"]} width={200} height={200} src={activeUser?.photoURL as string} />
        <p className={classes["StartChatWrapper" + theme + "Name"]}>{activeUser?.displayName}</p>
        <Button
          variant={"contained"}
          sx={{backgroundColor: "#6588DE"}}
          onClick={() => dispatch(createChat(currentUser, activeUser as User))}
        >Start to chat with {activeUser?.displayName}</Button>
      </div>
    </div>
  )
}

export default StartChatWrapper