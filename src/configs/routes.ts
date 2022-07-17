import React, { lazy } from 'react'

// const HomePage = lazy(() => import('../modules/home/pages/HomePage'))

// const PageManageUser = lazy(() => import('../modules/user/pages/PageManageUser'))
// const PageCreateUser = lazy(() => import('../modules/user/pages/PageCreateUser'))
// const PageUserDetail = lazy(() => import('./../modules/user/pages/pageUserDetail/PageUserDetail'))

// const PageManageProduct = lazy(() => import('../modules/product/pages/PageManageProduct'))
// const PageFormProduct = lazy(() => import('../modules/product/pages/PageFormProduct'))

import HomePage from '../modules/home/pages/HomePage'

import PageManageUser from '../modules/user/pages/PageManageUser'
import PageCreateUser from '../modules/user/pages/PageCreateUser'
import PageUserDetail from './../modules/user/pages/pageUserDetail/PageUserDetail'

import PageManageProduct from '../modules/product/pages/PageManageProduct'
import PageFormProduct from '../modules/product/pages/PageFormProduct'

import PageManageOrder from './../modules/order/pages/PageManageOrder'

export const ROUTES = {
  login: '/login',

  home: '/home',

  manageUser: '/manage-user',
  createUser: '/create-user',
  userDetail: '/user-detail/:userId',

  manageProduct: '/manage-product',
  createProduct: '/create-product',
  productDetail: '/product-detail/:productId',

  manageOrder: '/manage-order',
}

export const PROTECTED_ROUTES = [
  { path: ROUTES.home, component: HomePage },

  { path: ROUTES.manageUser, component: PageManageUser },
  { path: ROUTES.createUser, component: PageCreateUser },
  { path: ROUTES.userDetail, component: PageUserDetail },

  { path: ROUTES.manageProduct, component: PageManageProduct },
  { path: ROUTES.createProduct, component: PageFormProduct },
  { path: ROUTES.productDetail, component: PageFormProduct },

  { path: ROUTES.manageOrder, component: PageManageOrder },
]
