import classes from './Loader.module.scss'
import Loader from "react-loader-spinner";
import {FC} from 'react'

interface PropsType {
  height: string
  width: string
  backgroundColor: string
  type: string
  loaderHeight?: number
  loaderWidth?: number
  style?: any
}

const LoaderComponent: FC<PropsType> = (
  {
    height, 
    width, 
    backgroundColor, 
    type, 
    loaderHeight, 
    loaderWidth,
    style
  }
  ) => {
  return (
    <div style={{ 
      height: height,
      width: width,
      backgroundColor: backgroundColor,
      ...style
    }} className={classes.Loader}>
      <Loader
        type={type as any}
        color="#6588DE"
        height={loaderHeight || 150}
        width={loaderWidth || 150}
      />
    </div>
  )
}

export default LoaderComponent