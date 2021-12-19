import classes from './RepliedMessage.module.scss'
import {FC} from 'react'
import {useSelector} from "react-redux";
import {StoreType} from "../../Store";
import {Message, MessageTypes} from "../../types";

interface PropsType {
  repliedMessage: any
}

const RepliedMessage: FC<PropsType>  = ({repliedMessage}) => {
  const userObject = useSelector((state: StoreType) => state.app.usersObject)
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const showValue = repliedMessage.type === MessageTypes.TEXT ||
    repliedMessage.type === MessageTypes.VOICE || repliedMessage.type === repliedMessage.CODE

  return (
    <div
      className={classes["SelectedMessage" + theme]}
    >
      <p className={classes["SelectedMessage" + theme + "Name"]}>{userObject[repliedMessage.creatorUid]?.displayName}:</p>
      <div
        className={classes["SelectedMessage" + theme + "ValueWrapper"]}
        style={repliedMessage.type === MessageTypes.IMAGE ? {gridTemplateColumns: "35px 1fr"} : {}}
      >
        {
          repliedMessage.type === MessageTypes.IMAGE &&
          <img
              src={repliedMessage.url}
              alt=""
              className={classes["SelectedMessage" + theme + "Image"]}
          />
        }
        <p className={classes["SelectedMessage" + theme + "Text"]}>
          {showValue ? repliedMessage.value : repliedMessage.fileName}
        </p>
      </div>
    </div>
  )
}

export default RepliedMessage