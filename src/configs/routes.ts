import React, { lazy } from 'react'

const HomePage = lazy(() => import('../modules/home/pages/HomePage'))
const MangeUser = lazy(() => import('../modules/user/pages/manageUser/ManageUser'))
const AddUser = lazy(() => import('../modules/user/pages/addUser/AddUser'))

export const ROUTES = {
  login: '/login',

  home: '/home',
  manageUser: '/manage-user',
  addUser: '/add-user',
  products: '/products',
}

export const PROTECTED_ROUTES = [
  { path: ROUTES.home, component: HomePage },
  { path: ROUTES.manageUser, component: MangeUser },
  { path: ROUTES.addUser, component: AddUser },
  //{ path: ROUTES.products, component: HomePage },
]
