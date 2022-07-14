import { faPowerOff, faTrash } from '@fortawesome/free-solid-svg-icons'
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
import { setProductList, setProductListSelectedDelete, setRecordsTotal } from '../../redux/productReducer'
import { setModalContent, setShowModal } from '../../../home/redux/homeReducer'
import { fetchThunk } from '../../../common/redux/thunk'
import { API_PATHS } from '../../../../configs/api'
import { toast } from 'react-toastify'

interface Props {
  product: IProduct
}

const ProductTableItem = (props: Props) => {
  const { product } = props

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { productListSelectedDelete, currentPage, itemPerPage, filterFieldProduct, isShowModal } = useSelector(
    (state: AppState) => ({
      productListSelectedDelete: state.product.productListSelectedDelete,
      currentPage: state.product.currentPage,
      itemPerPage: state.product.itemPerPage,
      filterFieldProduct: state.product.filterFieldProduct,
      isShowModal: state.home.isShowModal,
    }),
  )

  // ------------ DELETE PRODUCT -----------------------
  // ---------------------------------------------------
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

  // ------------ CHANGE ENABLED -----------------------
  // ---------------------------------------------------
  const getProductList = React.useCallback(async () => {
    const json = await dispatch(
      fetchThunk(API_PATHS.productList, 'post', {
        count: itemPerPage,
        page: currentPage,
        search: filterFieldProduct.search,
        category: filterFieldProduct.category,
        stock_status: filterFieldProduct.stock_status,
        search_type: filterFieldProduct.search_type,
        availability: filterFieldProduct.availability,
        order_by: filterFieldProduct.order_by,
        sort: filterFieldProduct.sort,
        vendor: filterFieldProduct.vendor,
      }),
    )
    if (json?.success) {
      dispatch(setProductList(json.data))
      dispatch(setRecordsTotal(json.recordsTotal))
    }
  }, [currentPage, itemPerPage, filterFieldProduct])

  const handleChangeEnabled = React.useCallback(async () => {
    const json = await dispatch(
      fetchThunk(API_PATHS.productEdit, 'post', {
        params: [{ id: product.id, enable: +product.enabled == 1 ? 0 : 1 }],
      }),
    )
    if (json?.success) {
      getProductList()
      toast.success('Edit success !')
    } else {
      toast.error(json?.errors)
    }
  }, [])

  const showModal = () => {
    dispatch(
      setModalContent({
        title: 'Confirm Update',
        text: 'Do you want to update this product ?',
        handleAction: handleChangeEnabled,
      }),
    )
    dispatch(setShowModal(true))
  }

  return (
    <>
      <tr className={`${isSelectedDelete ? 'isSelectedDelete' : ''}`}>
        <td>
          <input type="checkbox" checked={isSelectedDelete} onChange={() => handleSelectedDelete()} />
        </td>
        <td>
          <FontAwesomeIcon
            className={`icon-power ${product.enabled == 1 ? 'enabled' : ''}`}
            icon={faPowerOff}
            onClick={() => showModal()}
          />
        </td>
        <td>{product.sku}</td>
        <td>
          <NavLink to={`/product-detail/${product.id}`} className="link">
            {product.name}
          </NavLink>
        </td>
        <td>{product.category}</td>
        <td>{`$${formatCurrency(+product.price)}`}</td>
        <td>{product.amount}</td>
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
