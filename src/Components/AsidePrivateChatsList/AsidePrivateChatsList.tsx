import classes from "./AsidePrivateChatsList.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from '../../Store'
import {Chat, AsideActions} from '../../types'
import Loader from '../../UI/Loader/Loader'
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import Button from '@mui/material/Button';
import {setAppStoreField} from "../../Store/app/appActions";
import AsideListChat from '../AsideListChat/AsideListChat'
import {useRef, useEffect, useState} from 'react'

const AsidePrivateChatsList = () => {
  const wrapperRef = useRef()
  const privateChats = useSelector((state: StoreType) => state.chat.privateChats)
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)
  const gettedChats = useSelector((state: StoreType) => state.chat.gettedChats)
  const [wrapperHeight, setWrapperHeight] = useState<number>()
  const dispatch = useDispatch()

  useEffect(() => {
    if(wrapperRef) {
      const currentRef: any = wrapperRef.current
      console.log()
      setWrapperHeight(currentRef.clientHeight)
      dispatch(setAppStoreField("wrapperHeight", currentRef.clientHeight))
    }
  }, [wrapperRef])

  if(privateChats.length === 0 && gettedChats) {
    return (
      <div ref={wrapperRef as any} className={classes["AsidePrivateChatsList" + theme + "ErrorWrapper"]}>
        <SentimentDissatisfiedRoundedIcon className={classes["AsidePrivateChatsList" + theme + "ErrorIcon"]} />
        <p className={classes["AsidePrivateChatsList" + theme + "ErrorText"]} >You don't have<br/> any private chats</p>
        <Button
          onClick={() => {
            dispatch(setAppStoreField("activeAction", AsideActions.SearchUsers))
          }}
          sx={{color: "#6588DE"}}
        >Search users</Button>
      </div>
    )
  }

  if(privateChats.length === 0 && !gettedChats) {
    return (
      <div ref={wrapperRef as any} className={classes["AsidePrivateChatsList" + theme]}>
        <Loader
          height={"100%"}
          width={"100%"}
          backgroundColor={'inherit'}
          type={"TailSpin"}
          loaderHeight={150}
          loaderWidth={150}
        />
      </div>
    )
  }

  return (
    <div className={classes["AsidePrivateChatsList" + theme]}>
      <div ref={wrapperRef as any} style={{height: '100%'}}>
        <div className={classes["AsidePrivateChatsList" + theme + "Wrapper"]} style={{height: wrapperHeight}}>
          {
            privateChats?.map((chat: Chat, index) => {
              return <AsideListChat key={index} chat={chat} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AsidePrivateChatsList