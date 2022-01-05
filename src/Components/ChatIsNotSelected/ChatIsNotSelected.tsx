import classes from './ChatIsNotSelected.module.scss'
import {useSelector} from "react-redux";
import {StoreType} from "../../Store";
import Img from  '../../img/chatIsNotSelected.svg'
import {useMedia} from "use-media";

const ChatIsNotSelected = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const isTablet = useMedia({minWidth: "850px"})

  if(!isTablet) {
    return <></>
  }

  return (
    <div className={classes["ChatIsNotSelected" + theme]}>
      <div className={classes["ChatIsNotSelected" + theme + "Wrapper"]}>
        <img src={Img} alt="" className={classes["ChatIsNotSelected" + theme + "Img"]}/>
        <h3 className={classes["ChatIsNotSelected" + theme + "Text"]}>Select a chat to read messages</h3>
      </div>
    </div>
  )
}

export default ChatIsNotSelected