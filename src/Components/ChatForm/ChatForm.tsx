import classes from './ChatForm.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {sendTextMessage, setChatStoreField, startRecording} from "../../Store/chat/chatActions";
import {StoreType} from '../../Store'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import sendMessageSound from '../../audio/send-message-sound.mp3'
import useSound from 'use-sound'
import TextareaAutosize from 'react-textarea-autosize';
import {KeyboardEvent} from "react";
import Button from "@mui/material/Button";
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import Picker from 'emoji-picker-react';
import Popover from '@mui/material/Popover';
import {useState, useRef, useEffect} from 'react'
import FilePicker from '../FilePicker/FilePicker'
import {isEmpty} from "lodash";
import ReplyingMessage from "../ReplyingMessage/ReplyingMessage";
import MicIcon from '@mui/icons-material/Mic';
import SoundRecorder from "../SoundRecorder/SoundRecorder";

const ChatForm = () => {
  const dispatch = useDispatch()
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const currentUserUid = useSelector((state: StoreType) => state.app.currentUser.uid)
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const chatFormInputValue = useSelector((state: StoreType) => state.chat.chatFormInputValue)
  const isSending = useSelector((state: StoreType) => state.chat.isSending)
  const replyingMessage = useSelector((state: StoreType) => state.chat.replyingMessage)
  const openRecording = useSelector((state: StoreType) => state.chat.openRecording)
  const textAreaRef = useRef() as any
  const [play] = useSound(sendMessageSound)
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    textAreaRef.current.focus()
  }, [activeChat])

  const openEmojiPicker = (event: any) => {
    setAnchorEl(event.currentTarget)
  };

  const closeEmojiPicker = () => {
    setAnchorEl(null)
  };

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined;

  const textAreaKeyDown = (e: any) => {
    if(e.ctrlKey && e.keyCode === 13) {
      dispatch(setChatStoreField("chatFormInputValue", e.target.value + "\n"))
    }
    else if(e.keyCode === 13) {
      dispatch(sendTextMessage(
        e,
        activeChat,
        chatFormInputValue,
        play,
        currentUserUid,
        textAreaRef,
        replyingMessage
      ))
    }
  }

  function chooseEmoji(_: any, emojiObject: any) {
    dispatch(setChatStoreField("chatFormInputValue", chatFormInputValue + emojiObject.emoji))
  }


  return (
    <>
    <form className={classes["ChatForm" + theme]} onSubmit={(e) => {
      if(!chatFormInputValue && !/^\n+$/.test(chatFormInputValue)) {
        e.preventDefault()
        dispatch(startRecording())
      } else {
        dispatch(sendTextMessage(
          e,
          activeChat,
          chatFormInputValue,
          play,
          currentUserUid,
          textAreaRef,
          replyingMessage
        ))
      }
    }}>
      {!isEmpty(replyingMessage) && <ReplyingMessage />}
      {
        openRecording ?
          <SoundRecorder />
          :
          <div className={classes["ChatForm" + theme + "Wrapper"]}>
            <FilePicker />
            <TextareaAutosize
              cacheMeasurements
              value={chatFormInputValue}
              onChange={(e) => dispatch(setChatStoreField("chatFormInputValue", e.target.value))}
              onKeyDown={(e:KeyboardEvent<HTMLTextAreaElement>) => textAreaKeyDown(e)}
              className={classes["ChatForm" + theme + "Input"]}
              placeholder={"Write a message..."}
              disabled={isSending}
              ref={textAreaRef}
            />
            <Button onClick={openEmojiPicker} className={classes["ChatForm" + theme + "Button"]}>
              <EmojiEmotionsOutlinedIcon className={classes["ChatForm" + theme + "Icon"]} />
            </Button>
            <Button
              type={"submit"}
              style={isSending ? {color: "#fff"}: {}}
              className={classes["ChatForm" + theme + "Button"]}
            >
              {
                !chatFormInputValue && !/^\n+$/.test(chatFormInputValue) ?
                  <MicIcon className={classes["ChatForm" + theme + "SendIcon"]} />
                  :
                  <SendOutlinedIcon className={classes["ChatForm" + theme + "SendIcon"]} />
              }
            </Button>
          </div>
      }
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={closeEmojiPicker}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Picker
          onEmojiClick={chooseEmoji}
          native
        />
      </Popover>
    </form>
    </>
  )
}

export default ChatForm