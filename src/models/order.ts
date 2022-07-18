import { IVendor } from './vendor'

export interface IOrder {
  commission: string | number
  customer: string
  date: string
  firstName: string
  lastName: string
  orderNumber: number
  order_id: number
  payment_status: string
  payment_status_id: number
  profile_id: number
  quality: number
  shipping_status: string
  shipping_status_id: number
  total: string | number
  usedBalanceValue: string | number
}

export interface IProfile {
  customerName: string
  email: string
  profile_id: number
}

export interface IFilterFieldOrder {
  commission: string
  customer_level: string
  date_range: string[]
  message_status: string
  order_awaiting: number
  order_by: string
  payment_status_id: number[]
  payment_transaction_id: string
  profile: IProfile | any
  profile_id: number | null
  search: string
  shipping_status_id: number[]
  sku: string
  sort: string
  tz: number
  vendor: IVendor | string
  vendor_id: number | null
  zipcode: string
}
