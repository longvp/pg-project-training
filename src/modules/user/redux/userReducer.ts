import { ActionType, createCustomAction, getType } from 'typesafe-actions'
import { LIST_NUMBER_ITEM_PER_PAGE } from '../utils'
import { IFilterFieldUser, IUser, IUserDelete } from './../../../models/user'
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
}

const initialState = {
  userList: [],
  recordsTotal: 0,
  currentPage: 1,
  itemPerPage: LIST_NUMBER_ITEM_PER_PAGE[0],
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

const actions = {
  setUserList,
  setRecordsTotal,
  setCurrentPage,
  setItemPerPage,
  setCountryList,
  setRoleList,
  setFilterFieldUser,
  setUserListSelectedDelete,
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
    default:
      return state
  }
}
