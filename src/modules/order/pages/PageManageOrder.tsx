import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../redux/reducer'
import { Action } from 'redux'
import Loading from '../../common/components/loading/Loading'
import OrderTableList from '../components/orderTable/OrderTableList'
import { fetchThunk } from '../../common/redux/thunk'
import { API_PATHS } from '../../../configs/api'
import {
  setCommissionTotal,
  setCurrentPage,
  setItemPerPage,
  setOrderList,
  setRecordsTotal,
  setSearchTotal,
} from '../redux/orderReducer'
import Pagination from '../../common/components/pagination/Pagination'
import { LIST_NUMBER_ITEM_PER_PAGE_ORDER } from '../utils'
import Footer from '../../defaultLayout/footer/Footer'
import OrderFilter from '../components/orderFilter/OrderFilter'

const PageManageOrder = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { recordsTotal, currentPage, itemPerPage, filterFieldOrder, commissionTotal, searchTotal } = useSelector(
    (state: AppState) => ({
      recordsTotal: state.order.recordsTotal,
      currentPage: state.order.currentPage,
      itemPerPage: state.order.itemPerPage,
      filterFieldOrder: state.order.filterFieldOrder,
      commissionTotal: state.order.commissionTotal,
      searchTotal: state.order.searchTotal,
    }),
  )

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const getOrderList = React.useCallback(async () => {
    setIsLoading(true)
    const json = await dispatch(
      fetchThunk(API_PATHS.orderList, 'post', {
        count: itemPerPage,
        page: currentPage,
        ...filterFieldOrder,
      }),
    )
    if (json?.success) {
      dispatch(setOrderList(json.data))
      dispatch(setRecordsTotal(json.recordsTotal))
      dispatch(setCommissionTotal(json.commissionTotal))
      dispatch(setSearchTotal(json.searchTotal))
    }
    setIsLoading(false)
  }, [currentPage, itemPerPage, filterFieldOrder])

  React.useEffect(() => {
    getOrderList()
  }, [currentPage, itemPerPage, filterFieldOrder])

  return (
    <>
      <div className="page">
        <div className="title">Orders</div>
        {/* FILTER */}
        <OrderFilter />
        {/* TABLE */}
        <OrderTableList />
        {/* PAGINATION */}
        <Pagination
          LIST_NUMBER_ITEM_PER_PAGE={LIST_NUMBER_ITEM_PER_PAGE_ORDER}
          setCurrentPage={setCurrentPage}
          setItemPerPage={setItemPerPage}
          recordsTotal={recordsTotal}
          itemPerPage={itemPerPage}
        />
        <Footer>
          <div></div>
        </Footer>
      </div>
      {isLoading && <Loading />}
    </>
  )
}

export default PageManageOrder
