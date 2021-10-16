import classes from './SetPasswordForm.module.scss'
import Button from '@mui/material/Button'
import {useDispatch, useSelector} from 'react-redux'
import {StoreType} from '../../Store'
import {setPassword} from '../../Store/settings/settingsActions'

const SetPasswordForm = () => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const {theme} = currentUser
  const dispatch = useDispatch()


  return (
    <div className={classes["SetPasswordForm" + theme]}>
      <h2 className={classes["SetPasswordForm" + theme + "Subtitle"]}>Reset password</h2>
      <Button 
        className={classes["SetPasswordForm" + theme + "Button"]}
        onClick={() => dispatch(setPassword(currentUser))}
        sx={{ backgroundColor: '#6588DE'}} 
        variant="contained" 
      >Reset password</Button>
    </div>
  )
}

export default SetPasswordForm 