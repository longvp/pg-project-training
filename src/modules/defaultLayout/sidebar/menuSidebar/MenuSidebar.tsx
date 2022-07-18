import React from 'react'
import { MENU_SIDEBAR } from '../utils'
import MenuMainItemSidebar from './MenuMainItemSidebar'

const MenuSidebar = () => {
  return (
    <>
      {MENU_SIDEBAR && MENU_SIDEBAR.length > 0 && (
        <ul className="list-main-menu">
          {MENU_SIDEBAR.map((menuItem, index) => (
            <MenuMainItemSidebar key={index} menuItem={menuItem} />
          ))}
        </ul>
      )}
    </>
  )
}

export default MenuSidebar
