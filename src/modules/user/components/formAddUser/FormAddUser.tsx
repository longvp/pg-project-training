import { Field, Form, Formik } from 'formik'
import React from 'react'
import Select, { MultiValue, SingleValue } from 'react-select'
import { IUserCreate } from '../../../../models/user'
import './FormAddUser.scss'
import * as yup from 'yup'
import { validEmailRegex } from '../../../../utils'
import { IOption } from '../../../../models/option'
import Footer from '../../../home/components/defaultLayout/footer/Footer'
import CustomSelectFormik from '../../../home/components/customSelectFormik/CustomSelectFormik'

interface Props {
  handleCreate(values: IUserCreate): void
}

const FormAddUser = (props: Props) => {
  const { handleCreate } = props

  const [isShowRole, setIsShowRole] = React.useState<boolean>(false)

  const typeOptions = [
    {
      label: 'Individual',
      value: 'individual',
    },
    {
      label: 'Business',
      value: 'business',
    },
  ]

  const accessLevelOptions = [
    {
      label: 'Vendor',
      value: '10',
    },
    {
      label: 'Admin',
      value: '100',
    },
  ]

  const membershipOptions = [
    {
      label: 'Ignore Membership',
      value: '',
    },
    {
      label: 'General',
      value: '4',
    },
  ]

  const roleOptions = [
    {
      label: 'Administrator',
      value: '1',
    },
    {
      label: 'Coupons management',
      value: '2',
    },
    {
      label: 'Content management',
      value: '3',
    },
    {
      label: 'Volume discounts management',
      value: '4',
    },
    {
      label: 'Vendor',
      value: '5',
    },
    {
      label: 'View order reports',
      value: '6',
    },
  ]

  const initialValues: IUserCreate = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm_password: '',
    paymentRailsType: '', //individual / business
    access_level: '', //Admin-100 / Vendor-10
    roles: [],
    membership_id: membershipOptions[0].value, //Ignore Membership / General
    forceChangePassword: false,
    taxExempt: false,
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
    paymentRailsType: yup.string().required('Type is required'),
    access_level: yup.string().required('Access level is required'),
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
            {values.access_level === '100' ? setIsShowRole(true) : setIsShowRole(false)}
            <Form>
              {/* FIRST NAME */}
              <div className="form">
                <label htmlFor="firstName">
                  First Name
                  <span className="required">*</span>
                </label>
                <div className="input-container">
                  <Field type="text" id="firstName" name="firstName" className="input-field" />
                  {errors && errors?.firstName && touched?.firstName && (
                    <small className="text-danger">{errors?.firstName}</small>
                  )}
                </div>
              </div>
              {/* LAST NAME */}
              <div className="form">
                <label htmlFor="lastName">
                  Last Name
                  <span className="required">*</span>
                </label>
                <div className="input-container">
                  <Field type="text" id="lastName" name="lastName" className="input-field" />
                  {errors && errors?.lastName && touched?.lastName && (
                    <small className="text-danger">{errors?.lastName}</small>
                  )}
                </div>
              </div>
              {/* EMAIL */}
              <div className="form">
                <label htmlFor="email">
                  Email
                  <span className="required">*</span>
                </label>
                <div className="input-container">
                  <Field type="text" id="email" name="email" className="input-field" />
                  {errors && errors?.email && touched?.email && <small className="text-danger">{errors?.email}</small>}
                </div>
              </div>
              {/* PASSWORD */}
              <div className="form">
                <label htmlFor="password">
                  Password
                  <span className="required">*</span>
                </label>
                <div className="input-container">
                  <Field type="password" id="password" name="password" className="input-field" />
                  {errors && errors?.password && touched?.password && (
                    <small className="text-danger">{errors?.password}</small>
                  )}
                </div>
              </div>
              {/* CONFIRM PASSWORD */}
              <div className="form">
                <label htmlFor="confirm_password">
                  Confirm Password
                  <span className="required">*</span>
                </label>
                <div className="input-container">
                  <Field type="password" id="confirm_password" name="confirm_password" className="input-field" />
                  {errors && errors?.confirm_password && touched?.confirm_password && (
                    <small className="text-danger">{errors?.confirm_password}</small>
                  )}
                </div>
              </div>
              {/* TYPE */}
              <div className="form">
                <label htmlFor="type">
                  Type
                  <span className="required">*</span>
                </label>
                <div className="input-container">
                  <Field
                    placeholder="Select type"
                    name="paymentRailsType"
                    options={typeOptions}
                    component={CustomSelectFormik}
                    isMulti={false}
                  />
                  {errors && errors?.paymentRailsType && touched?.paymentRailsType && (
                    <small className="text-danger">{errors?.paymentRailsType}</small>
                  )}
                </div>
              </div>
              {/* Access Level */}
              <div className="form">
                <label htmlFor="accessLevel">
                  Access Level
                  <span className="required">*</span>
                </label>
                <div className="input-container">
                  <Field
                    placeholder="Select level"
                    name="access_level"
                    options={accessLevelOptions}
                    component={CustomSelectFormik}
                    isMulti={false}
                  />
                  {errors && errors?.access_level && touched?.access_level && (
                    <small className="text-danger">{errors?.access_level}</small>
                  )}
                </div>
              </div>
              {/* ROLES */}
              {isShowRole && (
                <div className="form">
                  <label htmlFor="role">Roles</label>
                  <div className="input-container">
                    <Field
                      placeholder="Select roles"
                      name="roles"
                      options={roleOptions}
                      component={CustomSelectFormik}
                      isMulti={true}
                    />
                  </div>
                </div>
              )}
              {/* MEMBERSHIP */}
              <div className="form">
                <label htmlFor="membership">Membership</label>
                <div className="input-container">
                  <Field
                    placeholder="Select membership"
                    name="membership_id"
                    options={membershipOptions}
                    component={CustomSelectFormik}
                    isMulti={false}
                  />
                </div>
              </div>
              {/* Require to change password on next log in */}
              <div className="form">
                <label htmlFor="forceChangePassword">Require to change password on next log in</label>
                <div className="input-container">
                  <Field type="checkbox" id="forceChangePassword" name="forceChangePassword" />
                </div>
              </div>
              {/* Tax exempt */}
              <div className="form">
                <label htmlFor="taxExempt">Tax exempt</label>
                <div className="input-container">
                  <Field type="checkbox" id="taxExempt" name="taxExempt" />
                </div>
              </div>
              <Footer>
                <button type="submit" className="btn-footer">
                  Update selected
                </button>
              </Footer>
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

export default FormAddUser
