import React, { lazy } from 'react'

const HomePage = lazy(() => import('../modules/home/pages/HomePage'))
const PageManageUser = lazy(() => import('../modules/user/pages/pageManageUser/PageManageUser'))
const PageCreateUser = lazy(() => import('../modules/user/pages/pageCreateUser/PageCreateUser'))
const PageUserDetail = lazy(() => import('./../modules/user/pages/pageUserDetail/PageUserDetail'))

export const ROUTES = {
  login: '/login',

  home: '/home',
  manageUser: '/manage-user',
  createUser: '/create-user',
  userDetail: '/user-detail/:userId',
  products: '/products',
}

export const PROTECTED_ROUTES = [
  { path: ROUTES.home, component: HomePage },
  { path: ROUTES.manageUser, component: PageManageUser },
  { path: ROUTES.createUser, component: PageCreateUser },
  { path: ROUTES.userDetail, component: PageUserDetail },
  //{ path: ROUTES.products, component: HomePage },
]
