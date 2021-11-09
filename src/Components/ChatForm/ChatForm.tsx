import classes from './ChatForm.module.scss'
import LoadingButton from "@mui/lab/LoadingButton";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, setChatStoreField} from "../../Store/chat/chatActions";
import {StoreType} from '../../Store'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MicIcon from '@mui/icons-material/Mic';
import sendMessageSound from '../../audio/send-message-sound.mp3'
import useSound from 'use-sound'
import TextareaAutosize from 'react-textarea-autosize';
import {KeyboardEvent} from "react";
import Button from "@mui/material/Button";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import Picker from 'emoji-picker-react';
import Popover from '@mui/material/Popover';
import {useState, useRef, useEffect} from 'react'

const ChatForm = () => {
  const dispatch = useDispatch()
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const currentUserUid = useSelector((state: StoreType) => state.app.currentUser.uid)
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const chatFormInputValue = useSelector((state: StoreType) => state.chat.chatFormInputValue)
  const isSending = useSelector((state: StoreType) => state.chat.isSending)
  const textAreaRef = useRef() as any
  const [play] = useSound(sendMessageSound)
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    textAreaRef.current?.focus()
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
      dispatch(sendMessage(e, activeChat, chatFormInputValue, play, currentUserUid))
      dispatch(setChatStoreField("hasMoreMessages", true))
      textAreaRef.current?.focus()
    }
  }

  function chooseEmoji(_: any, emojiObject: any) {
    dispatch(setChatStoreField("chatFormInputValue", chatFormInputValue + emojiObject.emoji))
  }


  return (
    <form className={classes["ChatForm" + theme]} onSubmit={(e) => {
      dispatch(sendMessage(e, activeChat, chatFormInputValue, play, currentUserUid))
      dispatch(setChatStoreField("hasMoreMessages", true))
      textAreaRef.current?.focus()
    }}>
      <Button className={classes["ChatForm" + theme + "Button"]}>
        <AttachFileOutlinedIcon className={classes["ChatForm" + theme + "Icon"]} />
      </Button>
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
      <LoadingButton
        type={"submit"}
        loading={isSending}
        loadingPosition="end"
        style={isSending ? {color: "#fff"}: {}}
        className={classes["ChatForm" + theme + "Button"]}
      >{isSending ?
        "" : chatFormInputValue && !/^\n+$/.test(chatFormInputValue) ?
          <SendOutlinedIcon className={classes["ChatForm" + theme + "SendIcon"]} />
          :
          <MicIcon className={classes["ChatForm" + theme + "SendIcon"]} />
      }</LoadingButton>

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
  )
}

export default ChatForm