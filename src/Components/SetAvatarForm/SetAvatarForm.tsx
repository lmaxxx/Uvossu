import classes from "./SetAvatarForm.module.scss"
import Button from '@mui/material/Button';
import { FC } from 'react'
import {User} from '../../types'

interface PropsType {
  userData: User
  setAvatar: (e: any) => void
  theme: string
}

const SetAvatarForm: FC<PropsType> = ({userData, setAvatar, theme}) => {
  return (
    <div className={classes["SetAvatarForm" + theme]}>
        <h2 className={classes["SetAvatarForm" + theme + "Subtitle"]}>Avatar</h2>
        <img className={classes["SetAvatarForm" + theme + "Avatar"]} src={userData?.photoURL} alt="avatar" />
        <label htmlFor="contained-button-file">
          <input 
            onChange={setAvatar} 
            id="contained-button-file" 
            style={{display: 'none'}} 
            accept="image/png, .jpeg, .jpg, .svg" 
            type="file" 
          />
          <Button 
            sx={{ backgroundColor: '#6588DE'}} 
            variant="contained" 
            component="span"
            className={classes["SetAvatarForm" + theme + "Button"]}
          >Upload Photo</Button>
        </label>
      </div>
  )
}

export default SetAvatarForm