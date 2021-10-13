import classes from './ChatAppWrapper.module.scss'
import {auth, firestore} from '../../firebase'
import {useState, useEffect, createContext} from 'react'
import Loader from '../../UI/Loader/Loader'
import Aside from '../Aside/Aside'

export const ThemeContext = createContext<string>('light')

const ChatAppWrapper = () => {
  const [theme, setTheme] = useState<string>('')

  useEffect(() => {
    if(auth.currentUser?.uid !== undefined) {
      const {uid} = auth.currentUser as {uid: string}

      firestore.collection('users').doc(uid).get()
        .then((doc: any) => {
            setTheme(doc.data().theme) 
        })
    }
  }, [auth.currentUser])

  if(theme === '') {
    return <Loader width={'100%'} height={'100vh'} backgroundColor={'#fff'} type={'Grid'} />
  } else return (
    <ThemeContext.Provider value={theme as string}>
      <div style={{ backgroundColor: theme === 'dark' ? "#222222": "#fff"}} className={classes.ChatAppWrapper}>
        <Aside />
      </div>
    </ThemeContext.Provider>
  )
}

export default ChatAppWrapper