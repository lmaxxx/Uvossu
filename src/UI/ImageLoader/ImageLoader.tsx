import {FC, useState} from 'react'
import Skeleton from '@mui/material/Skeleton'

interface PropsType {
  src: string
  className?: string,
  width: number
  height: number
  onClick?: any,
  theme?: string
  square?: boolean
}

const ImageLoader: FC<PropsType> = (
  {
    src,
    className,
    height,
    width,
    onClick,
    theme,
    square
  }
  ) => {
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
          <Skeleton
            sx={ theme === "light" ? {backgroundColor: "#E6E6E6"} : {backgroundColor: "#767A86"}}
            className={className}
            variant={square ? "rectangular" : "circular"}
            height={height}
            width={width}
          />
          :
          <img 
            className={className} 
            src={src} 
            alt=""
            onClick={onClick}
          />
      }
    </>
  )
}

export default ImageLoader
