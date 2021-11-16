import classes from './ChatBar.module.scss'
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from "../../Store";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from "@mui/material/Button";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {addToFavorite, removeFromFavorite, deleteChat} from '../../Store/chat/chatActions'
import {Tooltip, Modal, Fade, Backdrop, Box} from "@mui/material/";
import {useState} from 'react'
import {leaveFromGroup} from "../../Store/groupConstructor/groupConstructorActions";

const ChatBar = () => {
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const {uid, theme} = currentUser
  const userUid = activeChat.membersUid.filter((id) => id !== uid)[0]
  const user = useSelector((state: StoreType) => state.app.usersObject[userUid])
  const isFavorite = activeChat.favoriteMembersUid.includes(uid as string)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return (
    <div className={classes["ChatBar" + theme]}>
      <div
        style={activeChat.isGroup ? {cursor: "pointer"}: {}}
        className={classes["ChatBar" + theme + "BodyWrapper"]}>
        <ImageLoader
          src={activeChat.isGroup? activeChat.photoURL : user.photoURL}
          className={classes["ChatBar" + theme + "Avatar"]}
          width={37}
          height={37}
        />
        <div className={classes["ChatBar" + theme + "TextWrapper"]}>
          <p className={classes["ChatBar" + theme + "Name"]}>{activeChat.isGroup? activeChat.name : user.displayName}</p>
          {activeChat.isGroup && <p className={classes["ChatBar" + theme + "MembersAmount"]}>{activeChat.membersUid.length} members</p>}
        </div>
      </div>
      <div className={classes["ChatBar" + theme + "ButtonWrapper"]}>
        <Tooltip title={isFavorite ? "Remove from favorite" : "Add to favorite"}>
          <Button
            className={classes["ChatBar" + theme + "Button"]}
            onClick={isFavorite ? () => dispatch(removeFromFavorite(uid as string, activeChat))  : () => dispatch(addToFavorite(uid as string, activeChat))}
          >
            {
              isFavorite ?
                <StarRoundedIcon className={classes["ChatBar" + theme + "StarIcon"]} />
                :
                <StarBorderRoundedIcon className={classes["ChatBar" + theme + "StarIcon"]} />
            }
          </Button>
        </Tooltip>
        <Tooltip title={"Delete chat"}>
          <Button onClick={openModal} className={classes["ChatBar" + theme + "Button"]}>
            {
              activeChat.isGroup ?
                <ExitToAppIcon className={classes["ChatBar" + theme + "DeleteIcon"]}  />
                :
                <DeleteOutlinedIcon className={classes["ChatBar" + theme + "DeleteIcon"]} />
            }

          </Button>
        </Tooltip>
      </div>

      <Modal
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes["ChatBar" + theme + "Modal"]}>
            <p>Are you sure you want to delete the chat?</p>
            <Button onClick={() => {
              if(activeChat.isGroup) {
                dispatch(leaveFromGroup(activeChat, currentUser))
              } else {
                dispatch(deleteChat(activeChat, uid as string))
              }
            }}>Delete</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ChatBar