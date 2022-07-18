import moment from 'moment'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { IOrder } from '../../../../models/order'
import { formatCurrency } from '../../../../utils'

interface Props {
  order: IOrder
}

const OrderTableItem = (props: Props) => {
  const { order } = props

  return (
    <>
      <tr>
        <td>
          <NavLink to={'/'} className="link">
            #{order.orderNumber}
          </NavLink>
        </td>
        <td>{+order.date > 0 ? moment(+order.date * 1000).format('LLL') : '---'}</td>
        <td>
          <NavLink to={`/user-detail/${order.profile_id}`} className="link">
            {order.customer}
          </NavLink>
          <br />
          {order.firstName + ' ' + order.lastName}
        </td>
        <td>{order.payment_status}</td>
        <td>{order.shipping_status}</td>
        <td>
          {`$${formatCurrency(+order.total)}`} <br />
          <span style={{ color: '#8f8f8f' }}>Quantity : {order.quality}</span>
        </td>
        <td>{`$${formatCurrency(+order.usedBalanceValue)}`}</td>
        <td>{`$${formatCurrency(+order.commission)}`}</td>
      </tr>
    </>
  )
}

export default OrderTableItem
