import classes from './UserList.module.scss'
import {useEffect} from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {firestore} from '../../firebase'
import {User} from '../../types'
import {useSelector, useDispatch} from 'react-redux'
import {StoreType} from '../../Store/'
import {
  setAppStoreField,
  loadMoreUsers,
} from '../../Store/app/appActions'
import InfiniteScroll from "react-infinite-scroll-component";
import SearchUserForm from "../SearchUserForm/SearchUserForm";
import UserFromList from '../UserFromList/UserFromList'

const UserList = () => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const {theme} = currentUser
  const dispatch = useDispatch()
  const hasMoreUsers = useSelector((state: StoreType) => state.app.hasMoreUsers)
  const showFilteredUsers = useSelector((state: StoreType) => state.app.showFilteredUsers)
  const usersLimit = useSelector((state: StoreType) => state.app.usersLimit)
  const users = useSelector((state: StoreType) => state.app.users)
  const filterUsersQuery = useSelector((state: StoreType) => state.app.filterUsersQuery)
  let query
  if(showFilteredUsers) {
    query = firestore.collection('users')
      .where('displayName', '>=', filterUsersQuery)
      .where('displayName', '<=', filterUsersQuery + '~')
      .limit(usersLimit)
  } else {
    query = firestore.collection('users').orderBy('uid').limit(usersLimit)
  }
  const [uncontroledUsers] = useCollectionData(query, {idField: 'id'})

  console.log(uncontroledUsers)

  useEffect(() => {
    if(uncontroledUsers) {
      dispatch(setAppStoreField("users", uncontroledUsers))
      if(uncontroledUsers.length < usersLimit) {
        dispatch(setAppStoreField("hasMoreUsers", false))
      }
    }
  }, [uncontroledUsers])

  return (
    <div className={classes["UserList" + theme]}>
      <SearchUserForm />
      <div className={classes["UserList" + theme + "Wrapper"]}>
        <InfiniteScroll
          className={classes["UserList" + theme + "UserWrapper"]}
          dataLength={users.length}
          hasMore={hasMoreUsers}
          next={() => dispatch(loadMoreUsers())}
          loader={<p>Loader ...</p>}
          height={"100%"}
        >
          {
            users.map((user: User, index) => {
              return <UserFromList key={index} user={user} />
            })
          }
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default UserList