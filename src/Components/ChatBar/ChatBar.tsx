import classes from './ChatBar.module.scss'
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from "../../Store";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from "@mui/material/Button";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {addToFavorite, removeFromFavorite} from '../../Store/chat/chatActions'
import Tooltip from "@mui/material/Tooltip";

const ChatBar = () => {
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const {uid, theme} = useSelector((state: StoreType) => state.app.currentUser)
  const userUid = activeChat.membersUid.filter((id) => id !== uid)[0]
  const user = useSelector((state: StoreType) => state.app.usersObject[userUid])
  const isFavorite = activeChat.favoriteMembersUid.includes(uid as string)
  const dispatch = useDispatch()

  return (
    <div className={classes["ChatBar" + theme]}>
      <div className={classes["ChatBar" + theme + "BodyWrapper"]}>
        <ImageLoader
          src={user.photoURL}
          className={classes["ChatBar" + theme + "Avatar"]}
          width={37}
          height={37}
        />
        <p className={classes["ChatBar" + theme + "Name"]}>{user.displayName}</p>
      </div>
      <div className={classes["ChatBar" + theme + "ButtonWrapper"]}>
        <Tooltip title={isFavorite ? "Remove from favorite" : "Add to favorite"}>
          <Button
            className={classes["ChatBar" + theme + "Button"]}
            onClick={isFavorite ? () => dispatch(removeFromFavorite(uid as string, activeChat))  : () => dispatch(addToFavorite(uid as string, activeChat))}
          >
            {
              isFavorite ?
                <StarRoundedIcon  className={classes["ChatBar" + theme + "StarIcon"]} />
                :
                <StarBorderRoundedIcon onClick={() => dispatch(addToFavorite(uid as string, activeChat))} className={classes["ChatBar" + theme + "StarIcon"]} />
            }
          </Button>
        </Tooltip>
        <Tooltip title={"Delete chat"}>
          <Button className={classes["ChatBar" + theme + "Button"]}>
            <DeleteOutlinedIcon className={classes["ChatBar" + theme + "DeleteIcon"]} />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default ChatBar