import React from 'react'
import { MENU_SIDEBAR } from '../utils'
import MenuItemSidebar from './MenuItemSidebar'

interface Props {}

const MenuSidebar = (props: Props) => {
  return (
    <>
      {MENU_SIDEBAR && MENU_SIDEBAR.length > 0 && (
        <ul className="list-main-menu">
          {MENU_SIDEBAR.map((menuItem, index) => (
            <MenuItemSidebar key={index} menuItem={menuItem} />
          ))}
        </ul>
      )}
    </>
  )
}

export default MenuSidebar
