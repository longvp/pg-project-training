import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import authReducer, { AuthState } from '../modules/auth/redux/authReducer'
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer'
import homeReducer, { HomeState } from '../modules/home/redux/homeReducer'
import userReducer, { UserState } from '../modules/user/redux/userReducer'
import productReducer, { ProductState } from '../modules/product/redux/productReducer'
import orderReducer, { OrderState } from '../modules/order/redux/orderReducer'

export interface AppState {
  router: RouterState
  intl: IntlState
  profile: AuthState
  home: HomeState
  user: UserState
  product: ProductState
  order: OrderState
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    home: homeReducer,
    user: userReducer,
    product: productReducer,
    order: orderReducer,
  })
}
