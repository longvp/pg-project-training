import React from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import './Modal.scss'
import { setShowModal } from '../../redux/homeReducer'

interface Props {
  title: string
  text: string
  handleAction(): void
}

const Modal = (props: Props) => {
  const { title, text, handleAction } = props
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const executeAction = () => {
    handleAction()
    dispatch(setShowModal(false))
  }

  const hideModal = () => {
    dispatch(setShowModal(false))
  }
  return (
    <div className="modal-container">
      <div className="overlay"></div>
      <div className="content-modal">
        <div className="general header-modal">{title}</div>
        <div className="general body-modal">{text}</div>
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

export default Modal
