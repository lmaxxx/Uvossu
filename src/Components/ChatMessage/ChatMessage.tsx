import {FC, MouseEvent, Ref, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {StoreType} from '../../Store'
import {Message, MessageTypes, Chat} from "../../types";
import TextMessage from "../TextMessage/TextMessage";
import AlertMessage from "../AlertMessage/AlertMessage";
import TimeMessage from "../TimeMessage/TimeMessage";
import ImageMessage from "../ImageMessage/ImageMessage";
import VideoMessage from "../VideoMessage/VideoMessage";
import VoiceMessage from "../VoiceMessage/VoiceMessage";
import FileMessage from "../FileMessage/FileMessage";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {copyTextToClipBoard, deleteMessage, setChatStoreField} from '../../Store/chat/chatActions'
import {Backdrop, Box, Fade, Modal} from "@mui/material";
import classes from "./ChatMessage.module.scss";
import Button from "@mui/material/Button";
import {setGroupConstructorStoreField} from "../../Store/groupConstructor/groupConstructorActions";
import ChatFromList from "../ChatFromList/ChatFromList";
import CodeMessage from "../CodeMessage/CodeMessage";

interface TypeProps {
  messageProps: Message
  index: number
}

const ChatMessage: FC<TypeProps> =
  ({
     messageProps,
     index,
  }) => {
    const dispatch = useDispatch()
    const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
    const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
    const chats = useSelector((state: StoreType) => state.chat.chats)
    const {isGroup} = activeChat
    const messages: Message[] = useSelector((state: StoreType) => state.chat.messages)
    const currentUserUid = useSelector((state: StoreType) => state.app.currentUser.uid)
    const creator = useSelector((state: StoreType) => state.app.usersObject[messageProps.creatorUid])
    const previousMessage = useSelector((state: StoreType) => state.chat.messages[index + 1])
    const [open, setOpen] = useState(false)
    const [messageRef, setMessageRef] = useState<any>()
    const openModal = () => setOpen(true)
    const closeModal = () => {
      setOpen(false)
      dispatch(setGroupConstructorStoreField("nextOwnerUid", ''))
    }

    const renderUserInfo = () => {
      if (!isGroup) {
        return false
      }

      if(creator.uid === currentUserUid) {
        return false
      }


      if (messages.length - 1 === index) {
        return true
      }

      if (messages[index + 1].creatorUid !== messages[index].creatorUid) {
        return true
      }

      const currentMessageMinutes = Math.floor(messageProps.createdAt / 60000)
      const previousMessageMinutes = Math.floor(messages[index + 1].createdAt / 60000)

      if(currentMessageMinutes - previousMessageMinutes < 10) {
        return false
      }

      return true
    }

    const renderDate = () => {
      if (messages.length - 1 === index) {
        return true
      }

      const currentMessageDate = new Date(messageProps.createdAt)
      const previousMessageDate = new Date(messages[index + 1].createdAt)
      const currentDateTime = currentMessageDate.getDate() + currentMessageDate.getMonth() + currentMessageDate.getFullYear()
      const previousDateTime = previousMessageDate.getDate() + previousMessageDate.getMonth() + previousMessageDate.getFullYear()

      if(currentDateTime !== previousDateTime) {
        return true
      }

      return false
    }

    const [contextMenu, setContextMenu] = useState<{
      mouseX: number;
      mouseY: number;
    } | null>(null)

    const openContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      setContextMenu(
        contextMenu === null
          ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
          : null,
      )
    }

    const closeContextMenu = () => {
      setContextMenu(null);
    }

    const ContextMenu = ({type}: {type: MessageTypes}) => {
      return (
        <>
          <Menu
            open={contextMenu !== null}
            onClose={closeContextMenu}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            <MenuItem onClick={() => {
              dispatch(setChatStoreField("replyingMessage", messageProps))
              dispatch(setChatStoreField("replyingMessageRef", messageRef))
              closeContextMenu()
            }}>Reply</MenuItem>
            {
              chats.length > 1 && <MenuItem onClick={() => {
                closeContextMenu()
                openModal()
              }}>Forward</MenuItem>
            }

            {
              type === MessageTypes.TEXT &&
              <MenuItem onClick={() => {
                copyTextToClipBoard(messageProps.value)
                closeContextMenu()
              }}>Copy Text</MenuItem>
            }
            {
              currentUserUid === messageProps.creatorUid &&
              <MenuItem onClick={() => {
                dispatch(deleteMessage(
                  messageProps.id,
                  activeChat,
                  closeContextMenu,
                  previousMessage,
                  index
                ))
              }}>Delete</MenuItem>
            }
          </Menu>
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
              <Box className={classes["ChatMessage" + theme + "Modal"]} >
                      <p>Forward to</p>
                      <div className={classes["ChatMessage" + theme + "RelativeWrapper"]}>
                        <div onClick={closeModal} className={classes["ChatMessage" + theme + "ChatsWrapper"]}>
                          {
                            chats.map((chat: Chat, index) => {
                              return <ChatFromList message={messageProps} key={index} chat={chat} />
                            }

                            )
                          }
                        </div>
                      </div>
                      <Button
                        className={classes["ChatMessage" + theme + "ModalButton"]}
                        onClick={closeModal}
                      >Cancel</Button>
              </Box>
            </Fade>
          </Modal>
        </>
      )
    }


    switch(messageProps.type) {
      case MessageTypes.TEXT:
        return (
          <>
            <TextMessage
              onContextMenu={openContextMenu}
              contextIsOpen={!!contextMenu}
              time={messageProps.time}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              value={messageProps.value}
              renderUserInfo={renderUserInfo()}
              setMessageRef={setMessageRef}
              replyingMessage={messageProps.replyingMessage as Message}
            />
            <ContextMenu type={MessageTypes.TEXT} />
            {renderDate() && <TimeMessage milliseconds={messageProps.createdAt} time={messageProps.time} />}
          </>
        )

      case MessageTypes.ALERT:
        return (
          <>
            <AlertMessage
              time={messageProps.time}
              value={messageProps.value}
            />
            {renderDate() && <TimeMessage milliseconds={messageProps.createdAt} time={messageProps.time} />}
          </>
        )

      case MessageTypes.IMAGE:
        return (
          <>
            <ImageMessage
              onContextMenu={openContextMenu}
              contextIsOpen={!!contextMenu}
              src={messageProps.url as string}
              renderUserInfo={renderUserInfo()}
              time={messageProps.time}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              fileName={messageProps.fileName as string}
              fileExtension={messageProps.fileExtension as string}
              setMessageRef={setMessageRef}
              replyingMessage={messageProps.replyingMessage as Message}
            />
            <ContextMenu type={MessageTypes.IMAGE} />
            {renderDate() && <TimeMessage milliseconds={messageProps.createdAt} time={messageProps.time} />}
          </>
        )

      case MessageTypes.VIDEO:
        return (
          <>
            <VideoMessage
              onContextMenu={openContextMenu}
              contextIsOpen={!!contextMenu}
              src={messageProps.url as string}
              renderUserInfo={renderUserInfo()}
              time={messageProps.time}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              fileName={messageProps.fileName as string}
              fileExtension={messageProps.fileExtension as string}
              setMessageRef={setMessageRef}
              replyingMessage={messageProps.replyingMessage as Message}
            />
            <ContextMenu type={MessageTypes.VIDEO} />
            {renderDate() && <TimeMessage milliseconds={messageProps.createdAt} time={messageProps.time} />}
          </>
        )

      case MessageTypes.FILE:
        return (
          <>
            <FileMessage
              onContextMenu={openContextMenu}
              contextIsOpen={!!contextMenu}
              src={messageProps.url as string}
              renderUserInfo={renderUserInfo()}
              time={messageProps.time}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              fileName={messageProps.fileName as string}
              fileExtension={messageProps.fileExtension as string}
              setMessageRef={setMessageRef}
              replyingMessage={messageProps.replyingMessage as Message}
            />
            <ContextMenu type={MessageTypes.FILE} />
            {renderDate() && <TimeMessage milliseconds={messageProps.createdAt} time={messageProps.time} />}
          </>
        )

      case MessageTypes.VOICE:
        return (
          <>
            <VoiceMessage
              onContextMenu={openContextMenu}
              contextIsOpen={!!contextMenu}
              src={messageProps.url as string}
              renderUserInfo={renderUserInfo()}
              time={messageProps.time}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              setMessageRef={setMessageRef}
              replyingMessage={messageProps.replyingMessage as Message}
            />
            <ContextMenu type={MessageTypes.FILE} />
            {renderDate() && <TimeMessage milliseconds={messageProps.createdAt} time={messageProps.time} />}
          </>
        )

      case MessageTypes.CODE:
        return (
          <>
            <CodeMessage
              onContextMenu={openContextMenu}
              contextIsOpen={!!contextMenu}
              renderUserInfo={renderUserInfo()}
              time={messageProps.time}
              code={messageProps.code as string}
              codeMode={messageProps.codeMode as string}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              setMessageRef={setMessageRef}
              replyingMessage={messageProps.replyingMessage as Message}
            />
            <ContextMenu type={MessageTypes.FILE} />
            {renderDate() && <TimeMessage milliseconds={messageProps.createdAt} time={messageProps.time} />}
          </>
        )
    }

  return (
    <></>
  )
}

export default ChatMessage