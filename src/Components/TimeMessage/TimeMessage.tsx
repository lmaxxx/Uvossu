import classes from './TimeMessage.module.scss'
import FormatDate from "../../UI/FormatDate/FormatDate";
import {FormatDateType} from "../../types";
import {FC} from 'react'

interface PropsType {
  milliseconds: number
  time: {
    hour: number
    minute: number
  },
}

const TimeMessage: FC<PropsType> = ({milliseconds, time}) => {
  return (
    <div className={classes.TimeMessage}>
      <FormatDate
        strict
        time={time}
        milliseconds={milliseconds}
        type={FormatDateType.FullDate}
      />
    </div>
  )
}

export default TimeMessage