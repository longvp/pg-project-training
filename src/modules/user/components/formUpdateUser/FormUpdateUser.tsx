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
import FormInput from '../../../home/components/formInput/FormInput'

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
              <FormInput isRequired htmlFor="firstName" label="First Name">
                <>
                  <Field type="text" id="firstName" name="firstName" className="input-field" />
                  {errors && errors?.firstName && touched?.firstName && (
                    <small className="text-danger">{errors?.firstName}</small>
                  )}
                </>
              </FormInput>
              {/* LAST NAME */}
              <FormInput isRequired htmlFor="lastName" label=" Last Name">
                <>
                  <Field type="text" id="lastName" name="lastName" className="input-field" />
                  {errors && errors?.lastName && touched?.lastName && (
                    <small className="text-danger">{errors?.lastName}</small>
                  )}
                </>
              </FormInput>
              {/* EMAIL */}
              <FormInput isRequired htmlFor="email" label="Email">
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
                <FormInput htmlFor="role" label="Roles">
                  <Field
                    placeholder="Select roles"
                    name="roles"
                    options={roleOptions}
                    component={CustomSelectFormik}
                    isMulti={true}
                  />
                </FormInput>
              )}
              {/* ACCOUNT STATUS */}
              <FormInput htmlFor="status" label="Account status">
                <Field
                  placeholder="Select status"
                  name="status"
                  options={STATUS_OPTIONS}
                  component={CustomSelectFormik}
                  isMulti={false}
                />
              </FormInput>
              {/* STATUS COMMENT*/}
              <FormInput htmlFor="statusComment" label="Status comment (reason)">
                <Field as="textarea" id="statusComment" name="statusComment" />
              </FormInput>
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
              <h4 className="title-sub my-3">Tax information</h4>
              {/* Tax exempt */}
              <FormInput htmlFor="taxExempt" label="Tax exempt">
                <Field type="checkbox" id="taxExempt" name="taxExempt" />
              </FormInput>
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
