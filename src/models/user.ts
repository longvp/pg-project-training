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

// TABE LIST
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

export interface IUserCreateUpdate {
  firstName: string
  lastName: string
  email: string
  password: string
  confirm_password: string
  paymentRailsType?: string
  paymentRailsId?: string | number
  access_level?: number | string
  roles: string[]
  status?: string
  statusComment?: string
  membership_id: string | number
  forceChangePassword: boolean
  taxExempt: boolean
}

export interface IUserDetail {
  access_level: number | string
  companyName: string | null
  default_card_id: number | string
  earning: number
  email: string
  expense: number | string
  firstName: string | null
  first_login: string | null
  forceChangePassword: number | string
  income: number | string
  joined: string
  language: string | null
  lastName: string | null
  last_login: string | null
  membership_id: string | null
  order_as_buyer: number
  order_as_buyer_total: number
  paymentRailsId: string | null
  paymentRailsType: string | null
  pending_membership_id: string | null
  products_total: string | number
  profile_id: string | number
  referer: string | null
  roles: string[]
  status: string
  statusComment: string | null
  taxExempt: string | number
  vendor_id: string | number
}
