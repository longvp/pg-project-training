export const LIST_NUMBER_ITEM_PER_PAGE = [10, 25, 50, 75, 100]

export const MEMBERSHIP_FILTER_OPTION = [
  { label: 'Memberships', value: 'M_4' },
  { label: 'Pending Memberships', value: 'P_4' },
]

export const STATUS_OPTIONS = [
  { label: 'Any status', value: '' },
  { label: 'Enable', value: 'E' },
  { label: 'Disable', value: 'D' },
  { label: 'Unapproved vendor', value: 'U' },
]

export const ACCESS_LEVEL_OPTIONS = [
  {
    label: 'Vendor',
    value: '10',
  },
  {
    label: 'Admin',
    value: '100',
  },
]

export const ROLE_OPTIONS = [
  {
    label: 'Administrator',
    value: '1',
  },
  {
    label: 'Coupons management',
    value: '2',
  },
  {
    label: 'Content management',
    value: '3',
  },
  {
    label: 'Volume discounts management',
    value: '4',
  },
  {
    label: 'Vendor',
    value: '5',
  },
  {
    label: 'View order reports',
    value: '6',
  },
]

export const ORDER_BY = {
  ASC: 'ASC',
  DESC: 'DESC',
}

export const formatCurrency = (value: number) => {
  return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
