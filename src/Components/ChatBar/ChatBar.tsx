import classes from './ChatBar.module.scss'
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from "../../Store";
import ImageLoader from "../../UI/ImageLoader/ImageLoader";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from "@mui/material/Button";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import CodeIcon from '@mui/icons-material/Code';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {addToFavorite, removeFromFavorite, deleteChat, setChatStoreField} from '../../Store/chat/chatActions'
import {Tooltip, Modal, Fade, Backdrop, Box} from "@mui/material/";
import {useState} from 'react'
import {leaveFromGroup, setGroupData, setGroupConstructorStoreField} from "../../Store/groupConstructor/groupConstructorActions";
import {NavLink} from 'react-router-dom'
import ChatMember from "../ChatMember/ChatMember";
import {toggleChatCodeEditor} from "../../Store/code/codeActions";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useMedia} from "use-media";
import {goBackToList} from "../../Store/app/appActions";

const ChatBar = () => {
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const {uid, theme} = currentUser
  const userUid = activeChat.membersUid.filter((id) => id !== uid)[0]
  const user = useSelector((state: StoreType) => state.app.usersObject[userUid])
  const nextOwnerUid = useSelector((state: StoreType) => state.groupConstructor.nextOwnerUid)
  const isFavorite = activeChat.favoriteMembersUid.includes(uid as string)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => {
    setOpen(false)
    dispatch(setGroupConstructorStoreField("nextOwnerUid", ''))
  }
  const isTablet = useMedia({maxWidth: "850px"})

  return (
    <div className={classes["ChatBar" + theme]}>
      {
        isTablet && <ArrowBackIosIcon
              onClick={() => dispatch(goBackToList())}
              className={classes["ChatBar" + theme + "LeftArrow"]}
          />
      }
      {
        activeChat.isGroup ?
          <>
            <ImageLoader
              src={activeChat.photoURL as string}
              className={classes["ChatBar" + theme + "Avatar"]}
              width={37}
              height={37}
            />
            <NavLink
              to={"/editGroup"}
              style={{ textDecoration: 'none' }}
              className={classes["ChatBar" + theme + "Link"]}
              onClick={() => dispatch(setGroupData(activeChat, uid as string))}
            >
              <p className={classes["ChatBar" + theme + "Name"]}>
                {activeChat.name}
                <p className={classes["ChatBar" + theme + "MembersAmount"]}>{activeChat.membersUid.length} members</p>
              </p>
            </NavLink>
          </>
          :
          <>
            <ImageLoader
              src={user.photoURL}
              className={classes["ChatBar" + theme + "Avatar"]}
              width={37}
              height={37}
            />
              <p className={classes["ChatBar" + theme + "Name"]}>{user.displayName}</p>
        </>
        // <div
        //   className={classes["ChatBar" + theme + "BodyWrapper"]}>
        //<div className={classes["ChatBar" + theme + "TextWrapper"]}>

          //</div>
          // </div>
      }
      <div className={classes["ChatBar" + theme + "ButtonWrapper"]}>
        <Tooltip title={"Code mode"}>
          <Button
            className={classes["ChatBar" + theme + "Button"]}
            onClick={() => dispatch(toggleChatCodeEditor())}
          >
            <CodeIcon className={classes["ChatBar" + theme + "ToggleMod"]} />
          </Button>
        </Tooltip>
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
        <Tooltip title={activeChat.isGroup ? "Leave group" : "Delete chat"}>
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
            {
              activeChat.isGroup && uid === activeChat.ownerUid && activeChat.membersUid.length !== 2 ?
                <>
                  <p>Choose new owner</p>
                  <div className={classes["ChatBar" + theme + "RelativeWrapper"]}>
                      <div className={classes["ChatBar" + theme + "MembersWrapper"]}>
                        {
                          activeChat.membersUid.map((uid, index) => (
                            <ChatMember inConstructor={false} uid={uid} key={index} />
                          ))
                        }
                    </div>
                  </div>
                  <Button
                    className={classes["ChatBar" + theme + "ModalButton"]}
                    onClick={closeModal}
                  >Cancel</Button>
                  <Button
                    className={classes["ChatBar" + theme + "ModalButton"]}
                    onClick={() => {
                      dispatch(leaveFromGroup(activeChat, currentUser, nextOwnerUid))
                      closeModal()
                    }}
                    disabled={nextOwnerUid === ""}
                  >Leave</Button>
                </>
              :
                <>
                  <p>Are you sure you want to {activeChat.isGroup ? "leave the group" : "delete the chat"}?</p>
                  <Button
                    className={classes["ChatBar" + theme + "ModalButton"]}
                    onClick={closeModal}
                  >Cancel</Button>
                  <Button className={classes["ChatBar" + theme + "ModalButton"]} onClick={() => {
                    if(activeChat.isGroup) {
                      dispatch(leaveFromGroup(activeChat, currentUser))
                    } else {
                      dispatch(deleteChat(activeChat, uid as string))
                    }
                  }}>{activeChat.isGroup ? "Leave" : "Delete"}</Button>
                </>
            }
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ChatBar