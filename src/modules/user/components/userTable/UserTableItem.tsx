import React from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IUser, IUserDelete } from './../../../../models/user'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../../redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { setUserListSelectedDelete } from './../../redux/userReducer'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../../../configs/routes'

interface Props {
  user: IUser
}

const UserTableItem = (props: Props) => {
  const { user } = props
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { userListSelectedDelete } = useSelector((state: AppState) => ({
    userListSelectedDelete: state.user.userListSelectedDelete,
  }))

  const [isSelectedDelete, setIsSelectedDelete] = React.useState<boolean>(false)

  const handleSelectedDelete = () => {
    setIsSelectedDelete(!isSelectedDelete)
  }

  React.useEffect(() => {
    if (isSelectedDelete) {
      dispatch(setUserListSelectedDelete([...userListSelectedDelete, { id: user.profile_id, delete: 1 }]))
    } else {
      const userListDelete = userListSelectedDelete
      const newList = userListDelete.filter((u) => u.id !== user.profile_id)
      dispatch(setUserListSelectedDelete(newList))
    }
  }, [isSelectedDelete])

  return (
    <>
      <tr className={`${isSelectedDelete ? 'isSelectedDelete' : ''}`}>
        <td>
          <input type="checkbox" checked={isSelectedDelete} onChange={() => handleSelectedDelete()} />
        </td>
        <td>
          <NavLink to={`/user-detail/${user.profile_id}`} className="link">
            {user.vendor}
          </NavLink>
          <br />
          {user.storeName ? user.storeName : ''}
        </td>
        <td>
          {user.fistName ? user.fistName : ''} {user.lastName ? user.lastName : ''}
        </td>
        <td>{user.access_level}</td>
        <td>{user.product}</td>
        <td>{user.order.order_as_buyer}</td>
        <td>{user.wishlist}</td>
        <td>{moment(+user.created * 1000).format('lll')}</td>
        <td>{+user.last_login > 0 ? moment(+user.last_login * 1000).format('lll') : 'Never'}</td>
        <td>
          <FontAwesomeIcon className="icon-delete" icon={faTrash} onClick={() => handleSelectedDelete()} />
        </td>
      </tr>
    </>
  )
}

export default UserTableItem
