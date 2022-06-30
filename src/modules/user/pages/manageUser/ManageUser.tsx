import React from 'react'
import { AppState } from '../../../../redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import UserFilter from '../../components/userFilter/UserFilter'
import UserPagination from '../../components/userPagination/UserPagination'
import UserTableList from '../../components/userTable/UserTableList'
import './ManageUser.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchThunk } from '../../../common/redux/thunk'
import { API_PATHS } from '../../../../configs/api'
import { setRecordsTotal, setRoleList, setUserList, setUserListSelectedDelete } from '../../redux/userReducer'
import Loading from '../../../home/components/loading/Loading'
import { setCountryList } from '../../redux/userReducer'
import { IRole } from '../../../../models/role'
import { setModalContent, setShowModal } from '../../../home/redux/homeReducer'
import Modal from '../../../home/components/modal/Modal'
import Footer from '../../../home/components/defaultLayout/footer/Footer'
import { NavLink } from 'react-router-dom'
import { ROUTES } from './../../../../configs/routes'

const MangeUser = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const { currentPage, itemPerPage, filterFieldUser, userListSelectedDelete, isShowModal } = useSelector(
    (state: AppState) => ({
      currentPage: state.user.currentPage,
      itemPerPage: state.user.itemPerPage,
      filterFieldUser: state.user.filterFieldUser,
      userListSelectedDelete: state.user.userListSelectedDelete,
      isShowModal: state.home.isShowModal,
    }),
  )
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // GET USER LIST
  const getUserList = React.useCallback(async () => {
    setIsLoading(true)
    const json = await dispatch(
      fetchThunk(API_PATHS.userList, 'post', {
        page: currentPage,
        count: itemPerPage,
        search: filterFieldUser.search,
        address: filterFieldUser.address,
        country: filterFieldUser.country,
        state: filterFieldUser.state,
        phone: filterFieldUser.phone,
        types: filterFieldUser.types,
        date_range: filterFieldUser.date_range,
        date_type: filterFieldUser.date_type,
        memberships: filterFieldUser.memberships,
        order_by: filterFieldUser.order_by,
        sort: filterFieldUser.sort,
        status: filterFieldUser.status,
        tz: filterFieldUser.tz,
      }),
    )
    if (json?.success) {
      dispatch(setUserList(json.data))
      dispatch(setRecordsTotal(json.recordsTotal))
    }
    setIsLoading(false)
  }, [currentPage, itemPerPage, filterFieldUser])

  // GET COUNTRY LIST
  const getCountryList = React.useCallback(async () => {
    setIsLoading(true)
    const json = await dispatch(fetchThunk(API_PATHS.countryList, 'get'))
    if (json?.success) {
      dispatch(setCountryList(json.data))
    }
    setIsLoading(false)
  }, [])

  // GET ROLE LIST
  const getRoleList = React.useCallback(async () => {
    setIsLoading(true)
    const json = await dispatch(fetchThunk(API_PATHS.roleList, 'get'))
    if (json?.success) {
      let roleList: IRole[] = []
      const roleAdminList = json.data.administrator
      const roleCustomerList = json.data.customer
      roleList = roleAdminList.concat(roleCustomerList)
      dispatch(setRoleList(roleList))
    }
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    getUserList()
  }, [currentPage, itemPerPage, filterFieldUser])

  React.useEffect(() => {
    getCountryList()
    getRoleList()
  }, [])

  // -------------------------------- DELETE USER -----------------------
  const deleteUser = React.useCallback(async () => {
    setIsLoading(true)
    const json = await dispatch(
      fetchThunk(API_PATHS.userDelete, 'post', {
        params: userListSelectedDelete,
      }),
    )
    if (json?.success) {
      getUserList()
      dispatch(setUserListSelectedDelete([]))
    }
    setIsLoading(false)
  }, [userListSelectedDelete])

  const handleDelete = () => {
    deleteUser()
  }

  const showModal = () => {
    dispatch(
      setModalContent({
        title: 'Confirm Delete',
        text: 'Do you want to delete this user ?',
        handleAction: handleDelete,
      }),
    )
    dispatch(setShowModal(true))
  }

  return (
    <>
      <div className="page-manage">
        <div className="title">Search for users</div>
        {/* FILTER */}
        <UserFilter />
        {/* ADD USER */}
        <NavLink to={ROUTES.createUser} className="btn-create">
          Create User
        </NavLink>
        {/* TABLE */}
        <UserTableList />
        <UserPagination />
        <Footer>
          <button
            className={`btn-footer ${userListSelectedDelete.length > 0 ? '' : 'btn-footer-disabled'}`}
            disabled={userListSelectedDelete.length === 0 ? true : false}
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

export default MangeUser
