import classes from './FilePicker.module.scss'
import Button from "@mui/material/Button";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from "../../Store";
import {pickFiles} from "../../Store/chat/chatActions";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {openFilesModal, closeFilesModal, sendFiles} from "../../Store/chat/chatActions";
import File from '../File/File'

const FilePicker = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const userUid = useSelector((state: StoreType) => state.app.currentUser.uid)
  const activeChatId = useSelector((state: StoreType) => state.chat.activeChat.id)
  const dispatch = useDispatch()
  const isOpenFilesModal = useSelector((state: StoreType) => state.chat.isOpenFilesModal)
  const files = useSelector((state: StoreType) => state.chat.files)

  return (
    <div className={classes["FilePicker" + theme]}>
      <label htmlFor="file-picker">
        <input
          style={{display: "none"}}
          id="file-picker"
          multiple
          type="file"
          onChange={(e: any) => {
            dispatch(pickFiles(e))
            dispatch(openFilesModal())
          }}
        />
        <Button component={"span"} className={classes["FilePicker" + theme + "Button"]}>
          <AttachFileOutlinedIcon className={classes["FilePicker" + theme + "Icon"]} />
        </Button>
      </label>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpenFilesModal}
        onClose={() => dispatch(closeFilesModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpenFilesModal}>
            <Box className={classes["FilePicker" + theme + "Modal"]} style={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto"
            }}>
              <p>Files</p>
                <div className={classes["FilePicker" + theme + "RelativeWrapper"]}>
                  <div className={classes["FilePicker" + theme + "MembersWrapper"]}>
                    {
                      files.map((file: any, index: number) => {
                        return <File key={index} index={index} file={file} />
                      })
                    }
                  </div>
                </div>
                <Button
                  className={classes["FilePicker" + theme + "ModalButton"]}
                  onClick={() => dispatch(closeFilesModal())}
                >Cancel</Button>
                <Button
                  className={classes["FilePicker" + theme + "ModalButton"]}
                  onClick={() => {
                    dispatch(sendFiles(files, activeChatId as string, userUid as string))
                  }}
                >Send</Button>
            </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default FilePicker