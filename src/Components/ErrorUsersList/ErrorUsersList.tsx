import classes from './ErrorUsersList.module.scss'
import {useSelector} from 'react-redux'
import {StoreType} from '../../Store'

const ErrorUsersList = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const query = useSelector((state: StoreType) => state.app.filterUsersQuery)

  return (
    <div className={classes["ErrorUsersList" + theme]}>
      Nothing found by "{query}"
    </div>
  )
}

export default ErrorUsersList