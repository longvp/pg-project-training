import { Field, Form, Formik } from 'formik'
import React from 'react'
import Select, { MultiValue, SingleValue } from 'react-select'
import { IUserCreate } from '../../../../models/user'
import './FormAddUser.scss'
import * as yup from 'yup'
import { validEmailRegex } from '../../../../utils'
import { IOption } from '../../../../models/option'
import Footer from '../../../home/components/defaultLayout/footer/Footer'

interface Props {
  handleCreate(values: IUserCreate): void
}

const FormAddUser = (props: Props) => {
  const { handleCreate } = props

  const initialValues: IUserCreate = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm_password: '',
    paymentRailsType: 'individual', //business
    access_level: '', //number | string --- Admin-100 / Vendor-10
    membership_id: '', //string | number
    forceChangePassword: 0,
    taxExempt: 0,
  }

  const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().required('Email is required').matches(validEmailRegex, 'Email is invalid'),
    password: yup.string().required('Password is required').min(6, 'Password is requires 6 characters minimum'),
    confirm_password: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password'), null], 'Passwords do not match'),
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          handleCreate(data)
        }}
      >
        {({ values, errors, touched }) => (
          <>
            <Form>
              {/* FIRST NAME */}
              <div className="form-add">
                <label htmlFor="firstName">
                  First Name
                  <span className="required">*</span>
                </label>
                <Field type="text" id="firstName" name="firstName" />
                {errors && errors?.firstName && touched?.firstName && (
                  <small className="text-danger">{errors?.firstName}</small>
                )}
              </div>
              {/* LAST NAME */}
              <div className="form-add">
                <label htmlFor="lastName">
                  Last Name
                  <span className="required">*</span>
                </label>
                <Field type="text" id="lastName" name="lastName" />
                {errors && errors?.lastName && touched?.lastName && (
                  <small className="text-danger">{errors?.lastName}</small>
                )}
              </div>
              {/* EMAIL */}
              <div className="form-add">
                <label htmlFor="email">
                  Email
                  <span className="required">*</span>
                </label>
                <Field type="text" id="email" name="email" />
                {errors && errors?.email && touched?.email && <small className="text-danger">{errors?.email}</small>}
              </div>
              {/* PASSWORD */}
              <div className="form-add">
                <label htmlFor="password">
                  Password
                  <span className="required">*</span>
                </label>
                <Field type="password" id="password" name="password" />
                {errors && errors?.password && touched?.password && (
                  <small className="text-danger">{errors?.password}</small>
                )}
              </div>
              {/* CONFIRM PASSWORD */}
              <div className="form-add">
                <label htmlFor="confirm_password">
                  Confirm Password
                  <span className="required">*</span>
                </label>
                <Field type="password" id="confirm_password" name="confirm_password" />
                {errors && errors?.confirm_password && touched?.confirm_password && (
                  <small className="text-danger">{errors?.confirm_password}</small>
                )}
              </div>
              {/* TYPE */}
              <div className="form-add">
                <label htmlFor="type">Type</label>
                {/* <Select
                  placeholder="Any status"
                  value={statusSelected}
                  options={STATUS_OPTIONS}
                  name="paymentRailsType"
                  onChange={(e) => handleChangeStatusSelect(e)}
                  className="select-filter"
                  classNamePrefix="select"
                /> */}
              </div>
              {/* Access Level */}
              <div className="form-add">
                <label htmlFor="accessLevel">
                  Access Level
                  <span className="required">*</span>
                </label>
                <Field type="password" id="confirmPassword" name="confirmPassword" />
              </div>
              {/* ROLES */}
              <div className="form-add">
                <label htmlFor="role">Roles</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" />
              </div>
              {/* MEMBERSHIP */}
              <div className="form-add">
                <label htmlFor="membership">Membership</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" />
              </div>
              {/* Require to change password on next log in */}
              <div className="form-add">
                <label htmlFor="">Require to change password on next log in</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" />
              </div>
              {/* Tax exempt */}
              <div className="form-add">
                <label htmlFor="">Tax exempt</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" />
              </div>
              <Footer>
                <button
                  type="submit"
                  className="btn-footer"
                  //{`btn-footer ${userListSelectedDelete.length > 0 ? '' : 'btn-footer-disabled'}`}
                  //   disabled={userListSelectedDelete.length === 0 ? true : false}
                  // onClick={() => handleCreate()}
                >
                  Update selected
                </button>
              </Footer>
              {/* <button type="submit">Submit</button> */}
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

export default FormAddUser
