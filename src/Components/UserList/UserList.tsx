import classes from './UserList.module.scss'
import {useEffect, useState, FC} from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {firestore} from '../../firebase'
import {User} from '../../types'
import {useSelector, useDispatch} from 'react-redux'
import {StoreType} from '../../Store/'
import {
  setAppStoreField,
  loadMoreUsers, clearFilteredUsers,
} from '../../Store/app/appActions'
import InfiniteScroll from "react-infinite-scroll-component";
import SearchUserForm from "../SearchUserForm/SearchUserForm";
import UserFromList from '../UserFromList/UserFromList'
import UserFromListSkeleton from "../UserFromListSkeleton/UserFromListSkeleton"
import ErrorUsersList from '../ErrorUsersList/ErrorUsersList'

interface PropsType {
  inConstructor: boolean
}

const UserList: FC<PropsType> = ({inConstructor}) => {
  const currentUser = useSelector((state: StoreType) => state.app.currentUser)
  const {theme} = currentUser
  const dispatch = useDispatch()
  const hasMoreUsers = useSelector((state: StoreType) => state.app.hasMoreUsers)
  const showFilteredUsers = useSelector((state: StoreType) => state.app.showFilteredUsers)
  const usersLimit = useSelector((state: StoreType) => state.app.usersLimit)
  const users = useSelector((state: StoreType) => state.app.users)
  const filterUsersQuery = useSelector((state: StoreType) => state.app.filterUsersQuery)
  const gotUser = useSelector((state: StoreType) => state.app.gotUsers)
  const chatMembers = useSelector((state: StoreType) => state.groupConstructor.membersUid)
  let query
  if(showFilteredUsers) {
    query = firestore.collection('users')
      .where('displayName', '>=', filterUsersQuery)
      .where('displayName', '<=', filterUsersQuery + '~')
      .limit(usersLimit)
  } else {
    query = firestore.collection('users').orderBy("uid", "desc").limit(usersLimit)
  }
  const [uncontroledUsers] = useCollectionData(query, {idField: 'id'})
  const [skeletonRenderArr, setSkeletonRenderArr] = useState(Array.from({length: usersLimit}))

  useEffect(() => {
    if(uncontroledUsers) {
      dispatch(setAppStoreField("users",
        uncontroledUsers.filter((user: User) => user.uid !== currentUser.uid)))
      dispatch(setAppStoreField("gotUsers", true))
      if(uncontroledUsers.length < usersLimit) {
        dispatch(setAppStoreField("hasMoreUsers", false))
      }
    }
  }, [uncontroledUsers])

  useEffect(() => {
    dispatch(clearFilteredUsers())
  }, [])

  if(!uncontroledUsers && !gotUser) {
    return (
      <div className={classes["UserList" + theme]}>
        <SearchUserForm />
        <div className={classes["UserList" + theme + "Wrapper"]}>
          <div style={{overflow: "auto"}} className={classes["UserList" + theme + "UserWrapper"]}>
            {
              skeletonRenderArr.map((_, index) => {
                return <UserFromListSkeleton key={index} />
              })
            }
          </div>

        </div>
      </div>
    )
  }

  if(gotUser && uncontroledUsers?.length === 0) {
    return (
      <div className={classes["UserList" + theme]}>
        <SearchUserForm />
        <div className={classes["UserList" + theme + "Wrapper"]}>
          <ErrorUsersList />
        </div>
      </div>
    )

  }

  return (
    <div className={classes["UserList" + theme]}>
      <SearchUserForm />
      <div className={classes["UserList" + theme + "Wrapper"]}>
        <InfiniteScroll
          className={classes["UserList" + theme + "UserWrapper"]}
          dataLength={users.length}
          hasMore={hasMoreUsers}
          next={() => dispatch(loadMoreUsers())}
          loader={<></>}
          height={"100%"}
        >
          {
            users.map((user: User, index) => {
              if(chatMembers.includes(user.uid as string)) {
                return <UserFromList disabled inConstructor={inConstructor} key={index} user={user} />
              }
              return <UserFromList disabled={false} inConstructor={inConstructor} key={index} user={user} />
            })
          }
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default UserList