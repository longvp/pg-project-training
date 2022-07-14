import React from 'react'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'
import './DefaultLayout.scss'
import { useSelector } from 'react-redux'
import { AppState } from '../../redux/reducer'

interface Props {
  children: JSX.Element
}

const DefaulLayout = (props: Props) => {
  const { isToggleSidebar } = useSelector((state: AppState) => ({
    isToggleSidebar: state.home.isToggleSidebar,
  }))

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="body">
          <Sidebar />
          <div className={`content ${isToggleSidebar ? 'content-toggle' : ''}`}>{props.children}</div>
        </div>
      </div>
    </>
  )
}

export default DefaulLayout
