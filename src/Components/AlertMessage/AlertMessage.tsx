import classes from './AlertMessage.module.scss'
import {useSelector} from "react-redux";
import {StoreType} from '../../Store'
import {FC} from 'react'
import FormatDate from "../../UI/FormatDate/FormatDate";
import {FormatDateType} from "../../types";


interface PropsType {
  time: {
    hour: number
    minute: number
  },
  value: string
}

const AlertMessage: FC<PropsType> = ({time, value}) => {
  const theme = useSelector((state: StoreType) => state.app.currentUser.theme)

  return (
    <div className={classes["AlertMessage" + theme]}>
      <p className={classes["AlertMessage" + theme + "Value"]}>{value}</p>
      <FormatDate
        type={FormatDateType.Hour}
        time={time}
        className={classes["AlertMessage" + theme + "Time"]}
      />
    </div>
  )
}

export default AlertMessage
