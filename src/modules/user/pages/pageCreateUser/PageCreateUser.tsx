import React from 'react'
import FormCreateUser from '../../components/formCreateUser/FormCreateUser'
import { IUserCreateUpdate } from '../../../../models/user'
import { useDispatch } from 'react-redux'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { fetchThunk } from '../../../common/redux/thunk'
import { API_PATHS } from '../../../../configs/api'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'
import { ROUTES } from '../../../../configs/routes'
import BackPage from '../../../home/components/backPage/BackPage'

const PageCreateUser = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const history = useHistory()
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleCreate = React.useCallback(
    async (values: IUserCreateUpdate) => {
      setLoading(true)
      const postValues = { ...values, forceChangePassword: +values.forceChangePassword, taxExempt: +values.taxExempt }
      const json = await dispatch(fetchThunk(API_PATHS.userCreate, 'post', postValues))
      if (json?.success) {
        toast.success('Create Success !')
        history.push(ROUTES.manageUser)
      } else {
        toast.error(json.errors)
      }
      setLoading(false)
    },
    [dispatch],
  )

  return (
    <>
      <div className="page">
        <BackPage />
        <div className="title">Create Profile</div>
        <FormCreateUser handleCreate={handleCreate} loading={loading} />
      </div>
    </>
  )
}

export default PageCreateUser
