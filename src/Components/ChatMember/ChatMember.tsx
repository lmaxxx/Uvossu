import classes from './ChatMember.module.scss'
import {FC} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from "../../Store";
import {removeUserFromChat, setGroupConstructorStoreField} from "../../Store/groupConstructor/groupConstructorActions";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

interface PropsType {
  uid: string
  inConstructor: boolean
}

const ChatMember: FC<PropsType> = ({uid, inConstructor}) => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const chatMemberData = useSelector((state: StoreType) => state.app.usersObject[uid])
  const ownerUid = useSelector((state: StoreType) => state.groupConstructor.ownerUid)
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const nextOwnerUid = useSelector((state: StoreType) => state.groupConstructor.nextOwnerUid)
  const dispatch = useDispatch()
  const {theme} = currentUser
  const cls = [classes["ChatMember" + theme], classes["ChatMember" + theme + "ActiveCursor"]]

  if(nextOwnerUid === uid) {
    cls.push(classes["ChatMember" + theme + "Active"])
  }

  if(inConstructor) {
    return (
      <div className={classes["ChatMember" + theme]}>
        <ImageLoader
          src={chatMemberData.photoURL as string}
          className={classes["ChatMember" + theme + "Avatar"]}
          width={37}
          height={37}
          theme={theme}/>
        <div className={classes["ChatMember" + theme + "UserBody"]}>
          <p className={classes["ChatMember" + theme + "Name"]}>{chatMemberData.displayName}</p>
          {ownerUid === uid && <p className={classes["ChatMember" + theme + "Owner"]}>Owner</p>}
          {
            uid !== ownerUid && uid !== currentUser.uid ?
              <Tooltip placement={"top"} title={"Delete member"}>
                <Button
                  onClick={() => dispatch(removeUserFromChat(uid))}
                  disabled={ownerUid !== currentUser.uid && activeChat.membersUid.includes(uid)}
                  className={classes["ChatMember" + theme + "Button"]}
                >
                  <ClearRoundedIcon className={classes["ChatMember" + theme + "Icon"]} />
                </Button>
              </Tooltip> : <></>
          }
        </div>
      </div>
    )
  }


  if(ownerUid !== uid) {
    return (
      <div
        onClick={() => dispatch(setGroupConstructorStoreField("nextOwnerUid", uid))}
        className={cls.join(" ")}>
        <ImageLoader
          src={chatMemberData.photoURL as string}
          className={classes["ChatMember" + theme + "Avatar"]}
          width={37}
          height={37}
          theme={theme}/>
        <div className={classes["ChatMember" + theme + "UserBody"]}>
          <p className={classes["ChatMember" + theme + "Name"]}>{chatMemberData.displayName}</p>
          {ownerUid === uid && <p className={classes["ChatMember" + theme + "Owner"]}>Owner</p>}
        </div>
      </div>
    )
  }

  return <></>


}

export default ChatMember