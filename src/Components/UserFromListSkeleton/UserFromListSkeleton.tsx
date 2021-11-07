import classes from './UserFromListSkeleton.module.scss'
import {StoreType} from "../../Store";
import {useSelector} from "react-redux";
import Skeleton from "@mui/material/Skeleton";

const UserFromListSkeleton = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)

  return (
    <div className={classes["UserFromListSkeleton" + theme]} >
      <Skeleton
        variant="circular"
        width={37}
        height={37}
        className={classes["UserFromList" + theme + "Avatar"]}
        sx={ theme === "light" ? {backgroundColor: "#E6E6E6"} : {backgroundColor: "#767A86"}}
      />
      <div className={classes["UserFromListSkeleton" + theme + "UserBody"]}>
        <Skeleton
          variant="text"
          height={19.5}
          width={"70%"}
          sx={ theme === "light" ? {backgroundColor: "#E6E6E6"} : {backgroundColor: "#767A86"}}
        />
        <Skeleton
          variant="rectangular"
          width={46}
          height={36}
          sx={ theme === "light" ? {backgroundColor: "#E6E6E6"} : {backgroundColor: "#767A86"}}
        />
      </div>
    </div>
  )
}

export default UserFromListSkeleton