import classes from './SetNameForm.module.scss'
import Button from '@mui/material/Button';
import {ChangeEvent, useState, useEffect} from 'react'
import CustomOutlineInput from '../../UI/CustomOutlineInput/CustomOutlineInput'
import {useDispatch, useSelector} from 'react-redux';
import {StoreType} from '../../Store/'
import {setSettingsStoreField, setDisplayName} from '../../Store/settings/settingsActions'

const SetNameForm = () => {
  const dispatch = useDispatch()
  const newName = useSelector((state: StoreType) => state.settings.newName)
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const {theme} = currentUser
  const [isError, setIsError] = useState<boolean>(false)

  const isDisabled = () => {
    return (isError || !newName || newName === currentUser.displayName)
  }

  useEffect(() => {
    dispatch(setSettingsStoreField("newName", currentUser.displayName))
  }, [])

  useEffect(() => {
    if(newName) {
      validate()
    }
  }, [newName])

  const validate = () => {
    if(newName.trim().length < 3) {
      setIsError(true)
    } 
    else {
      setIsError(false)
    }
  }

  return (
    <form className={classes["SetNameForm" + theme]} onSubmit={(e) => {
      dispatch(setDisplayName(e, newName, currentUser))
    }}>
      <p className={classes["SetNameForm" + theme + "Subtitle"]}>Change name</p>
      <div className={classes["SetNameForm" + theme + "Wrapper"]} >
        <CustomOutlineInput
          className={classes["SetNameForm" + theme + "Input"]}
          error={isError} 
          variant="outlined"
          label="Name" 
          value={newName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(setSettingsStoreField("newName", e.target.value))
          }}
        />
        <Button 
          className={classes["SetNameForm" + theme + "Button"]} 
          disabled={isDisabled()} 
          sx={{ backgroundColor: '#6588DE'}} 
          type={'submit'} 
          variant="contained"
        >Submit</Button>
      </div>
    </form>
  )
}

export default SetNameForm