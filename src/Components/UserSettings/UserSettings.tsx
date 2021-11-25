import {NavLink} from 'react-router-dom'
import classes from './UserSettings.module.scss'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SetAvatarForm from '../SetAvatarForm/SetAvatarForm';
import SetNameForm from '../SetNameForm/SetNameForm'
import SetPasswordForm from '../SetPasswordForm/SetPasswordForm'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import ToggleTheme from "react-toggle-theme";
import {useDispatch, useSelector} from 'react-redux'
import {StoreType} from '../../Store'
import {toggleTheme, setSettingsStoreField} from '../../Store/settings/settingsActions'
import {signOut} from '../../Store/auth/authActions'

const UserSettings = () => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const {theme} = currentUser
  const snackbarMessage = useSelector((state: StoreType) => state.settings.snackbarMessage)
  const showSnackbar = useSelector((state: StoreType) => state.settings.showSnackbar)
  const snackbarType = useSelector((state: StoreType) => state.settings.snackbarType)
  const showBackdrop = useSelector((state: StoreType) => state.settings.showBackdrop)
  const dispatch = useDispatch()

    return (
      <div className={classes["UserSettings" + theme]}> 
        <nav className={classes["UserSettings" + theme + "Nav"]}>
          <NavLink className={classes["UserSettings" + theme + "Link"]}  to="/">
            <ArrowBackIosIcon className={classes["UserSettings" + theme + "Icon"]} />
          </NavLink>
          <h1 className={classes["UserSettings" + theme + "Title"]} >Settings</h1>
          <ToggleTheme
            onChange={() => dispatch(toggleTheme(theme!, currentUser))}
            selectedTheme={theme as any}
          />
        </nav>
        <div className={classes["UserSettings" + theme + "Wrapper"]}>
          <SetAvatarForm />
          <SetNameForm />
          {currentUser.uemail && <SetPasswordForm />}
        </div>
        <Snackbar open={showSnackbar} autoHideDuration={3500} onClose={() => dispatch(setSettingsStoreField("showSnackbar", false))}>
            <Alert variant="filled" severity={snackbarType as any}>{snackbarMessage}</Alert>
        </Snackbar>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
}

export default UserSettings