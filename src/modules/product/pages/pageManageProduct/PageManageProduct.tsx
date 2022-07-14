import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { ROUTES } from '../../../../configs/routes'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import Footer from '../../../home/components/defaultLayout/footer/Footer'
import ProductFilter from '../../components/productFilter/ProductFilter'
import ProductTableList from '../../components/productTable/ProductTableList'
import { fetchThunk } from '../../../common/redux/thunk'
import { API_PATHS } from '../../../../configs/api'
import Loading from '../../../home/components/loading/Loading'
import {
  setCategoryList,
  setProductList,
  setProductListSelectedDelete,
  setRecordsTotal,
} from '../../redux/productReducer'
import ProductPagination from '../../components/productPagination/ProductPagination'
import { setModalContent, setShowModal } from '../../../home/redux/homeReducer'
import Modal from '../../../home/components/modal/Modal'
import { toast } from 'react-toastify'

const PageManageProduct = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { currentPage, itemPerPage, filterFieldProduct, productListSelectedDelete, isShowModal } = useSelector(
    (state: AppState) => ({
      currentPage: state.product.currentPage,
      itemPerPage: state.product.itemPerPage,
      filterFieldProduct: state.product.filterFieldProduct,
      productListSelectedDelete: state.product.productListSelectedDelete,
      isShowModal: state.home.isShowModal,
    }),
  )

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // GET PRODUCT LIST
  const getProductList = React.useCallback(async () => {
    setIsLoading(true)
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
    setIsLoading(false)
  }, [currentPage, itemPerPage, filterFieldProduct])

  // GET CATEGORY LIST
  const getCategoryList = React.useCallback(async () => {
    setIsLoading(true)
    const json = await dispatch(fetchThunk(API_PATHS.categoryList, 'get'))
    if (json?.success) {
      dispatch(setCategoryList(json.data))
    }
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    getProductList()
  }, [currentPage, itemPerPage, filterFieldProduct])

  React.useEffect(() => {
    getCategoryList()
  }, [])

  // -------------------------------- DELETE PRODUCT -----------------------
  const handleDeleteProduct = React.useCallback(async () => {
    setIsLoading(true)
    const json = await dispatch(
      fetchThunk(API_PATHS.productDelete, 'post', {
        params: productListSelectedDelete,
      }),
    )
    if (json?.success) {
      toast.success('Delete success !')
      getProductList()
      dispatch(setProductListSelectedDelete([]))
    } else {
      toast.error(json?.errors)
    }
    setIsLoading(false)
  }, [productListSelectedDelete])

  const showModal = () => {
    dispatch(
      setModalContent({
        title: 'Confirm Delete',
        text: 'Do you want to delete this product ?',
        handleAction: handleDeleteProduct,
      }),
    )
    dispatch(setShowModal(true))
  }

  return (
    <>
      <div className="page">
        <div className="title">Products</div>
        {/* FILTER */}
        <ProductFilter />
        <NavLink to={ROUTES.createProduct} className="btn-create">
          Create Product
        </NavLink>
        {/* TABLE */}
        <ProductTableList />
        <ProductPagination />
        <Footer>
          <button
            className={`btn-footer ${productListSelectedDelete.length > 0 ? '' : 'btn-footer-disabled'}`}
            disabled={productListSelectedDelete.length === 0 ? true : false}
            onClick={() => showModal()}
          >
            Remove selected
          </button>
        </Footer>
      </div>
      {isLoading && <Loading />}
      {isShowModal && <Modal />}
    </>
  )
}

export default PageManageProduct
