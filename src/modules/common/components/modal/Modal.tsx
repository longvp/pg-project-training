import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import './Modal.scss'
import { setShowModal } from '../../../home/redux/homeReducer'

interface Props {}

const Modal = (props: Props) => {
  // const { title, text, handleAction } = props
  const { modalContent } = useSelector((state: AppState) => ({
    modalContent: state.home.modalContent,
  }))

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const executeAction = () => {
    modalContent.handleAction()
    dispatch(setShowModal(false))
  }

  const hideModal = () => {
    dispatch(setShowModal(false))
  }

  return (
    <div className="modal-container">
      <div className="overlay" onClick={() => hideModal()}></div>
      <div className="content-modal">
        <div className="general header-modal">{modalContent.title}</div>
        <div className="general body-modal">{modalContent.text}</div>
        <div className="general footer-modal">
          <button className="btn-confirm yes" onClick={() => executeAction()}>
            Yes
          </button>
          <button className="btn-confirm no" onClick={() => hideModal()}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(Modal)
