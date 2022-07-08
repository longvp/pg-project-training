import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IOption } from '../../../../models/option'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import { setFilterFieldProduct } from '../../redux/productReducer'
import { ORDER_BY } from '../../../../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons'

interface Props {
  sortOption: IOption
}

const ProductTableThead = (props: Props) => {
  const { sortOption } = props
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { filterFieldProduct } = useSelector((state: AppState) => ({
    filterFieldProduct: state.product.filterFieldProduct,
  }))

  const handleSort = () => {
    const orderBy = filterFieldProduct.order_by
    dispatch(
      setFilterFieldProduct({
        ...filterFieldProduct,
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
          {filterFieldProduct.sort === sortOption.value ? (
            <FontAwesomeIcon
              className="icon"
              icon={filterFieldProduct.order_by === ORDER_BY.ASC ? faUpLong : faDownLong}
            />
          ) : (
            ''
          )}
        </button>
      </th>
    </>
  )
}

export default ProductTableThead
