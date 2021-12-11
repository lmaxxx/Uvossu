import classes from './CodeEditor.module.scss'
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from "../../Store";
import DarkOutlineInput from "../../UI/OutlineInput/DarkOutlineInput";
import {changeCodeMode, setCodeStoreField, compileCode} from "../../Store/code/codeActions";
import modes from "../../compilerModes";
import MenuItem from "@mui/material/MenuItem";
import LightOutlineInput from "../../UI/OutlineInput/LightOutlineInput";
import AceEditor from "react-ace";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const CodeEditor = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const editorMode = useSelector((state: StoreType) => state.code.codeEditorMode)
  const code = useSelector((state: StoreType) => state.code.codeEditorValue)
  const isCompiling = useSelector((state: StoreType) => state.code.isCompiling)
  const dispatch = useDispatch()
  const [editorTheme, setEditorTheme] = useState<string>('tomorrow')

  useEffect(() => {
    if(theme === "dark") {
      setEditorTheme("dracula")
    } else setEditorTheme("tomorrow")
  }, [theme])

  return (
    <div className={classes["CodeEditor" + theme]}>
      <div className={classes["CodeEditor" + theme + "Bar"]}>
        {
          theme === "dark" ?
            <DarkOutlineInput
              select
              label="Language"
              value={editorMode}
              onChange={(e: any) => dispatch(changeCodeMode(e.target.value, true))}
            >
              {
                modes.sort((a, b) =>
                  a.value.localeCompare(b.value)).map((mode: {value: string, label: string}) => (
                  <MenuItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </MenuItem>
                ))
              }
            </DarkOutlineInput>
            :
            <LightOutlineInput
              select
              label="Language"
              value={editorMode}
              onChange={(e: any) => dispatch(changeCodeMode(e.target.value, true))}
            >
              {
                modes.sort((a, b) =>
                  a.value.localeCompare(b.value)).map((mode: {value: string, label: string}) => (
                  <MenuItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </MenuItem>
                ))
              }
            </LightOutlineInput>
        }
        <Button
          className={classes["CodeEditor" + theme + "Button"]}
          onClick={() => dispatch(compileCode(code, editorMode))}
          disabled={isCompiling}
        >
          <PlayArrowIcon className={classes["CodeEditor" + theme + "Icon"]} />
        </Button>
      </div>
      <AceEditor
        placeholder="Write your code..."
        mode={editorMode}
        theme={editorTheme}
        name="messageCodeEditor"
        onChange={(newValue: string) => dispatch(setCodeStoreField("codeEditorValue", newValue))}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        height={"100%"}
        width={"100%"}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}/>
    </div>
  )
}

export default CodeEditor