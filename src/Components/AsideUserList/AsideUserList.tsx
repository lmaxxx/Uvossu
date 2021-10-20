import classes from './AsideUserList.module.scss'
import {useState, ChangeEvent, FormEvent, useEffect, useRef} from 'react'
import CustomOutlineInput from '../../UI/CustomOutlineInput/CustomOutlineInput'
import Button from '@mui/material/Button'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {firestore} from '../../firebase'
import {User} from '../../types'
import AsideListUser from '../AsideListUser/AsideListUser'
import ClearIcon from '@mui/icons-material/Clear'
import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {Scrollbars} from 'react-custom-scrollbars-2';
import {useSelector, useDispatch} from 'react-redux'
import {StoreType} from '../../Store/'
import {setAppStoreField, loadMoreUsers, updateRenderedUsers} from '../../Store/app/appActions'
import InfiniteScroll from "react-infinite-scroll-component";

const AsideUserList = () => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const {theme} = currentUser
  const [inputValue, setInputValue] = useState<string>('')
  const dispatch = useDispatch()
  const query = firestore.collection('users').orderBy('uid')
  const [uncontroledUsers] = useCollectionData(query, {idField: 'id'})
  const users = useSelector((state: StoreType) => state.app.users)
  const renderedUsers = useSelector((state: StoreType) => state.app.renderedUsers)
  const loadUsers = useSelector((state: StoreType) => state.app.loadUsers)
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>()
  const [filteredUsers, setFilteredUsers] = useState<any>([])
  const [showFilteredUsers, setShowFilteredUsers] = useState<boolean>(false)
  const wrapperRef = useRef()
  const [wrapperHeight, setWrapperHeight] = useState<number>()

  useEffect(() => {
    if(uncontroledUsers !== undefined) {
      dispatch(setAppStoreField("users", uncontroledUsers))
      renderedUsers.length === 0 ? dispatch(loadMoreUsers()) : dispatch(updateRenderedUsers())
    }}, [uncontroledUsers])

  useEffect(() => {
    if(wrapperRef) {
      // setWrapperHeight(wrapperRef?.current?.clientHeight)
      const current: any = wrapperRef.current
      const step = Math.round(current.clientHeight / 90)
      setWrapperHeight(current.clientHeight)
      console.log(current.clientHeight)
      dispatch(setAppStoreField("usersRenderStep", step))
    }
  }, [wrapperRef])

  // const filterUsers = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (inputValue) {
  //     const filteredUsers: User[] | undefined = users?.filter((user: User) => user.displayName.trim().toLowerCase().includes(inputValue.trim().toLowerCase()))
  
  //     setSelectedUserIndex(undefined)
  //     setFilteredUsers(filteredUsers)
  //     setShowFilteredUsers(true)
  //   }
  // }

  // const clearFilteredUsers = () => {
  //   setFilteredUsers([])
  //   setShowFilteredUsers(false)
  //   setInputValue('')
  //   setSelectedUserIndex(undefined)
  // }

  return (
    <div className={classes["UserList" + theme]}>
      {/*<form className={classes["UserList" + theme + "Form"]}>*/}
      {/*  <CustomOutlineInput*/}
      {/*    variant="outlined"*/}
      {/*    value={inputValue}*/}
      {/*    id="user-search"*/}
      {/*    label="Search users"*/}
      {/*    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}*/}
      {/*    className={classes["UserList" + theme + "Input"]}*/}
      {/*  />*/}

      {/*  <Button type="submit" className={classes["UserList" + theme + "Button"]} variant="contained"><SearchRoundedIcon /></Button>*/}
      {/*</form>*/}
      <div ref={wrapperRef as any} style={{height: "100%"}}>
        {/*<Scrollbars*/}
        {/*  className={classes["UserList" + theme + "ListWrapper"]}*/}
        {/*  autoHideTimeout={1000}*/}
        {/*  autoHideDuration={200}*/}
        {/*>*/}
        {
          wrapperHeight && <InfiniteScroll
          className={classes["UserList" + theme + "ListWrapper"]}
          dataLength={renderedUsers.length}
          hasMore={loadUsers}
          next={() => dispatch(loadMoreUsers())}
          loader={<h3>Loading ...</h3>}
          height={wrapperHeight}
          >
        {
          renderedUsers?.map((user: User) => {
          return <AsideListUser user={user} />
        })
        }
          </InfiniteScroll>
        }

        {/*</Scrollbars>*/}
      </div>

      {/* <div className={classes["UserList" + theme + "ErrorWrapper"]}>
        <SentimentDissatisfiedRoundedIcon className={classes["UserList" + theme + "ErrorIcon"]} />
        <p className={classes["UserList" + theme + "ErrorText"]} >Nothing found</p>
      </div> */}
    </div>
  )
}

export default AsideUserList