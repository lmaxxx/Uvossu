import classes from './SearchUserForm.module.scss'
import {clearFilteredUsers, filterUsers, setAppStoreField} from "../../Store/app/appActions";
import CustomOutlineInput from "../../UI/CustomOutlineInput/CustomOutlineInput";
import {ChangeEvent} from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import {useSelector, useDispatch} from "react-redux";
import {StoreType} from "../../Store";

const SearchUserForm = () => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const filterUsersInputValue = useSelector((state: StoreType) => state.app.filterUsersInputValue)
  const showFilteredUsers = useSelector((state: StoreType) => state.app.showFilteredUsers)
  const dispatch = useDispatch()

  return (
    <form
      className={classes["SearchUserForm" + theme]}
      onSubmit={(e) => dispatch(filterUsers(e))}
    >
      <CustomOutlineInput
        variant="outlined"
        value={filterUsersInputValue}
        id="user-search"
        placeholder="Search users"
        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setAppStoreField("filterUsersInputValue", e.target.value))}
        className={classes["SearchUserForm" + theme + "Input"]}
        InputProps={{
          endAdornment: <InputAdornment position="end">
            {showFilteredUsers ?
              <ClearIcon
                onClick={() => dispatch(clearFilteredUsers())}
                className={classes["SearchUserForm" + theme + "Icon"]}
              />
              :
              <SearchRoundedIcon
                onClick={(e) => dispatch(filterUsers(e))}
                className={classes["SearchUserForm" + theme + "Icon"]}
              />}
          </InputAdornment>
        }}
      />
      {/*{showFilteredUsers && <ClearIcon className={classes["SearchUserForm" + theme + "Icon"]} onClick={() => {*/}
      {/*  dispatch(clearFilteredUsers())*/}
      {/*  dispatch(loadMoreUsers())*/}
      {/*}} />}*/}
      {/*<Button type="submit" className={classes["SearchUserForm" + theme + "Button"]} variant="contained"><SearchRoundedIcon /></Button>*/}
    </form>
  )
}

export default SearchUserForm