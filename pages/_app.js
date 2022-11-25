import React from 'react'
import '../styles/globals.css'
import styles from '../styles/Home.module.css'
import CheckLogin from './components/snackbar/checkLogin'
import AppBar from './components/layout/appbar'
import Drawer from './components/layout/drawer'
import TemporaryDrawer from './components/layout/drawerLeft'

function MyApp({ Component, pageProps }) {
  const [openDrawer, setOpen] = React.useState(false);
  const [temporaryDrawer, setTemporaryDrawer] = React.useState(false);

  const hendleOpenDrawer = () => {
    setOpen(!openDrawer)
  }
  const toggleDrawer = () => {
      setTemporaryDrawer(true);
    };
  const toggleDrawerClose = () => {
      setTemporaryDrawer(false);
    };
  return (
    <div>
      {/* <CheckLogin/> */}
      <AppBar hendleOpenDrawer={hendleOpenDrawer} />
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer} />
      <TemporaryDrawer ondrawer={temporaryDrawer} toggleDrawerClose={toggleDrawerClose} />
      <div className={styles.container} style={{ paddingLeft: openDrawer ? "300px" : "80px", marginTop: 100 }}>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
