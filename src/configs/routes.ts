import React, { lazy } from 'react'

const HomePage = lazy(() => import('../modules/home/pages/HomePage'))

export const ROUTES = {
  login: '/login',

  home: '/home',
  products: '/products',
}

export const PROTECTED_ROUTES = [
  { path: ROUTES.home, component: HomePage },
  { path: ROUTES.products, component: HomePage },
]
