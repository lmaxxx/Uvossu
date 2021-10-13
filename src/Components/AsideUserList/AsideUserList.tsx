import classes from './AsideUserList.module.scss'
import {useContext, useState, ChangeEvent, useEffect, FormEvent} from 'react'
import {ThemeContext} from '../ChatAppWrapper/ChatAppWrapper'
import Input from '@mui/material/Input';
import Button from '@mui/material/Button'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {firestore, auth} from '../../firebase'
import {User} from '../../types'
import AsideListUser from '../AsideListUser/AsideListUser'
import InputAdornment from '@mui/material/InputAdornment'
import ClearIcon from '@mui/icons-material/Clear'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';
import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


const AsideUserList = () => {
  const theme = useContext(ThemeContext)
  const [inputValue, setInputValue] = useState<string>('')
  const query = firestore.collection('users').orderBy('uid')
  const [users] = useCollectionData(query, {idField: 'id'})
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>()
  const [currentUser, setCurrentUser] = useState<User>()
  const [filteredUsers, setFilteredUsers] = useState<any>([])
  const [showFilteredUsers, setShowFilteredUsers] = useState<boolean>(false)

  useEffect(() => {
    if(auth.currentUser?.uid !== undefined) {
      const {uid} = auth.currentUser as {uid: string}

      firestore.collection('users').doc(uid).get()
        .then((doc: any) => {
          setCurrentUser(doc.data())
        })
    }
  }, [auth.currentUser])

  const filterUsers = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const filteredUsers: User[] | undefined = users?.filter((user: User) => user.displayName.trim().toLowerCase().includes(inputValue.trim().toLowerCase()))

    setSelectedUserIndex(undefined)
    setFilteredUsers(filteredUsers)
    setShowFilteredUsers(true)
  }

  const clearFilteredUsers = () => {
    setFilteredUsers([])
    setShowFilteredUsers(false)
    setInputValue('')
    setSelectedUserIndex(undefined)
  }

  return (
    <div className={classes["UserList" + theme]}>
      <form onSubmit={filterUsers}>
        <FormControl className={classes["UserList" + theme + "Form"]}>
          <InputLabel htmlFor="user-search">Search users</InputLabel>
            <Input 
              value={inputValue}
              id="user-search" 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              endAdornment={inputValue && <InputAdornment position="end">
                <ClearIcon
                  onClick={clearFilteredUsers}
                />
              </InputAdornment>}
            />
            <Button type="submit" className={classes["UserList" + theme + "Button"]} variant="contained"><SearchRoundedIcon /></Button>
        </FormControl>
      </form>
      {
        showFilteredUsers ?
          filteredUsers.length === 0 ?
            <div className={classes["UserList" + theme + "ErrorWrapper"]}>
              <SentimentDissatisfiedRoundedIcon className={classes["UserList" + theme + "ErrorIcon"]} />
              <p className={classes["UserList" + theme + "ErrorText"]} >Nothing found</p>
            </div>
            :
            filteredUsers?.map((user: User, index: number) => {
              if(currentUser?.uid === user.uid) {
                return
              }
              return <AsideListUser 
                isSelected={selectedUserIndex === index ? true : false} 
                user={user} 
                setSelectedUserIndex={() => setSelectedUserIndex(index)}
              />
            })
          :
          users?.map((user: User, index: number) => {
            if(currentUser?.uid === user.uid) {
              return
            }
            return <AsideListUser 
              isSelected={selectedUserIndex === index ? true : false} 
              user={user} 
              setSelectedUserIndex={() => setSelectedUserIndex(index)}
            />
          })
      }
    </div>
  )
}

export default AsideUserList