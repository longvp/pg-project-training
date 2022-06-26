import { faBars, faCircleArrowDown, faEnvelope, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { ROUTES } from '../../../../../configs/routes'
import './Header.scss'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY } from '../../../../../utils/constants'
import { replace } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../../redux/reducer'
import { Action } from 'redux'
import { removeUserInfo } from '../../../../auth/redux/authReducer'
import _ from 'lodash'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { setToggleSidebar } from '../../../redux/homeReducer'
import Modal from '../../modal/Modal'
import { setShowModal } from './../../../redux/homeReducer'

interface Props {}

function Header(props: Props) {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const history = useHistory()

  const { user, isShowModal } = useSelector((state: AppState) => ({
    user: state.profile.user,
    isShowModal: state.home.isShowModal,
  }))

  const handleToggleSidebar = () => {
    dispatch(setToggleSidebar())
  }

  const logOutShowModal = () => {
    dispatch(setShowModal(true))
  }

  const handleLogOut = () => {
    dispatch(removeUserInfo())
    Cookies.remove(ACCESS_TOKEN_KEY)
    dispatch(replace(ROUTES.login))
  }

  return (
    <>
      <div className="header-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="header-content">
                <div className="header-left">
                  {/* TOGGLE SIDEBAR */}
                  <FontAwesomeIcon className="icon icon-bars" icon={faBars} onClick={() => handleToggleSidebar()} />
                  <a href="#" className="logo-text">
                    Gear Focus Admin
                  </a>
                  <div className="notify">
                    <FontAwesomeIcon className="icon icon-bell" icon={faBell} />
                    <ul className="list notify-list">
                      <li className="notify-item">
                        <FontAwesomeIcon className="icon" icon={faCircleArrowDown} />
                        <span className="notify-link">Unapproved vendors</span>
                        <span className="notify-number">2</span>
                      </li>
                      <li className="notify-item">
                        <FontAwesomeIcon className="icon" icon={faTriangleExclamation} />
                        <span className="notify-link">Request for payment</span>
                        <span className="notify-number">0</span>
                      </li>
                      <li className="notify-item">
                        <FontAwesomeIcon className="icon" icon={faEnvelope} />
                        <span className="notify-link">Messages</span>
                        <span className="notify-number">5241</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="header-right">
                  <div className="user">
                    <FontAwesomeIcon className="icon" icon={faUser} />
                    <ul className="list action-list">
                      <li className="action-item">
                        <a href="#" className="action-link">
                          My profile
                        </a>
                        <span className="email-user">{user && user?.login}</span>
                      </li>
                      <li className="action-item" onClick={() => logOutShowModal()}>
                        <span className="action-link">Log out</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShowModal && <Modal title="Log out" text="Are you sure want to log out" handleAction={handleLogOut} />}
    </>
  )
}

export default Header
