import classes from './SetNameForm.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FC, ChangeEvent, useState, FormEvent} from 'react'


interface PropsType {
  setDisplayName: (e: FormEvent<HTMLFormElement>) => void
  newName: string
  setNewName: (text: string) => void
  theme: string
}

const SetNameForm: FC<PropsType> = ({setDisplayName, newName, setNewName, theme}) => {
  const [errorText, setErrorText] = useState<string>()
  const [oldName, setOldName] = useState<string>(newName)

  const isDisabled = () => {
    return (errorText || !newName || oldName === newName) as boolean
  }

  const validate = (text: string) => {
    if(text.trim().length < 3) {
      setErrorText("Name should be at least 3 characters")
    } else {
      setErrorText('')
    }
  }

  return (
    <form className={classes["SetNameForm" + theme]} onSubmit={(e) => {
      setDisplayName(e)
      setOldName(newName)
    }}>
      <p className={classes["SetNameForm" + theme + "Subtitle"]}>Change name</p>
      <div className={classes["SetNameForm" + theme + "Wrapper"]} >
        <TextField
          className={classes["SetNameForm" + theme + "Input"]}
          error={!!errorText} 
          helperText={errorText}
          variant="filled"
          label="Name" 
          value={newName}
          focused
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNewName(e.target.value)
            validate(e.target.value)
          }}
        />
        <Button 
          className={classes["SetNameForm" + theme + "Button"]} 
          disabled={isDisabled()} sx={{ backgroundColor: '#6588DE'}} 
          type={'submit'} 
          variant="contained"
        >Submit</Button>
      </div>
    </form>
  )
}

export default SetNameForm