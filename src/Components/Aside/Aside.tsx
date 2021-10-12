import classes from './Aside.module.scss'
import AsideUser from '../AsideUser/AsideUser'
import AsideList from '../AsideList/AsideList'

const Aside = () => {
  return (
    <div className={classes["Aside"]}>
      <AsideUser />
      <AsideList />
    </div>
  )
}

export default Aside