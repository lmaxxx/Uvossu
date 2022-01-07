import classes from './CodeCompiler.module.scss'
import {useSelector} from "react-redux";
import {StoreType} from "../../Store";
import CodeEditor from "../CodeEditor/CodeEditor";
import CodeOutput from "../CodeOutput/CodeOutput";
import useMedia from 'use-media'
import NavBar from "../NavBar/NavBar";

const CodeCompiler = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const isTablet = useMedia({maxWidth: "850px"})

  return (
    <div className={classes["CodeCompiler" + theme]}>
      <CodeEditor />
      <CodeOutput />
      {isTablet && <NavBar />}
    </div>
  )
}

export default CodeCompiler