import React from 'react'
import FormAddUser from '../../components/formAddUser/FormAddUser'
import { IUserCreate } from '../../../../models/user'
import { useDispatch } from 'react-redux'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { fetchThunk } from '../../../common/redux/thunk'
import { API_PATHS } from '../../../../configs/api'

const AddUser = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  const handleCreate = React.useCallback(
    async (values: IUserCreate) => {
      setLoading(true)
      const postValues = { ...values, forceChangePassword: +values.forceChangePassword, taxExempt: +values.taxExempt }
      const json = await dispatch(fetchThunk(API_PATHS.userCreate, 'post', postValues))
      console.log('crea: ', json) // message = json?.errors
      setLoading(false)
    },
    [dispatch],
  )

  return (
    <>
      <div className="page-manage">
        <div className="title">Create Profile</div>
        <FormAddUser handleCreate={handleCreate} />
      </div>
    </>
  )
}

export default AddUser
