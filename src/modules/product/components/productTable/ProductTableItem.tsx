import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { IProduct } from '../../../../models/product'
import { AppState } from '../../../../redux/reducer'
import { formatCurrency } from '../../../../utils'
import { setProductListSelectedDelete } from '../../redux/productReducer'

interface Props {
  product: IProduct
}

const ProductTableItem = (props: Props) => {
  const { product } = props

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { productListSelectedDelete } = useSelector((state: AppState) => ({
    productListSelectedDelete: state.product.productListSelectedDelete,
  }))

  const [isSelectedDelete, setIsSelectedDelete] = React.useState<boolean>(false)

  const handleSelectedDelete = () => {
    setIsSelectedDelete(!isSelectedDelete)
  }

  React.useEffect(() => {
    if (isSelectedDelete) {
      dispatch(setProductListSelectedDelete([...productListSelectedDelete, { id: product.id, delete: 1 }]))
    } else {
      const productListDelete = productListSelectedDelete
      const newList = productListDelete.filter((p) => p.id !== product.id)
      dispatch(setProductListSelectedDelete(newList))
    }
  }, [isSelectedDelete])

  return (
    <>
      <tr className={`${isSelectedDelete ? 'isSelectedDelete' : ''}`}>
        <td>{product.sku}</td>
        <td>
          <NavLink to="/" href="#" className="link">
            {product.name}
          </NavLink>
        </td>
        <td>{product.category}</td>
        <td>
          <input className="input-td" value={formatCurrency(+product.price)} />
        </td>
        <td>
          <input className="input-td" value={product.amount} />
        </td>
        <td>{product.vendor}</td>
        <td>{+product.arrivalDate > 0 ? moment(+product.arrivalDate * 1000).format('ll') : '---'}</td>
        <td>
          <FontAwesomeIcon className="icon-delete" icon={faTrash} onClick={() => handleSelectedDelete()} />
        </td>
      </tr>
    </>
  )
}

export default ProductTableItem
