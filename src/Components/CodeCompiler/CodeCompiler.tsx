import classes from './CodeCompiler.module.scss'
import {useSelector} from "react-redux";
import {StoreType} from "../../Store";
import CodeEditor from "../CodeEditor/CodeEditor";
import CodeOutput from "../CodeOutput/CodeOutput";

const CodeCompiler = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)

  return (
    <div className={classes["CodeCompiler" + theme]}>
      <CodeEditor />
      <CodeOutput />
    </div>
  )
}

export default CodeCompiler