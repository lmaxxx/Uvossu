import classes from './AsideUserList.module.scss'
import {useContext, useState, ChangeEvent} from 'react'
import {ThemeContext} from '../ChatAppWrapper/ChatAppWrapper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {firestore} from '../../firebase'
import {User} from '../../types'
import AsideListUser from '../AsideListUser/AsideListUser'

const AsideUserList = () => {
  const theme = useContext(ThemeContext)
  const [inputValue, setInputValue] = useState<string>('')
  const query = firestore.collection('users').orderBy('uid')
  const [users] = useCollectionData(query, {idField: 'id'})
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>()

  return (
    <div className={classes["UserList" + theme]}>
      <form>
        <TextField 
          value={inputValue}
          id="outlined-basic" 
          label="Search user" 
          variant="outlined" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        />
        <Button type="submit" variant="contained">Search</Button>
      </form>
      {
        users?.map((user: User, index: number) => {
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