import classes from './SoundRecorder.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {StoreType} from "../../Store";
import {ReactMic} from 'react-mic';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import {setChatStoreField, endRecording, sendVoiceMessage} from "../../Store/chat/chatActions";
import {Backdrop, Box, Fade, Modal, Button} from "@mui/material";
import {useStopwatch} from 'react-timer-hook';

const SoundRecorder = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const dispatch = useDispatch()
  const isRecording = useSelector((state: StoreType) => state.chat.isRecording)
  const recordedBlob = useSelector((state: StoreType) => state.chat.recordedBlob)
  const activeChat = useSelector((state: StoreType) => state.chat.activeChat)
  const currentUserUid = useSelector((state: StoreType) => state.app.currentUser.uid)
  const {
    seconds,
    minutes,
    pause,
  } = useStopwatch({ autoStart: true });
  const [open, setOpen] = useState<boolean>(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  useEffect(() => {
    dispatch(setChatStoreField("isRecording", true))
  }, []);

  return (
    <div className={classes["SoundRecorder" + theme]}>
  <ReactMic
    record={isRecording}
    className={classes["SoundRecorder" + theme + "Recorder"]}
    onStop={(recordedBlob: any) => {
      dispatch(setChatStoreField("recordedBlob", recordedBlob))
      openModal()
    }}
    strokeColor="#0A80FF"
    mimeType="audio/mp3"
    backgroundColor={theme === 'dark' ? "#1A2236" : "#fff"}
  />
  <p className={classes["SoundRecorder" + theme + "Timer"]}>{
    minutes <= 9 ? "0" + minutes : minutes
  }:{
    seconds <= 9 ? "0" + seconds : seconds
  }</p>
  <Button
    className={classes["SoundRecorder" + theme + "Button"]}
    onClick={() => {
      dispatch(endRecording())
      pause()
    }}
  >
    <CropSquareRoundedIcon className={classes["SoundRecorder" + theme + "IconButton"]} />
  </Button>

  <Modal
    open={open}
    onClose={() => {
      closeModal()
      dispatch(setChatStoreField("openRecording", false))
      dispatch(setChatStoreField("recordedBlob", {}))
    }}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
      <Box className={classes["SoundRecorder" + theme + "Modal"]} >
        <p>Do you want to send this voice message?</p>
        <Button
          className={classes["SoundRecorder" + theme + "ModalButton"]}
          onClick={() => {
            closeModal()
            dispatch(setChatStoreField("openRecording", false))
            dispatch(setChatStoreField("recordedBlob", {}))
          }}
        >No</Button>
        <Button
          className={classes["SoundRecorder" + theme + "ModalButton"]}
          onClick={() => {
            closeModal()
            dispatch(sendVoiceMessage(recordedBlob, activeChat, currentUserUid as string))
            dispatch(setChatStoreField("openRecording", false))
            dispatch(setChatStoreField("recordedBlob", {}))
          }}
        >Yes</Button>
      </Box>
    </Fade>
  </Modal>
</div>
  )
}

export default SoundRecorder