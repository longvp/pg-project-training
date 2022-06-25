import { faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Props {
  isToggleSidebar: boolean
  menuItem: any
}

const MenuItemSidebar = (props: Props) => {
  const { isToggleSidebar, menuItem } = props
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
                <a href={sub.link} className="text-sub-menu">
                  {sub.name}
                </a>
              </li>
            </ul>
          ))}
      </li>
    </>
  )
}

export default MenuItemSidebar
