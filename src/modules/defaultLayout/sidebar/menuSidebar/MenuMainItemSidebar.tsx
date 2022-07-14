import { faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { AppState } from '../../../../redux/reducer'

interface Props {
  menuItem: any
}

const MenuMainItemSidebar = (props: Props) => {
  const { menuItem } = props
  const { isToggleSidebar } = useSelector((state: AppState) => ({
    isToggleSidebar: state.home.isToggleSidebar,
  }))
  const [isShowSubMenu, setIsShowSubMenu] = React.useState<boolean>(false)
  return (
    <>
      <li className="item-main-menu" onClick={() => setIsShowSubMenu(!isShowSubMenu)}>
        <span className="text-main-menu">
          <span className="left">
            {menuItem.iconModel && <FontAwesomeIcon icon={menuItem.iconModel} />}
            <span className={`text-main ${isToggleSidebar ? 'hide' : ''}`}>{menuItem.name}</span>
          </span>
          <FontAwesomeIcon icon={isShowSubMenu ? faChevronDown : faChevronLeft} />
        </span>
        {menuItem.sub_menus &&
          menuItem.sub_menus.length > 0 &&
          menuItem.sub_menus.map((sub: any, index: number) => (
            <ul key={index} className={`list-sub-menu ${isShowSubMenu ? 'show' : ''} ${isToggleSidebar ? 'hide' : ''}`}>
              <li className="item-sub-menu">
                <NavLink activeClassName="active" to={sub.link} className="text-sub-menu">
                  {sub.name}
                </NavLink>
              </li>
            </ul>
          ))}
      </li>
    </>
  )
}

export default MenuMainItemSidebar
