import { replace } from 'connected-react-router'
import Cookies from 'js-cookie'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { API_PATHS } from '../../../configs/api'
import { ROUTES } from '../../../configs/routes'
import { ILoginParams } from '../../../models/auth'
import { AppState } from '../../../redux/reducer'
import { ACCESS_TOKEN_KEY } from '../../../utils/constants'
import { setUserInfo } from '../redux/authReducer'
import { fetchThunk } from '../../common/redux/thunk'
import LoginForm from '../components/LoginForm'
import { Redirect } from 'react-router'

function LoginPage() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('')
      setLoading(true)
      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
      )
      setLoading(false)
      if (json?.success === true) {
        dispatch(setUserInfo({ ...json.user, user_cookie: json.user_cookie }))
        Cookies.set(ACCESS_TOKEN_KEY, json.user_cookie, { expires: values.rememberMe ? 7 : undefined })
        dispatch(replace(ROUTES.manageUser))
        return
      }
      setErrorMessage(json?.errors.email)
    },
    [dispatch],
  )

  const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
  if (accessToken) {
    return (
      <Redirect
        to={{
          pathname: ROUTES.manageUser,
        }}
      />
    )
  }

  // React.useEffect(() => {
  //   if (accessToken) {
  //     dispatch(replace(ROUTES.manageUser))
  //   }
  // }, [])

  return (
    <>
      <LoginForm handleLogin={handleLogin} loading={loading} errorMessage={errorMessage} />
    </>
  )
}

export default LoginPage
