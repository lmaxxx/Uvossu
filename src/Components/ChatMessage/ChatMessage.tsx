import {FC, MouseEvent, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {StoreType} from '../../Store'
import {Message, MessageTypes} from "../../types";
import TextMessage from "../TextMessage/TextMessage";
import AlertMessage from "../AlertMessage/AlertMessage";
import TimeMessage from "../TimeMessage/TimeMessage";
import ImageMessage from "../ImageMessage/ImageMessage";
import VideoMessage from "../VideoMessage/VideoMessage";
import FileMessage from "../FileMessage/FileMessage";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {copyTextToClipBoard, deleteMessage} from '../../Store/chat/chatActions'

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
    const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
    const {isGroup, id: chatId} = activeChat
    const messages: Message[] = useSelector((state: StoreType) => state.chat.messages)
    const currentUserUid = useSelector((state: StoreType) => state.app.currentUser.uid)
    const creator = useSelector((state: StoreType) => state.app.usersObject[messageProps.creatorUid])
    const previousMessage = useSelector((state: StoreType) => state.chat.messages[index + 1])

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
          <MenuItem onClick={closeContextMenu}>Reply</MenuItem>
          <MenuItem onClick={closeContextMenu}>Forward</MenuItem>
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
      )
    }


    switch(messageProps.type) {
      case MessageTypes.TEXT:
        return (
          <>
            <TextMessage
              onContextMenu={openContextMenu}
              time={messageProps.time}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              value={messageProps.value}
              renderUserInfo={renderUserInfo()}
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
              src={messageProps.url as string}
              renderUserInfo={renderUserInfo()}
              time={messageProps.time}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              fileName={messageProps.fileName as string}
              fileExtension={messageProps.fileExtension as string}
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
              src={messageProps.url as string}
              renderUserInfo={renderUserInfo()}
              time={messageProps.time}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              fileName={messageProps.fileName as string}
              fileExtension={messageProps.fileExtension as string}
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
              src={messageProps.url as string}
              renderUserInfo={renderUserInfo()}
              time={messageProps.time}
              isOwn={currentUserUid === messageProps.creatorUid}
              creator={creator}
              fileName={messageProps.fileName as string}
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