import {FC} from 'react'
import {FormatDateType} from '../../types'

interface PropsType {
  type: FormatDateType
  time: {
    hour: number
    minute: number
  },
  milliseconds?: number
  className?: any
}

const FormatDate: FC<PropsType> = (
  {
    time,
    milliseconds,
    type,
    className
  }
  ) => {
  const currentDate = new Date()
  const pastDate = new Date(milliseconds as number)

  if(type === FormatDateType.Hour ||
    (currentDate.getDate() === pastDate.getDate() &&
      currentDate.getMonth() === pastDate.getMonth() &&
      currentDate.getFullYear() === pastDate.getFullYear())) {
    let hour: number | string = time?.hour
    let minute: number | string = time?.minute

    if(hour < 9) {
      hour = "0" + hour
    }
    if(minute <  9) {
      minute = "0" + minute
    }

    return (
      <p className={className}>{hour}:{minute}</p>
    )
  }
  else if(type === FormatDateType.FullDate) {
    let day: number | string = pastDate.getDate()
    let month: number | string = pastDate.getMonth() + 1
    let year: number = pastDate.getFullYear()

    if(day < 9) {
      day = "0" + day
    }
    if(month <  9) {
      month = "0" + month
    }

    return <p className={className}>{day}.{month}.{year}</p>
  }

  return <></>

}

export default FormatDate