import { faChevronDown, faChevronLeft, faTag, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Sidebar.scss'

interface Props {
  isToggleSidebar: boolean
}

const Sidebar = (props: Props) => {
  const { isToggleSidebar } = props
  const [isShowSubMenu, setIsShowSubMenu] = React.useState<boolean>(false)

  return (
    <div className={`sidebar-container ${isToggleSidebar ? 'sidebar-container-toggle' : ''}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 p-0">
            <ul className="list-main-menu">
              <li className="item-main-menu" onClick={() => setIsShowSubMenu(!isShowSubMenu)}>
                <span className="text-main-menu">
                  <span className="left">
                    <FontAwesomeIcon icon={faTag} />
                    <span className={`text-main ${isToggleSidebar ? 'hide' : ''}`}>Catalog</span>
                  </span>
                  <FontAwesomeIcon icon={isShowSubMenu ? faChevronDown : faChevronLeft} />
                </span>
                <ul className={`list-sub-menu ${isShowSubMenu ? 'show' : ''} ${isToggleSidebar ? 'hide' : ''}`}>
                  <li className="item-sub-menu">
                    <a href="#" className="text-sub-menu">
                      Products
                    </a>
                  </li>
                </ul>
              </li>
              <li className="item-main-menu">
                <span className="text-main-menu">
                  <span className="left">
                    <FontAwesomeIcon className="icon" icon={faUserGroup} />
                    <span className={`text-main ${isToggleSidebar ? 'hide' : ''}`}>User</span>
                  </span>
                  <FontAwesomeIcon className="icon" icon={faChevronLeft} />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
