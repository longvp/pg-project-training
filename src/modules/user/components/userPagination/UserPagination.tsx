import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { setCurrentPage, setItemPerPage } from '../../redux/userReducer'
import { AppState } from './../../../../redux/reducer'
import './UserPagination.scss'
import { LIST_NUMBER_ITEM_PER_PAGE } from '../../utils'

const UserPagination = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { recordsTotal, itemPerPage } = useSelector((state: AppState) => ({
    recordsTotal: state.user.recordsTotal,

    itemPerPage: state.user.itemPerPage,
  }))

  const handleOnChangePage = (data: any) => {
    dispatch(setCurrentPage(data?.selected + 1))
  }

  const handleChangeItemPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setItemPerPage(+e.target.value))
  }

  return (
    <>
      <div className="page-pagination">
        <div className="pagination">
          {recordsTotal > 0 ? (
            <ReactPaginate
              previousLabel={'<<'}
              nextLabel={'>>'}
              pageCount={Math.ceil(+recordsTotal / +itemPerPage)}
              onPageChange={handleOnChangePage}
              containerClassName={'pagintation'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              initialPage={0}
              activeClassName={'active'}
            />
          ) : (
            <div></div>
          )}
        </div>
        <div className="text-show-item">
          <span className="number-highlight">{recordsTotal}</span>
          items
          <select className="number-select" onChange={(e) => handleChangeItemPerPage(e)}>
            {LIST_NUMBER_ITEM_PER_PAGE &&
              LIST_NUMBER_ITEM_PER_PAGE.length > 0 &&
              LIST_NUMBER_ITEM_PER_PAGE.map((number, index) => (
                <option value={number} key={index}>
                  {number}
                </option>
              ))}
          </select>
          per page
        </div>
      </div>
    </>
  )
}

export default UserPagination