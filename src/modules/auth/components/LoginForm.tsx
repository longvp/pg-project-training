import React from 'react'
import './LoginForm.scss'
import { ILoginParams } from '../../../models/auth'
import { Field, Form, Formik } from 'formik'
import { validEmailRegex } from '../../../utils/index'
import { FormattedMessage } from 'react-intl'
import * as yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'

interface Props {
  handleLogin(values: ILoginParams): void
  loading: boolean
  errorMessage: string
}

const LoginForm = (props: Props) => {
  const { handleLogin, errorMessage, loading } = props

  const initialValues: ILoginParams = { email: '', password: '', rememberMe: false }
  const [showPassword, setShowPassword] = React.useState<boolean>(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const validationSchema = yup.object({
    email: yup.string().required('emailRequire').matches(validEmailRegex, 'emailInvalid'),
    password: yup.string().required('passwordRequire').min(6, 'minPasswordInvalid'),
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true)
          handleLogin(data)
          setSubmitting(false)
        }}
      >
        {({ errors, touched }) => (
          <Form className="form-login">
            <div className="title">
              <FormattedMessage id="logIn" />
            </div>
            {!!errorMessage && (
              <div className="alert alert-danger error" role="alert">
                {errorMessage}
              </div>
            )}
            {/* EMAIL */}
            <div className="input">
              <label htmlFor="email">
                Email
                <span className="required">*</span>
              </label>
              <FontAwesomeIcon className="icon-input" icon={faEnvelope} />
              <Field type="text" id="email" name="email" />
            </div>
            {errors && errors?.email && touched?.email && (
              <small className="text-danger">
                <FormattedMessage id={errors?.email} />
              </small>
            )}
            {/* PASSWORD */}
            <div className="input">
              <label htmlFor="password">
                Password
                <span className="required">*</span>
              </label>
              <FontAwesomeIcon className="icon-input" icon={faLock} />
              <Field type={showPassword ? 'text' : 'password'} id="password" name="password" />
              <FontAwesomeIcon
                className="icon-eye"
                icon={showPassword ? faEyeSlash : faEye}
                onClick={handleShowPassword}
              />
            </div>
            {errors && errors?.password && touched?.password && (
              <small className="text-danger">
                <FormattedMessage id={errors?.password} />
              </small>
            )}
            {/* REMEMBER ME */}
            <div className="remember-box">
              <Field name="rememberMe" id="remember" type="checkbox" />
              <label htmlFor="remember">
                <FormattedMessage id="remember" />
              </label>
            </div>
            {/* BUTTON SUBMIT */}
            <button type="submit" className="submit" disabled={loading}>
              {loading && <div className="spinner-border spinner-border-sm text-light mx-2" role="status" />}
              <FormattedMessage id="logIn" />
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default LoginForm
