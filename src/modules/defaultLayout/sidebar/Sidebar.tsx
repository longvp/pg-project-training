import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../../redux/reducer'
import MenuSidebar from './menuSidebar/MenuSidebar'
import './Sidebar.scss'

interface Props {}

const Sidebar = (props: Props) => {
  const { isToggleSidebar } = useSelector((state: AppState) => ({
    isToggleSidebar: state.home.isToggleSidebar,
  }))
  return (
    <div className={`sidebar-container ${isToggleSidebar ? 'sidebar-container-toggle' : ''}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 p-0">
            <MenuSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
