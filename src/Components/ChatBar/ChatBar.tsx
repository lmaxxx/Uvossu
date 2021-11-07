import classes from './ChatBar.module.scss'
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from "../../Store";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from "@mui/material/Button";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {addToFavorite, removeFromFavorite} from '../../Store/chat/chatActions'
import {Tooltip, Modal, Fade, Backdrop, Box} from "@mui/material/";
import {useState} from 'react'

const ChatBar = () => {
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const {uid, theme} = useSelector((state: StoreType) => state.app.currentUser)
  const userUid = activeChat.membersUid.filter((id) => id !== uid)[0]
  const user = useSelector((state: StoreType) => state.app.usersObject[userUid])
  const isFavorite = activeChat.favoriteMembersUid.includes(uid as string)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

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
                <StarRoundedIcon className={classes["ChatBar" + theme + "StarIcon"]} />
                :
                <StarBorderRoundedIcon className={classes["ChatBar" + theme + "StarIcon"]} />
            }
          </Button>
        </Tooltip>
        <Tooltip title={"Delete chat"}>
          <Button onClick={openModal} className={classes["ChatBar" + theme + "Button"]}>
            <DeleteOutlinedIcon className={classes["ChatBar" + theme + "DeleteIcon"]} />
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
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ChatBar