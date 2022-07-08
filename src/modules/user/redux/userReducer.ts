import { ActionType, createCustomAction, getType } from 'typesafe-actions'
import { LIST_NUMBER_ITEM_PER_PAGE_USER } from '../utils'
import { IFilterFieldUser, IUser, IUserDelete, IUserDetail } from './../../../models/user'
import { ICountry } from './../../../models/country'
import { IRole } from './../../../models/role'

export interface UserState {
  userList: IUser[]
  recordsTotal: number
  currentPage: number
  itemPerPage: number
  filterFieldUser: IFilterFieldUser
  countryList: ICountry[]
  roleList: IRole[]
  userListSelectedDelete: IUserDelete[]
  userDetail: IUserDetail
}

const initialState = {
  userList: [],
  recordsTotal: 0,
  currentPage: 1,
  itemPerPage: LIST_NUMBER_ITEM_PER_PAGE_USER[0],
  countryList: [],
  roleList: [],
  filterFieldUser: {
    country: '',
    search: '',
    address: '',
    state: '',
    phone: '',
    types: [],
    date_range: [],
    date_type: 'R',
    memberships: [],
    order_by: 'DESC',
    sort: 'last_login',
    status: [],
    tz: 7,
  },
  userListSelectedDelete: [],
  userDetail: {
    access_level: '',
    companyName: '',
    default_card_id: '',
    earning: 0,
    email: '',
    expense: '',
    firstName: '',
    first_login: '',
    forceChangePassword: '',
    income: '',
    joined: '',
    language: '',
    lastName: '',
    last_login: '',
    membership_id: '',
    order_as_buyer: 0,
    order_as_buyer_total: 0,
    paymentRailsId: '',
    paymentRailsType: '',
    pending_membership_id: '',
    products_total: '',
    profile_id: '',
    referer: '',
    roles: [],
    status: '',
    statusComment: '',
    taxExempt: '',
    vendor_id: '',
  },
}

export const setUserList = createCustomAction('user/setUserList', (data: IUser[]) => ({
  data,
}))

export const setRecordsTotal = createCustomAction('user/setRecordsTotal', (data: number) => ({
  data,
}))

export const setCurrentPage = createCustomAction('user/setCurrentPage', (data: number) => ({
  data,
}))

export const setItemPerPage = createCustomAction('user/setItemPerPage', (data: number) => ({
  data,
}))

export const setCountryList = createCustomAction('user/setCountryList', (data: ICountry[]) => ({
  data,
}))

export const setRoleList = createCustomAction('user/setRoleList', (data: IRole[]) => ({
  data,
}))

export const setFilterFieldUser = createCustomAction('user/setFilterFieldUser', (data: IFilterFieldUser) => ({
  data,
}))

export const setUserListSelectedDelete = createCustomAction(
  'user/setUserListSelectedDelete',
  (data: IUserDelete[]) => ({
    data,
  }),
)

export const setUserDetail = createCustomAction('user/setUserDetail', (data: IUserDetail) => ({
  data,
}))

const actions = {
  setUserList,
  setRecordsTotal,
  setCurrentPage,
  setItemPerPage,
  setCountryList,
  setRoleList,
  setFilterFieldUser,
  setUserListSelectedDelete,
  setUserDetail,
}

type Action = ActionType<typeof actions>

export default function reducer(state: UserState = initialState, action: Action) {
  switch (action.type) {
    case getType(setUserList):
      return { ...state, userList: action.data }
    case getType(setRecordsTotal):
      return { ...state, recordsTotal: action.data }
    case getType(setCurrentPage):
      return { ...state, currentPage: action.data }
    case getType(setItemPerPage):
      return { ...state, itemPerPage: action.data }
    case getType(setCountryList):
      return { ...state, countryList: action.data }
    case getType(setRoleList):
      return { ...state, roleList: action.data }
    case getType(setFilterFieldUser): {
      return { ...state, filterFieldUser: action.data }
    }
    case getType(setUserListSelectedDelete):
      return { ...state, userListSelectedDelete: action.data }
    case getType(setUserDetail):
      return { ...state, userDetail: action.data }
    default:
      return state
  }
}
