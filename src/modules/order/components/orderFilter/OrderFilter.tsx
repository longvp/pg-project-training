import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import { setFilterFieldOrder } from '../../redux/orderReducer'
import { IFilterFieldOrder } from '../../../../models/order'
import Select, { MultiValue, SingleValue } from 'react-select'
import { FULFILMENT_STATUS_OPTIONS, PAYMENT_STATUS_OPTIONS } from '../../utils'
import { IOption } from '../../../../models/option'
import FilterRangeDate from '../../../common/components/filterRangeDate/FilterRangeDate'

const OrderFilter = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { filterFieldOrder } = useSelector((state: AppState) => ({
    filterFieldOrder: state.order.filterFieldOrder,
  }))

  const [filterField, setFilterField] = React.useState<IFilterFieldOrder>(filterFieldOrder)
  const [rangeDate, setRangeDate] = React.useState<string[]>([])

  //   ---------------------- ON CHANGE ACTION -----------------------------------
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setFilterField({ ...filterField, [name]: value })
  }

  const handleChangePaymentSelect = (event: MultiValue<IOption>) => {
    let fieldPayments: number[] = []
    fieldPayments = event.map((e) => +e.value)
    setFilterField({ ...filterField, payment_status_id: fieldPayments })
  }

  const handleChangeFulfilmentSelect = (event: MultiValue<IOption>) => {
    let fieldFulfils: number[] = []
    fieldFulfils = event.map((e) => +e.value)
    setFilterField({ ...filterField, shipping_status_id: fieldFulfils })
  }

  React.useEffect(() => {
    setFilterField({ ...filterField, date_range: rangeDate })
  }, [rangeDate])

  // ---------------------- SEARCH ACTION --------------------------------------
  const handleSearch = () => {
    dispatch(setFilterFieldOrder(filterField))
  }

  return (
    <>
      <div className="filter">
        <div className="filter-show">
          <input
            type="text"
            className="input-field"
            placeholder="OrderID or email"
            name="search"
            value={filterField.search}
            onChange={(e) => handleChangeInput(e)}
          />
          {/* PAYMENT OPTIONS */}
          <Select
            placeholder="All payment"
            options={PAYMENT_STATUS_OPTIONS}
            onChange={(e) => handleChangePaymentSelect(e)}
            isMulti
          />
          {/* FULFILMENT OPTIONS */}
          <Select
            placeholder="All fulfilment"
            options={FULFILMENT_STATUS_OPTIONS}
            onChange={(e) => handleChangeFulfilmentSelect(e)}
            isMulti
          />
          {/* FILTER RANGE DATE */}
          <FilterRangeDate setRangeDate={setRangeDate} />
          <button type="button" className="btn-search" onClick={() => handleSearch()}>
            Search
          </button>
        </div>
      </div>
    </>
  )
}

export default OrderFilter
