import React from 'react'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'
import './DefaultLayout.scss'

interface Props {
  children: JSX.Element
}

const DefaulLayout = (props: Props) => {
  const [isToggleSidebar, setIsToggleSidebar] = React.useState<boolean>(false)
  const handleToggleSidebar = (toggle: boolean) => {
    setIsToggleSidebar(toggle)
  }

  return (
    <div className="wrapper">
      <Header isToggleSidebar={isToggleSidebar} handleToggleSidebar={handleToggleSidebar} />
      <div className="body">
        <Sidebar isToggleSidebar={isToggleSidebar} />
        <div className={`content ${isToggleSidebar ? 'content-toggle' : ''}`}>{props.children}</div>
      </div>
    </div>
  )
}

export default DefaulLayout
