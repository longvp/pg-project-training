import React, { lazy } from 'react'

const HomePage = lazy(() => import('../modules/home/pages/HomePage'))

const PageManageUser = lazy(() => import('../modules/user/pages/pageManageUser/PageManageUser'))
const PageCreateUser = lazy(() => import('../modules/user/pages/pageCreateUser/PageCreateUser'))
const PageUserDetail = lazy(() => import('./../modules/user/pages/pageUserDetail/PageUserDetail'))

const PageManageProduct = lazy(() => import('../modules/product/pages/pageManageProduct/PageManageProduct'))
const PageFormProduct = lazy(() => import('../modules/product/pages/pageFormProduct/PageFormProduct'))

export const ROUTES = {
  login: '/login',

  home: '/home',

  manageUser: '/manage-user',
  createUser: '/create-user',
  userDetail: '/user-detail/:userId',

  manageProduct: '/manage-product',
  createProduct: '/create-product',
  productDetail: '/product-detail/:productId',
}

export const PROTECTED_ROUTES = [
  { path: ROUTES.home, component: HomePage },

  { path: ROUTES.manageUser, component: PageManageUser },
  { path: ROUTES.createUser, component: PageCreateUser },
  { path: ROUTES.userDetail, component: PageUserDetail },

  { path: ROUTES.manageProduct, component: PageManageProduct },
  { path: ROUTES.createProduct, component: PageFormProduct },
  { path: ROUTES.productDetail, component: PageFormProduct },
]
