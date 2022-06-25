import React from 'react'
import MenuSidebar from './menuSidebar/MenuSidebar'
import './Sidebar.scss'

interface Props {
  isToggleSidebar: boolean
}

const Sidebar = (props: Props) => {
  const { isToggleSidebar } = props

  return (
    <div className={`sidebar-container ${isToggleSidebar ? 'sidebar-container-toggle' : ''}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 p-0">
            <MenuSidebar isToggleSidebar={isToggleSidebar} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
