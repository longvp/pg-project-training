import React, { lazy } from 'react'

const HomePage = lazy(() => import('../modules/home/pages/HomePage'))
const MangeUser = lazy(() => import('../modules/user/pages/manageUser/ManageUser'))
const CreateUser = lazy(() => import('../modules/user/pages/createUser/CreateUser'))

export const ROUTES = {
  login: '/login',

  home: '/home',
  manageUser: '/manage-user',
  createUser: '/create-user',
  products: '/products',
}

export const PROTECTED_ROUTES = [
  { path: ROUTES.home, component: HomePage },
  { path: ROUTES.manageUser, component: MangeUser },
  { path: ROUTES.createUser, component: CreateUser },
  //{ path: ROUTES.products, component: HomePage },
]
