import classes from './SetPasswordForm.module.scss'
import {FC} from 'react'
import Button from '@mui/material/Button';

interface PropsType {
  setPassword: () => void
  theme: string
}

const SetPasswordForm: FC<PropsType> = ({setPassword, theme}) => {
  return (
    <div className={classes["SetPasswordForm" + theme]}>
      <h2 className={classes["SetPasswordForm" + theme + "Subtitle"]}>Reset password</h2>
      <Button 
        className={classes["SetPasswordForm" + theme + "Button"]}
        onClick={setPassword}
        sx={{ backgroundColor: '#6588DE'}} 
        variant="contained" 
      >Reset password</Button>
    </div>
  )
}

export default SetPasswordForm 