import { ROUTES } from '../../../configs/routes'
import { faInbox, faTag, faUserGroup } from '@fortawesome/free-solid-svg-icons'

export const MENU_SIDEBAR = [
  {
    iconModel: faInbox,
    name: 'Order',
    sub_menus: [{ name: 'Order list', link: ROUTES.manageOrder }],
  },
  {
    iconModel: faTag,
    name: 'Catalog',
    sub_menus: [{ name: 'Products', link: ROUTES.manageProduct }],
  },
  {
    iconModel: faUserGroup,
    name: 'User',
    sub_menus: [{ name: 'User list', link: ROUTES.manageUser }],
  },
]
