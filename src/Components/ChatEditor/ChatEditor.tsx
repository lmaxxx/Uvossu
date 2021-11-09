import classes from './ChatEditor.module.scss'
import {useSelector} from 'react-redux'
import {StoreType} from '../../Store'

const ChatEditor = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)


  return (
    <div>

    </div>
  )
}

export default ChatEditor