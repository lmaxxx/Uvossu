import classes from './ImageLoader.module.scss'
import {FC, useState} from 'react'
import Loader from '../Loader/Loader'

interface PropsType {
  src: string
  className?: string,
  width: number
  height: number
}

const ImageLoader: FC<PropsType> = ({src, className, height, width}) => {
  const [loadLogo, setLoadLogo] = useState<boolean>(true)

  return (
    <>
      <img 
        src={src} 
        className={className}
        alt=""
        onLoad={() => setLoadLogo(false)}
        style={{display: "none"}}
      />
      {
        loadLogo ?
          <Loader 
            height={height + "px"}
            width={width +"px"}
            backgroundColor={"inherit"}
            type={'TailSpin'}
            loaderHeight={height - height * 0.2}
            loaderWidth={width - height * 0.2}
          />
          :
          <img 
            className={className} 
            src={src} 
            alt=""
          />
      }
    </>
  )
}

export default ImageLoader