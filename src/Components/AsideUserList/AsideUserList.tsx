import classes from './AsideUserList.module.scss'
import {useState, ChangeEvent, FormEvent, useEffect} from 'react'
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
import {setAppStoreField, loadMoreUsers} from '../../Store/app/appActions'
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
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>()
  const [filteredUsers, setFilteredUsers] = useState<any>([])
  const [showFilteredUsers, setShowFilteredUsers] = useState<boolean>(false)

  useEffect(() => {
    dispatch(setAppStoreField("users", uncontroledUsers))

    // for(let i = 0; i < null; i++) {

    // }
  }, [uncontroledUsers])

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
      {/* <form onSubmit={filterUsers} className={classes["UserList" + theme + "Form"]}>
        <CustomOutlineInput 
          variant="outlined"
          value={inputValue}
          id="user-search" 
          label="Search users"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          className={classes["UserList" + theme + "Input"]}
        />
        {showFilteredUsers && <ClearIcon className={classes["UserList" + theme + "Icon"]} onClick={clearFilteredUsers} />}
        <Button type="submit" className={classes["UserList" + theme + "Button"]} variant="contained"><SearchRoundedIcon /></Button>
      </form> */}
      <Scrollbars 
        className={classes["UserList" + theme + "ListWrapper"]}
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
        <InfiniteScroll
          dataLength={renderedUsers.length}
          hasMore={true}
          next={() => console.log("render")}///dispatch(loadMoreUsers())}
          loader={<h3>Loading ...</h3>}
          height={400}
        >
          {
            renderedUsers?.map((user: User) => {
              return <AsideListUser user={user} />
            })
          }
        </InfiniteScroll>
      </Scrollbars>


      {/* <div className={classes["UserList" + theme + "ErrorWrapper"]}>
        <SentimentDissatisfiedRoundedIcon className={classes["UserList" + theme + "ErrorIcon"]} />
        <p className={classes["UserList" + theme + "ErrorText"]} >Nothing found</p>
      </div> */}
    </div>
  )
}

export default AsideUserList