import React from 'react'
import { useSelector } from 'react-redux'
import { IOption } from '../../../../models/option'
import { IOrder } from '../../../../models/order'
import { AppState } from '../../../../redux/reducer'
import OrderTableThead from './OrderTableThead'
import OrderTableItem from './OrderTableItem'

const OrderTableList = () => {
  const SORT_OPTION_THEAD = [
    { label: 'Order #', value: 'orderNumber' },
    { label: 'Date', value: 'date' },
    { label: 'Customer', value: 'customer' },
    { label: 'Payment status ', value: 'payment_status_id' },
    { label: 'Fulfilment status', value: 'shipping_status_id' },
    { label: 'Amount', value: 'total' },
    { label: 'Paid with balance', value: 'usedBalanceValue' },
    { label: 'Commission', value: 'commission' },
  ]

  const { orderList } = useSelector((state: AppState) => ({
    orderList: state.order.orderList,
  }))

  return (
    <>
      <div className="table-container">
        <table className="table-list">
          <thead>
            <tr>
              {SORT_OPTION_THEAD &&
                SORT_OPTION_THEAD.length > 0 &&
                SORT_OPTION_THEAD.map((sort: IOption, index) => <OrderTableThead key={index} sortOption={sort} />)}
            </tr>
          </thead>
          <tbody>
            {orderList &&
              orderList.length > 0 &&
              orderList.map((order: IOrder, index) => <OrderTableItem order={order} key={order.order_id} />)}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default OrderTableList
