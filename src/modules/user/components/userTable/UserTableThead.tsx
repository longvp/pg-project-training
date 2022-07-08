import { faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { IOption } from '../../../../models/option'
import { AppState } from '../../../../redux/reducer'
import { setFilterFieldUser } from '../../redux/userReducer'
import { ORDER_BY } from '../../../../utils/constants'

interface Props {
  sortOption: IOption
}

const UserTableThead = (props: Props) => {
  const { sortOption } = props
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { filterFieldUser } = useSelector((state: AppState) => ({
    filterFieldUser: state.user.filterFieldUser,
  }))

  const handleSort = () => {
    const orderBy = filterFieldUser.order_by
    dispatch(
      setFilterFieldUser({
        ...filterFieldUser,
        sort: sortOption.value,
        order_by: orderBy === ORDER_BY.ASC ? ORDER_BY.DESC : ORDER_BY.ASC,
      }),
    )
  }

  return (
    <th>
      <button type="button" disabled={sortOption.value === '' ? true : false} onClick={() => handleSort()}>
        {sortOption.label}
        {filterFieldUser.sort === sortOption.value ? (
          <FontAwesomeIcon className="icon" icon={filterFieldUser.order_by === ORDER_BY.ASC ? faUpLong : faDownLong} />
        ) : (
          ''
        )}
      </button>
    </th>
  )
}

export default UserTableThead
