import classes from './CodeEditor.module.scss'
import {useSelector} from "react-redux";
import {StoreType} from "../../Store";

const CodeEditor = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)

  return (
    <div className={classes["CodeEditor" + theme]}>

    </div>
  )
}

export default CodeEditor