import React, { lazy, Suspense } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { PROTECTED_ROUTES, ROUTES } from './configs/routes'
import ProtectedRoute from './modules/common/components/ProtectedRoute'
import DefaulLayout from './modules/defaultLayout/DefaultLayout'

const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'))

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation()

  return (
    <>
      <Suspense fallback={<div>Loading.....</div>}>
        <Switch location={location}>
          <Route path={ROUTES.login} component={LoginPage} />

          {/* PROTECTED ROUTES */}
          {PROTECTED_ROUTES.map((route, index) => {
            const Page = route.component
            return (
              <ProtectedRoute key={index} path={route.path}>
                <DefaulLayout>
                  <Page />
                </DefaulLayout>
              </ProtectedRoute>
            )
          })}

          <Route path="/" component={LoginPage} />
        </Switch>
      </Suspense>
    </>
  )
}
