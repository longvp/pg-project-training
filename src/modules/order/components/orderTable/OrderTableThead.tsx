import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IOption } from '../../../../models/option'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import { setFilterFieldOrder } from '../../redux/orderReducer'
import { ORDER_BY } from '../../../../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons'

interface Props {
  sortOption: IOption
}

const OrderTableThead = (props: Props) => {
  const { sortOption } = props
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { filterFieldOrder } = useSelector((state: AppState) => ({
    filterFieldOrder: state.order.filterFieldOrder,
  }))

  const handleSort = () => {
    const orderBy = filterFieldOrder.order_by
    dispatch(
      setFilterFieldOrder({
        ...filterFieldOrder,
        sort: sortOption.value,
        order_by: orderBy === ORDER_BY.ASC ? ORDER_BY.DESC : ORDER_BY.ASC,
      }),
    )
  }

  return (
    <>
      <th>
        <button type="button" disabled={sortOption.value === '' ? true : false} onClick={() => handleSort()}>
          {sortOption.label}
          {filterFieldOrder.sort === sortOption.value ? (
            <FontAwesomeIcon
              className="icon"
              icon={filterFieldOrder.order_by === ORDER_BY.ASC ? faUpLong : faDownLong}
            />
          ) : (
            ''
          )}
        </button>
      </th>
    </>
  )
}

export default OrderTableThead
