import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import BackPage from '../../../home/components/backPage/BackPage'
import { fetchThunk } from '../../../common/redux/thunk'
import { API_PATHS } from '../../../../configs/api'
import { setRoleList, setUserDetail } from '../../redux/userReducer'
import Loading from '../../../home/components/loading/Loading'
import { toast } from 'react-toastify'
import './PageUserDetail.scss'
import moment from 'moment'
import FormUpdateUser from '../../components/formUpdateUser/FormUpdateUser'
import { IUserCreateUpdate } from '../../../../models/user'
import { formatCurrency } from '../../../../utils'

const PageUserDetail = () => {
  const param = useParams<{ userId: string | undefined }>()
  const userId = param.userId || ''
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { userDetail } = useSelector((state: AppState) => ({
    userDetail: state.user.userDetail,
  }))

  const [loading, setLoading] = React.useState<boolean>(false)

  const getUserDetail = React.useCallback(async () => {
    setLoading(true)
    const json = await dispatch(
      fetchThunk(API_PATHS.userDetail, 'post', {
        id: userId,
      }),
    )
    if (json?.success) {
      dispatch(setUserDetail(json?.data?.info))
      dispatch(setRoleList(json?.data?.account_roles))
    } else {
      toast.error(`${userId} is not a number`)
    }
    setLoading(false)
  }, [userId])

  React.useEffect(() => {
    getUserDetail()
  }, [userId])

  const handleUpdate = React.useCallback(
    async (values: IUserCreateUpdate) => {
      setLoading(true)
      const postValues = {
        ...values,
        forceChangePassword: +values.forceChangePassword,
        taxExempt: +values.taxExempt,
        id: userId,
      }
      const json = await dispatch(
        fetchThunk(API_PATHS.userUpdate, 'post', {
          params: [postValues],
        }),
      )
      if (json?.success) {
        getUserDetail()
        toast.success('Update success')
      } else {
        toast.error(json?.errors)
      }
      setLoading(false)
    },
    [dispatch],
  )

  return (
    <>
      {userDetail && (
        <div className="page">
          <BackPage />
          <div className="title">
            {userDetail.email} {userDetail.companyName ? `(${userDetail.companyName})` : ''}
            <hr />
          </div>
          <div className="info-content">
            <div className="info-item">
              <span className="text">Orders placed as a buyer</span>
              <span className="value">0 ($0.00)</span>
            </div>
            <div className="info-item">
              <span className="text">Vendor Income</span>
              <span className="value">{formatCurrency(+userDetail.income)}</span>
            </div>
            <div className="info-item">
              <span className="text">Vendor Expense</span>
              <span className="value">{formatCurrency(+userDetail.expense)}</span>
            </div>
            <div className="info-item">
              <span className="text">Earning balance</span>
              <span className="value">{formatCurrency(+userDetail.earning)}</span>
            </div>
            <div className="info-item">
              <span className="text">Products listed as vendor</span>
              <span className="value">{userDetail.products_total}</span>
            </div>
            <div className="info-item">
              <span className="text">Joined</span>
              <span className="value">{moment(+userDetail.joined * 1000).format('lll')}</span>
            </div>
            <div className="info-item">
              <span className="text">Last login</span>
              <span className="value">
                {userDetail.last_login ? moment(+userDetail.last_login * 1000).format('lll') : 'Never'}
              </span>
            </div>
            {userDetail.language && (
              <div className="info-item">
                <span className="text">Language</span>
                <span className="value">{userDetail.language}</span>
              </div>
            )}
            {userDetail.referer && (
              <div className="info-item">
                <span className="text">Referer</span>
                <span className="value">{userDetail.referer}</span>
              </div>
            )}
          </div>
          <div className="seprated-space"></div>
          <FormUpdateUser handleUpdate={handleUpdate} loading={loading} />
        </div>
      )}
      {loading && <Loading />}
    </>
  )
}

export default PageUserDetail
