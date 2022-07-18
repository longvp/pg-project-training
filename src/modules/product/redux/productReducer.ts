import { ActionType, createCustomAction, getType } from 'typesafe-actions'
import { ICategory } from '../../../models/category'
import { IFilterFieldProduct, IProduct, IProductDelete } from '../../../models/product'
import { LIST_NUMBER_ITEM_PER_PAGE_PRODUCT } from '../utils'
import { IBrand } from './../../../models/brand'
import { IShippingZone } from './../../../models/shippingZone'

export interface ProductState {
  productList: IProduct[]
  recordsTotal: number
  currentPage: number
  itemPerPage: number
  categoryList: ICategory[]
  filterFieldProduct: IFilterFieldProduct
  productListSelectedDelete: IProductDelete[]
  brandList: IBrand[]
  shippingsAPI: IShippingZone[]
}

const initialState = {
  productList: [],
  recordsTotal: 0,
  currentPage: 1,
  itemPerPage: LIST_NUMBER_ITEM_PER_PAGE_PRODUCT[0],
  categoryList: [],
  filterFieldProduct: {
    search: '',
    category: '0',
    stock_status: 'all',
    search_type: '',
    availability: 'all',
    order_by: 'ASC',
    sort: 'name',
    vendor: '',
  },
  productListSelectedDelete: [],
  brandList: [],
  shippingsAPI: [],
}

export const setProductList = createCustomAction('product/setProductList', (data: IProduct[]) => ({
  data,
}))

export const setRecordsTotal = createCustomAction('product/setRecordsTotal', (data: number) => ({
  data,
}))

export const setCurrentPage = createCustomAction('product/setCurrentPage', (data: number) => ({
  data,
}))

export const setItemPerPage = createCustomAction('product/setItemPerPage', (data: number) => ({
  data,
}))

export const setCategoryList = createCustomAction('product/setCategoryList', (data: ICategory[]) => ({
  data,
}))

export const setFilterFieldProduct = createCustomAction(
  'product/setFilterFieldProduct',
  (data: IFilterFieldProduct) => ({
    data,
  }),
)

export const setProductListSelectedDelete = createCustomAction(
  'product/setProductListSelectedDelete',
  (data: IProductDelete[]) => ({
    data,
  }),
)

export const setBrandList = createCustomAction('product/setBrandList', (data: IBrand[]) => ({
  data,
}))

export const setShippingsAPI = createCustomAction('product/setShippingsAPI', (data: IShippingZone[]) => ({
  data,
}))

const actions = {
  setProductList,
  setRecordsTotal,
  setCurrentPage,
  setItemPerPage,
  setCategoryList,
  setFilterFieldProduct,
  setProductListSelectedDelete,
  setBrandList,
  setShippingsAPI,
}

type Action = ActionType<typeof actions>

export default function reducer(state: ProductState = initialState, action: Action) {
  switch (action.type) {
    case getType(setProductList):
      return { ...state, productList: action.data }
    case getType(setRecordsTotal):
      return { ...state, recordsTotal: action.data }
    case getType(setCurrentPage):
      return { ...state, currentPage: action.data }
    case getType(setItemPerPage):
      return { ...state, itemPerPage: action.data }
    case getType(setCategoryList):
      return { ...state, categoryList: action.data }
    case getType(setFilterFieldProduct):
      return { ...state, filterFieldProduct: action.data }
    case getType(setProductListSelectedDelete):
      return { ...state, productListSelectedDelete: action.data }
    case getType(setBrandList):
      return { ...state, brandList: action.data }
    case getType(setShippingsAPI):
      return { ...state, shippingsAPI: action.data }
    default:
      return state
  }
}
