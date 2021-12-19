import classes from "./SelectedMessage.module.scss"
import {useSelector, useDispatch} from 'react-redux'
import {StoreType} from "../../Store";
import Button from "@mui/material/Button";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {Message, MessageTypes} from '../../types'
import {setChatStoreField} from "../../Store/chat/chatActions";

const SelectedMessage = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const dispatch = useDispatch()
  const replyingMessage = useSelector((state: StoreType) => state.chat.replyingMessage)
  const userObject = useSelector((state: StoreType) => state.app.usersObject)
  const showValue = replyingMessage.type === MessageTypes.TEXT ||
    replyingMessage.type === MessageTypes.VOICE || replyingMessage.type === MessageTypes.CODE


  return (
    <div
      className={classes["SelectedMessage" + theme]}
    >
      <p className={classes["SelectedMessage" + theme + "Name"]}>{userObject[replyingMessage.creatorUid]?.displayName}:</p>
      <div
        className={classes["SelectedMessage" + theme + "ValueWrapper"]}
        style={replyingMessage.type === MessageTypes.IMAGE ? {gridTemplateColumns: "35px 1fr"} : {}}
      >
        {
          replyingMessage.type === MessageTypes.IMAGE &&
          <img
              src={replyingMessage.url}
              alt=""
              className={classes["SelectedMessage" + theme + "Image"]}
          />
        }
        <p className={classes["SelectedMessage" + theme + "Text"]}>{
          showValue ? replyingMessage.value : replyingMessage.fileName
        }</p>
      </div>
        <Button
            className={classes["SelectedMessage" + theme + "Button"]}
            onClick={() => dispatch(setChatStoreField("replyingMessage", {} as Message))}
        >
            <ClearRoundedIcon className={classes["SelectedMessage" + theme + "Icon"]} />
        </Button>
    </div>
  )
}

export default SelectedMessage