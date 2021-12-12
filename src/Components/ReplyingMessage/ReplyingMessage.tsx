import classes from "./ReplyingMessage.module.scss"
import {useSelector, useDispatch} from 'react-redux'
import {StoreType} from "../../Store";
import Button from "@mui/material/Button";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {Message, MessageTypes} from '../../types'
import {setChatStoreField} from "../../Store/chat/chatActions";
import {FC} from 'react'

interface PropsType {
  replyingMessageProps?: Message
}

const ReplyingMessage: FC<PropsType> = ({replyingMessageProps}) => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const dispatch = useDispatch()
  const rm = useSelector((state: StoreType) => state.chat.replyingMessage)
  const replyingMessage = replyingMessageProps || rm
  const userObject = useSelector((state: StoreType) => state.app.usersObject)
  const replyingMessageRef = useSelector((state: StoreType) => state.chat.replyingMessageRef)
  const showValue = replyingMessage.type === MessageTypes.TEXT ||
    replyingMessage.type === MessageTypes.VOICE || replyingMessage.type === MessageTypes.CODE

  const scroll = () => {
    replyingMessageRef?.current?.scrollIntoView({behavior: "smooth", block: "center"})
  }

  const getClass = () => {
    const cls = [classes["ReplyingMessage" + theme]]

    if(replyingMessageProps) {
      cls.push(classes["ReplyingMessage" + theme + "Message"])
    }

    return cls
  }

  return (
    <div
      className={getClass().join(" ")}
    >
      <p className={classes["ReplyingMessage" + theme + "Name"]}>{userObject[replyingMessage.creatorUid]?.displayName}:</p>
      <div
        className={classes["ReplyingMessage" + theme + "ValueWrapper"]}
        onClick={scroll}
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
          showValue ? replyingMessage.value : replyingMessage.fileName
        }</p>
      </div>
      {
        !replyingMessageProps && <Button
            className={classes["ReplyingMessage" + theme + "Button"]}
            onClick={() => dispatch(setChatStoreField("replyingMessage", {} as Message))}
        >
            <ClearRoundedIcon className={classes["ReplyingMessage" + theme + "Icon"]} />
        </Button>
      }
    </div>
  )
}

export default ReplyingMessage