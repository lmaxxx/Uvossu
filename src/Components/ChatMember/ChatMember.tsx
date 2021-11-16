import classes from './ChatMember.module.scss'
import {FC} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from "../../Store";
import {removeUserFromChat} from "../../Store/groupConstructor/groupConstructorActions";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

interface PropsType {
  uid: string
}

const ChatMember: FC<PropsType> = ({uid}) => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const chatMemberData = useSelector((state: StoreType) => state.app.usersObject[uid])
  const dispatch = useDispatch()
  const {theme} = currentUser

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
        {
          uid !== currentUser.uid && <Tooltip placement={"top"} title={"Delete member"}>
              <Button
                  onClick={() => dispatch(removeUserFromChat(uid))}
                  className={classes["ChatMember" + theme + "Button"]}
              >
                  <ClearRoundedIcon className={classes["ChatMember" + theme + "Icon"]} />
              </Button>
          </Tooltip>
        }
      </div>
    </div>
  )
}

export default ChatMember