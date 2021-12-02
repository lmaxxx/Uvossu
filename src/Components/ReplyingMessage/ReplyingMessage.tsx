import classes from "./ReplyingMessage.module.scss"
import {useSelector, useDispatch} from 'react-redux'
import {StoreType} from "../../Store";
import Button from "@mui/material/Button";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {Message, MessageTypes} from '../../types'
import {setChatStoreField} from "../../Store/chat/chatActions";

const ReplyingMessage = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const dispatch = useDispatch()
  const replyingMessage = useSelector((state: StoreType) => state.chat.replyingMessage)
  const userObject = useSelector((state: StoreType) => state.app.usersObject)

  return (
    <div className={classes["ReplyingMessage" + theme]}>
      <p className={classes["ReplyingMessage" + theme + "Name"]}>{userObject[replyingMessage.creatorUid].displayName}:</p>
      <div
        className={classes["ReplyingMessage" + theme + "ValueWrapper"]}
        style={replyingMessage.type === MessageTypes.IMAGE ? {gridTemplateColumns: "35px 1fr"} : {}}
      >
        {
          replyingMessage.type === MessageTypes.IMAGE &&
          <img
              src={replyingMessage.url}
              alt=""
              className={classes["ReplyingMessage" + theme + "Image"]}
          />
        }
        <p className={classes["ReplyingMessage" + theme + "Text"]}>{
          replyingMessage.type === MessageTypes.TEXT ||
          replyingMessage.type === MessageTypes.VOICE
            ? replyingMessage.value : replyingMessage.fileName
        }</p>
      </div>
      <Button
        className={classes["ReplyingMessage" + theme + "Button"]}
        onClick={() => dispatch(setChatStoreField("replyingMessage", {} as Message))}
      >
        <ClearRoundedIcon className={classes["ReplyingMessage" + theme + "Icon"]} />
      </Button>
    </div>
  )
}

export default ReplyingMessage