import React from 'react'
import { useSelector } from 'react-redux'
import UserTableItem from './UserTableItem'
import './UserTableList.scss'
import { AppState } from './../../../../redux/reducer'
import { IUser } from './../../../../models/user'
import { SORT_OPTION_THEAD } from '../../utils'
import { IOption } from './../../../../models/option'
import UserTableThead from './UserTableThead'

const UserTableList = () => {
  const { userList } = useSelector((state: AppState) => ({
    userList: state.user.userList,
  }))

  const handleSort = (e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => {
    console.log('e: ', e)
  }

  return (
    <>
      <div className="table-container">
        <table className="table-list">
          <thead>
            <tr>
              {SORT_OPTION_THEAD &&
                SORT_OPTION_THEAD.length > 0 &&
                SORT_OPTION_THEAD.map((sort: IOption, index) => <UserTableThead key={index} sortOption={sort} />)}
            </tr>
          </thead>
          <tbody>
            {userList &&
              userList.length > 0 &&
              userList.map((user: IUser) => <UserTableItem user={user} key={user.profile_id} />)}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UserTableList
