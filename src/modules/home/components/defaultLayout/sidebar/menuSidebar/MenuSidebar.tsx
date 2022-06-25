import React from 'react'
import { MENU_SIDEBAR } from '../utils'
import MenuItemSidebar from './MenuItemSidebar'

interface Props {
  isToggleSidebar: boolean
}

const MenuSidebar = (props: Props) => {
  const { isToggleSidebar } = props
  return (
    <>
      {MENU_SIDEBAR && MENU_SIDEBAR.length > 0 && (
        <ul className="list-main-menu">
          {MENU_SIDEBAR.map((menuItem, index) => (
            <MenuItemSidebar key={index} isToggleSidebar={isToggleSidebar} menuItem={menuItem} />
          ))}
        </ul>
      )}
    </>
  )
}

export default MenuSidebar
