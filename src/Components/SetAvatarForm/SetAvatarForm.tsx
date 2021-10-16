import classes from "./SetAvatarForm.module.scss"
import Button from '@mui/material/Button'
import ImageLoader from '../../UI/ImageLoader/ImageLoader'
import {useDispatch, useSelector} from 'react-redux'
import {StoreType} from '../../Store/'
import {setAvatar} from '../../Store/settings/settingsActions'

const SetAvatarForm = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const {theme} = currentUser 

  return (
    <div className={classes["SetAvatarForm" + theme]}>
        <h2 className={classes["SetAvatarForm" + theme + "Subtitle"]}>Avatar</h2>
        <ImageLoader className={classes["SetAvatarForm" + theme + "Avatar"]} height={200} width={200} src={currentUser.photoURL} />
        <label htmlFor="contained-button-file">
          <input 
            onChange={(e: any) => dispatch(setAvatar(e, currentUser))} 
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