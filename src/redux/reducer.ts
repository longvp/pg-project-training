import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import authReducer, { AuthState } from '../modules/auth/redux/authReducer'
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer'
import homeReducer, { HomeState } from '../modules/home/redux/homeReducer'
import userReducer, { UserState } from '../modules/user/redux/userReducer'

export interface AppState {
  router: RouterState
  intl: IntlState
  profile: AuthState
  home: HomeState
  user: UserState
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    home: homeReducer,
    user: userReducer,
  })
}
