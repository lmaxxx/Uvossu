import classes from './ChatFromListSkeleton.module.scss'
import {useSelector} from 'react-redux'
import {StoreType} from "../../Store";
import Skeleton from '@mui/material/Skeleton';

const ChatFromListSkeleton = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)

  return (
    <div className={classes["ChatFromListSkeleton" + theme]}>
      <Skeleton
        variant="circular"
        width={37}
        height={37}
        className={classes["ChatFromListSkeleton" + theme + "Avatar"]}
        sx={ theme === "light" ? {backgroundColor: "#E6E6E6"} : {backgroundColor: "#767A86"}}
      />
      <div className={classes["ChatFromListSkeleton" + theme + "MessageBody"]}>
        <Skeleton
          variant="text"
          height={19.5}
          sx={ theme === "light" ? {backgroundColor: "#E6E6E6"} : {backgroundColor: "#767A86"}}
        />
        <Skeleton
          variant="text"
          height={17.5}
          sx={ theme === "light" ? {backgroundColor: "#E6E6E6"} : {backgroundColor: "#767A86"}}
        />
      </div>
    </div>
  )
}

export default ChatFromListSkeleton