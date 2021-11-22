import classes from './File.module.scss'
import {FC} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {StoreType} from '../../Store'
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {deleteFile} from "../../Store/chat/chatActions";

interface PropsType {
  file: File,
  index: number
}

const File: FC<PropsType> = ({file, index}) => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const dispatch = useDispatch()

  return (
    <div className={classes["File" + theme]}>
      <img
        className={classes["File" + theme + "Img"]}
        src={file.type.startsWith("image/") ? URL.createObjectURL(file) : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FFiles%2Fcheck_file1600.png&f=1&nofb=1"} 
        alt="" />
      <p className={classes["File" + theme + "Name"]}>{file.name}</p>
      <Tooltip placement={"right"} title={"Delete file"}>
        <Button
          className={classes["File" + theme + "Button"]}
          onClick={() => dispatch(deleteFile(index))}
        >
          <ClearRoundedIcon className={classes["File" + theme + "Icon"]} />
        </Button>
      </Tooltip>
    </div>
  )
}

export default File