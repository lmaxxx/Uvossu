import classes from './CodeOutput.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../Store";
import {Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import {clearCodeOutput} from '../../Store/code/codeActions'

const CodeOutput = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const output = useSelector((state: StoreType) => state.code.codeEditorOutput)
  const dispatch = useDispatch()

  return (
    <div className={classes["CodeOutput" + theme]}>
      <div className={classes["CodeOutput" + theme + "Bar"]}>
        <p className={classes["CodeOutput" + theme + "Title"]}>Output</p>
        <Tooltip title={"Clear Output"}>
          <Button
            className={classes["CodeOutput" + theme + "Button"]}
            onClick={() => dispatch(clearCodeOutput())}
          >
            <ReplayRoundedIcon className={classes["CodeOutput" + theme + "Icon"]} />
          </Button>
        </Tooltip>
      </div>
      <div className={classes["CodeOutput" + theme + "OutputWrapper"]}>
        <div className={classes["CodeOutput" + theme + "Output"]}>{output}</div>
      </div>
    </div>
  )
}

export default CodeOutput