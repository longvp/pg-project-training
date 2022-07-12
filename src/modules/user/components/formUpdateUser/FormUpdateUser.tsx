import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { IUserCreateUpdate } from '../../../../models/user'
import { AppState } from '../../../../redux/reducer'
import Footer from '../../../home/components/defaultLayout/footer/Footer'
import * as yup from 'yup'
import { validEmailRegex } from '../../../../utils'
import CustomSelectFormik from '../../../home/components/customSelectFormik/CustomSelectFormik'
import { STATUS_OPTIONS, ACCESS_LEVEL_OPTIONS } from '../../utils'
import { IOption } from '../../../../models/option'
import { IRole } from '../../../../models/role'

interface Props {
  handleUpdate(values: IUserCreateUpdate): void
  loading: boolean
}

const FormUpdateUser = (props: Props) => {
  const { handleUpdate, loading } = props

  const { userDetail, roleList } = useSelector((state: AppState) => ({
    userDetail: state.user.userDetail,
    roleList: state.user.roleList,
  }))

  const [isUpdate, setIsUpdate] = React.useState<boolean>(false)
  const [initialValues, setInitialValues] = React.useState<IUserCreateUpdate>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm_password: '',
    paymentRailsType: '',
    roles: [],
    status: '',
    statusComment: '',
    membership_id: '',
    forceChangePassword: false,
    taxExempt: false,
  })

  React.useEffect(() => {
    if (userDetail) {
      console.log('use: ', userDetail.roles)
      setInitialValues({
        firstName: userDetail.firstName ? userDetail.firstName : '',
        lastName: userDetail.lastName ? userDetail.lastName : '',
        email: userDetail.email,
        password: '',
        confirm_password: '',
        paymentRailsType: userDetail.paymentRailsType ? userDetail.paymentRailsType : '',
        paymentRailsId: userDetail.paymentRailsId ? userDetail.paymentRailsId : '',
        access_level: userDetail.access_level ? userDetail.access_level : '',
        roles: userDetail.roles,
        status: userDetail.status,
        statusComment: '',
        membership_id: userDetail.membership_id ? userDetail.membership_id : '',
        forceChangePassword: Boolean(+userDetail.forceChangePassword),
        taxExempt: Boolean(+userDetail.taxExempt),
      })
    }
  }, [userDetail])

  console.log('i u: ', initialValues)

  const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().required('Email is required').matches(validEmailRegex, 'Email is invalid'),
    password: yup.string().required('Password is required').min(6, 'Password is requires 6 characters minimum'),
    confirm_password: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password'), null], 'Passwords do not match'),
  })

  //  ------ BUILD ROLE OPTIONS
  const [roleOptions, setRoleOptions] = React.useState<IOption[]>([])

  const buildRoleOptions = (roleList: IRole[]) => {
    const result: IOption[] = []
    if (roleList && roleList.length > 0) {
      roleList.map((r) => {
        result.push({ label: r.name, value: '' + r.id })
      })
    }
    return result
  }

  React.useEffect(() => {
    if (roleList && roleList.length > 0) {
      setRoleOptions(buildRoleOptions(roleList))
    }
  }, [roleList])

  // ------------------ MEMBERSHIP OPTIONS
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

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(data) => {
          handleUpdate(data)
        }}
      >
        {({ values, errors, touched }) => (
          <>
            {JSON.stringify(values) !== JSON.stringify(initialValues) ? setIsUpdate(true) : setIsUpdate(false)}
            <Form>
              {/* FIRST NAME */}
              <h4 className="title-sub">Email & password</h4>
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
                <label>Type</label>
                <div className="input-container">{values.paymentRailsType}</div>
              </div>
              {/* PaymentRails ID */}
              <div className="form">
                <label>PaymentRails ID</label>
                <div className="input-container">{values.paymentRailsId}</div>
              </div>
              <div className="seprated-space"></div>
              <h4 className="title-sub my-3">Access information</h4>
              {/* Access Level */}
              <div className="form">
                <label htmlFor="accessLevel">Access Level</label>
                <div className="input-container">
                  {values.access_level && +values.access_level === 100 ? 'Admin' : 'Vendor'}
                </div>
              </div>
              {/* ROLES */}
              {values.access_level && +values.access_level === 100 && (
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
              {/* ACCOUNT STATUS */}
              <div className="form">
                <label htmlFor="status">
                  Account status
                  <span className="required">*</span>
                </label>
                <div className="input-container">
                  <Field
                    placeholder="Select status"
                    name="status"
                    options={STATUS_OPTIONS}
                    component={CustomSelectFormik}
                    isMulti={false}
                  />
                </div>
              </div>
              {/* STATUS COMMENT*/}
              <div className="form">
                <label htmlFor="comment">Status comment (reason)</label>
                <div className="input-container">
                  <Field as="textarea" name="statusComment" />
                </div>
              </div>
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
              <div className="seprated-space"></div>
              <h4 className="title-sub my-3">Tax information</h4>
              {/* Tax exempt */}
              <div className="form">
                <label htmlFor="taxExempt">Tax exempt</label>
                <div className="input-container">
                  <Field type="checkbox" id="taxExempt" name="taxExempt" />
                </div>
              </div>
              <Footer>
                <button
                  type="submit"
                  className={`btn-footer ${!isUpdate ? 'btn-footer-disabled' : ''}`}
                  disabled={loading || !isUpdate}
                >
                  {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
                  Update User
                </button>
              </Footer>
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

export default FormUpdateUser
