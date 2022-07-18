import { ActionType, createCustomAction, getType } from 'typesafe-actions'
import { IFilterFieldOrder, IOrder } from '../../../models/order'
import { LIST_NUMBER_ITEM_PER_PAGE_ORDER } from '../utils'

export interface OrderState {
  orderList: IOrder[]
  recordsTotal: number
  currentPage: number
  itemPerPage: number
  commissionTotal: string | number
  searchTotal: string | number
  filterFieldOrder: IFilterFieldOrder
}

const initialState = {
  orderList: [],
  recordsTotal: 0,
  currentPage: 1,
  itemPerPage: LIST_NUMBER_ITEM_PER_PAGE_ORDER[0],
  commissionTotal: '',
  searchTotal: '',
  filterFieldOrder: {
    commission: '',
    customer_level: '',
    date_range: [],
    message_status: '',
    order_awaiting: 0,
    order_by: 'DESC',
    payment_status_id: [],
    payment_transaction_id: '',
    profile: '',
    profile_id: null,
    search: '',
    shipping_status_id: [],
    sku: '',
    sort: 'date',
    tz: 7,
    vendor: '',
    vendor_id: null,
    zipcode: '',
  },
}

export const setOrderList = createCustomAction('order/setOrderList', (data: IOrder[]) => ({
  data,
}))

export const setRecordsTotal = createCustomAction('order/setRecordsTotal', (data: number) => ({
  data,
}))

export const setCurrentPage = createCustomAction('order/setCurrentPage', (data: number) => ({
  data,
}))

export const setItemPerPage = createCustomAction('order/setItemPerPage', (data: number) => ({
  data,
}))

export const setCommissionTotal = createCustomAction('order/setCommissionTotal', (data: number | string) => ({
  data,
}))

export const setSearchTotal = createCustomAction('order/setSearchTotal', (data: number | string) => ({
  data,
}))

export const setFilterFieldOrder = createCustomAction('order/setFilterFieldOrder', (data: IFilterFieldOrder) => ({
  data,
}))

const actions = {
  setOrderList,
  setRecordsTotal,
  setCurrentPage,
  setItemPerPage,
  setCommissionTotal,
  setSearchTotal,
  setFilterFieldOrder,
}

type Action = ActionType<typeof actions>

export default function reducer(state: OrderState = initialState, action: Action) {
  switch (action.type) {
    case getType(setOrderList):
      return { ...state, orderList: action.data }
    case getType(setRecordsTotal):
      return { ...state, recordsTotal: action.data }
    case getType(setCurrentPage):
      return { ...state, currentPage: action.data }
    case getType(setItemPerPage):
      return { ...state, itemPerPage: action.data }
    case getType(setCommissionTotal):
      return { ...state, commissionTotal: action.data }
    case getType(setSearchTotal):
      return { ...state, searchTotal: action.data }

    case getType(setFilterFieldOrder):
      return { ...state, filterFieldOrder: action.data }

    default:
      return state
  }
}
