import { ROUTES } from '../../../configs/routes'
import { faTag, faUserGroup } from '@fortawesome/free-solid-svg-icons'

export const MENU_SIDEBAR = [
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
