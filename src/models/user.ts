import { number } from 'yup'

export interface AuthToken {
  accessToken: string
  expiresIn: number
  tokenType: string
}

export interface IUserLogin {
  countOfLoginAttempts: number
  dateOfLoginAttempt: number
  firstName: string
  forceChangePassword: number
  lastName: string
  login: string
  profile_id: number
  user_cookie: string
}

export interface IUser {
  profile_id: string | number
  vendor: string
  fistName: string
  lastName: string
  created: string
  last_login: string
  access_level: string
  vendor_id: string | number
  storeName: string | null
  product: number
  order: {
    order_as_buyer: number
    order_as_buyer_total: number
  }
  wishlist: string
}

export interface IFilterFieldUser {
  search: string
  address: string
  country: string
  state: string
  phone: string
  types: string[]
  date_range: string[]
  date_type: string
  memberships: string[]
  order_by: string
  sort: string
  status: string[]
  tz: number
}

export interface IUserDelete {
  id: number | string
  delete: number | string
}

export interface IUserCreate {
  firstName: string
  lastName: string
  email: string
  password: string
  confirm_password: string
  paymentRailsType: string
  access_level: number | string
  membership_id: string | number
  forceChangePassword: number
  taxExempt: number
}
