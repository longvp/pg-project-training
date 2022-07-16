import { Field, Form, Formik } from 'formik'
import React from 'react'
import { IUserCreateUpdate } from '../../../../models/user'
import * as yup from 'yup'
import { validEmailRegex } from '../../../../utils'
import Footer from '../../../defaultLayout/footer/Footer'
import CustomSelectFormik from '../../../common/components/customSelectFormik/CustomSelectFormik'
import { ACCESS_LEVEL_OPTIONS, ROLE_OPTIONS } from '../../utils'
import FormInput from '../../../common/components/formInput/FormInput'

interface Props {
  handleCreate(values: IUserCreateUpdate): void
  loading: boolean
}

const FormCreateUser = (props: Props) => {
  const { handleCreate, loading } = props

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

  const initialValues: IUserCreateUpdate = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm_password: '',
    paymentRailsType: '', //individual / business
    access_level: '', //Admin-100 / Vendor-10
    roles: ['1'],
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
            {values.access_level == 10 && (values.roles = [])}
            <Form>
              {/* FIRST NAME */}
              <FormInput isRequired htmlFor="firstName" label="First Name">
                <>
                  <Field type="text" id="firstName" name="firstName" className="input-field" />
                  {errors && errors?.firstName && touched?.firstName && (
                    <small className="text-danger">{errors?.firstName}</small>
                  )}
                </>
              </FormInput>
              {/* LAST NAME */}
              <FormInput isRequired htmlFor="lastName" label="Last Name">
                <>
                  <Field type="text" id="lastName" name="lastName" className="input-field" />
                  {errors && errors?.lastName && touched?.lastName && (
                    <small className="text-danger">{errors?.lastName}</small>
                  )}
                </>
              </FormInput>
              {/* EMAIL */}
              <FormInput isRequired htmlFor="email" label=" Email">
                <>
                  <Field type="text" id="email" name="email" className="input-field" />
                  {errors && errors?.email && touched?.email && <small className="text-danger">{errors?.email}</small>}
                </>
              </FormInput>
              {/* PASSWORD */}
              <FormInput isRequired htmlFor="password" label="Password">
                <>
                  <Field type="password" id="password" name="password" className="input-field" />
                  {errors && errors?.password && touched?.password && (
                    <small className="text-danger">{errors?.password}</small>
                  )}
                </>
              </FormInput>
              {/* CONFIRM PASSWORD */}
              <FormInput isRequired htmlFor="confirm_password" label="Confirm Password">
                <>
                  <Field type="password" id="confirm_password" name="confirm_password" className="input-field" />
                  {errors && errors?.confirm_password && touched?.confirm_password && (
                    <small className="text-danger">{errors?.confirm_password}</small>
                  )}
                </>
              </FormInput>
              <div className="seprated-space"></div>
              <h4 className="title-sub my-3">Access Information</h4>
              {/* TYPE */}
              <FormInput isRequired htmlFor="type" label="Type">
                <>
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
                </>
              </FormInput>
              {/* Access Level */}
              <FormInput isRequired htmlFor="accessLevel" label="Access Level">
                <>
                  <Field
                    placeholder="Select level"
                    name="access_level"
                    options={ACCESS_LEVEL_OPTIONS}
                    component={CustomSelectFormik}
                    isMulti={false}
                  />
                  {errors && errors?.access_level && touched?.access_level && (
                    <small className="text-danger">{errors?.access_level}</small>
                  )}
                </>
              </FormInput>
              {/* ROLES */}
              {values.access_level == 100 && (
                <FormInput htmlFor="role" label="Roles">
                  <Field
                    placeholder="Select roles"
                    name="roles"
                    options={ROLE_OPTIONS}
                    component={CustomSelectFormik}
                    isMulti={true}
                  />
                </FormInput>
              )}
              {/* MEMBERSHIP */}
              <FormInput htmlFor="membership" label="Membership">
                <Field
                  placeholder="Select membership"
                  name="membership_id"
                  options={membershipOptions}
                  component={CustomSelectFormik}
                  isMulti={false}
                />
              </FormInput>
              {/* Require to change password on next log in */}
              <FormInput htmlFor="forceChangePassword" label="Require to change password on next log in">
                <Field type="checkbox" id="forceChangePassword" name="forceChangePassword" />
              </FormInput>
              <div className="seprated-space"></div>
              <h4 className="title-sub my-3">Tax Information</h4>
              {/* Tax exempt */}
              <FormInput htmlFor="taxExempt" label="Tax exempt">
                <Field type="checkbox" id="taxExempt" name="taxExempt" />
              </FormInput>
              <Footer>
                <button type="submit" className="btn-footer" disabled={loading}>
                  {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
                  Create User
                </button>
              </Footer>
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

export default FormCreateUser
