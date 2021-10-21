import classes from './ChatAppWrapper.module.scss'
import Loader from '../../UI/Loader/Loader'
import Aside from '../Aside/Aside'
import {useSelector} from 'react-redux'
import { StoreType } from '../../Store'
import StartChatWrapper from '../StartChatWrapper/StartChatWrapper'

const ChatAppWrapper = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)

  if(theme === undefined) {
    return <Loader width={'100%'} height={'100vh'} backgroundColor={'#fff'} type={'Grid'} />
  } else return (
    <div style={{ backgroundColor: theme === 'dark' ? "#222222": "#fff"}} className={classes.ChatAppWrapper}>
      <Aside />
      <StartChatWrapper />
    </div>

  )
}

export default ChatAppWrapper