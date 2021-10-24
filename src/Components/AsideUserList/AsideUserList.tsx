import classes from './AsideUserList.module.scss'
import {useState, ChangeEvent, useEffect, useRef} from 'react'
import CustomOutlineInput from '../../UI/CustomOutlineInput/CustomOutlineInput'
import Button from '@mui/material/Button'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {firestore} from '../../firebase'
import {User} from '../../types'
import AsideListUser from '../AsideListUser/AsideListUser'
import ClearIcon from '@mui/icons-material/Clear'
import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {useSelector, useDispatch} from 'react-redux'
import {StoreType} from '../../Store/'
import {
  setAppStoreField,
  loadMoreUsers,
  updateRenderedUsers,
  filterUsers,
  clearFilteredUsers,
} from '../../Store/app/appActions'
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../UI/Loader/Loader";

const AsideUserList = () => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const {theme} = currentUser
  const dispatch = useDispatch()
  const query = firestore.collection('users').orderBy('uid')
  const [uncontroledUsers] = useCollectionData(query, {idField: 'id'})
  const renderedUsers = useSelector((state: StoreType) => state.app.renderedUsers)
  const filteredUsers = useSelector((state: StoreType) => state.app.filteredUsers)
  const loadUsers = useSelector((state: StoreType) => state.app.loadUsers)
  const showFilteredUsers = useSelector((state: StoreType) => state.app.showFilteredUsers)
  const filterUsersInputValue = useSelector((state: StoreType) => state.app.filterUsersInputValue)
  const wrapperRef = useRef()
  const [wrapperHeight, setWrapperHeight] = useState<number>()

  useEffect(() => {
    if(uncontroledUsers !== undefined) {
      dispatch(setAppStoreField("users",
        uncontroledUsers.filter((user) => user.uid !== currentUser.uid)))
      renderedUsers.length === 0 ? dispatch(loadMoreUsers()) : dispatch(updateRenderedUsers())
    }}, [uncontroledUsers])

  useEffect(() => {
    if(wrapperRef) {
      const current: any = wrapperRef.current
      const step = Math.round(current.clientHeight / 80)
      setWrapperHeight(current.clientHeight)
      dispatch(setAppStoreField("usersRenderStep", step))
    }
  }, [wrapperRef])


  return (
    <div className={classes["UserList" + theme]}>
      <form
        className={classes["UserList" + theme + "Form"]}
        onSubmit={(e) => dispatch(filterUsers(e))}
      >
        <CustomOutlineInput
          variant="outlined"
          value={filterUsersInputValue}
          id="user-search"
          label="Search users"
          onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setAppStoreField("filterUsersInputValue", e.target.value))}
          className={classes["UserList" + theme + "Input"]}
        />
        {showFilteredUsers && <ClearIcon className={classes["UserList" + theme + "Icon"]} onClick={() => {
          dispatch(clearFilteredUsers())
          dispatch(loadMoreUsers())
        }} />}
        <Button type="submit" className={classes["UserList" + theme + "Button"]} variant="contained"><SearchRoundedIcon /></Button>
      </form>
      <div ref={wrapperRef as any} style={{height: "100%"}}>
        {
          wrapperHeight && <InfiniteScroll
          className={classes["UserList" + theme + "ListWrapper"]}
          dataLength={showFilteredUsers ? filteredUsers.length : renderedUsers.length}
          hasMore={loadUsers}
          next={() => dispatch(loadMoreUsers())}
          loader={<Loader
            height={"100%"}
            width={"100%"}
            backgroundColor={'inherit'}
            type={"TailSpin"}
            loaderHeight={150}
            loaderWidth={150}
          />}
          height={wrapperHeight}
          >
        {
            showFilteredUsers && renderedUsers.length === 0 ?
              <div className={classes["UserList" + theme + "ErrorWrapper"]}>
                <SentimentDissatisfiedRoundedIcon className={classes["UserList" + theme + "ErrorIcon"]} />
                <p className={classes["UserList" + theme + "ErrorText"]} >Nothing found</p>
              </div>
            :
              renderedUsers?.map((user: User) => {
                return <AsideListUser user={user} />
              })
        }
          </InfiniteScroll>
        }
      </div>


    </div>
  )
}

export default AsideUserList