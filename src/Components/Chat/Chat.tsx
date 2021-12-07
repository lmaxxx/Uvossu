import classes from './Chat.module.scss'
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from "../../Store";
import ChatBar from '../ChatBar/ChatBar'
import ChatForm from '../ChatForm/ChatForm'
import ChatMessagesList from "../ChatMessagesList/ChatMessagesList";
import {useDropzone} from 'react-dropzone';
import {useEffect} from "react";
import {pickFiles, openFilesModal} from "../../Store/chat/chatActions";
import Lightbox from "react-awesome-lightbox";
import {closeImageViewer} from "../../Store/app/appActions";
import Snackbar from "@mui/material/Snackbar";
import {Slide} from "@material-ui/core";
import Alert from "@mui/material/Alert";
import ChatCodeEditor from "../ChatCodeEditor/ChatCodeEditor"

const Chat = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const showImageViewer = useSelector((state: StoreType) => state.app.showImageViewer)
  const imageForView = useSelector((state: StoreType) => state.app.imageForView)
  const inOpenChatCodeEditor = useSelector((state: StoreType) => state.code.inOpenChatCodeEditor)
  const openSendingFilesSnackBar = useSelector((state: StoreType) => state.chat.openSendingFilesSnackBar)
  const dispatch = useDispatch()
  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive,
  } = useDropzone({noKeyboard: true, noClick: true})

  const TransitionDownComponent = (props: any) => {
    return <Slide {...props} direction="down" />
  }

  useEffect(() => {
    if(acceptedFiles.length > 0) {
      dispatch(pickFiles(null, acceptedFiles))
      dispatch(openFilesModal())
    }
  }, [acceptedFiles])

  return (
    <div className={classes["Chat" + theme]} {...getRootProps()}>
      {showImageViewer && <Lightbox
          onClose={() => dispatch(closeImageViewer())}
          showTitle={false}
          buttonAlign={"center"}
          image={imageForView}
      />}
      <input {...getInputProps()} />
      <ChatBar />
      {
        inOpenChatCodeEditor ?
          <ChatCodeEditor />
          :
          <>
            <ChatMessagesList />
            <ChatForm />
          </>
      }


      <div
        className={classes["Chat" + theme + "Alert"]}
        style={isDragActive ? {display: "grid"} : {}}
      >
        Drop files here to send them
      </div>

      <Snackbar
        open={openSendingFilesSnackBar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={TransitionDownComponent}
      >
        <Alert variant="filled" severity="info">Files are sending...</Alert>
      </Snackbar>
    </div>
  )
}

export default Chat