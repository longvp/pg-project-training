import { ActionType, createCustomAction, getType } from 'typesafe-actions'
import { IModal } from '../../../models/modal'

export interface HomeState {
  isToggleSidebar: boolean
  isShowModal: boolean
  modalContent: IModal
}

const initialState = {
  isToggleSidebar: false,
  isShowModal: false,
  modalContent: {
    title: '',
    text: '',
    handleAction() {},
  },
}

export const setToggleSidebar = createCustomAction('home/setToggleSidebar')

export const setShowModal = createCustomAction('home/setShowModal', (data: boolean) => ({
  data,
}))

export const setModalContent = createCustomAction('home/setModalContent', (data: IModal) => ({
  data,
}))

const actions = { setToggleSidebar, setShowModal, setModalContent }

type Action = ActionType<typeof actions>

export default function reducer(state: HomeState = initialState, action: Action) {
  switch (action.type) {
    case getType(setToggleSidebar):
      return { ...state, isToggleSidebar: !state.isToggleSidebar }
    case getType(setShowModal):
      return { ...state, isShowModal: action.data }
    case getType(setModalContent):
      return { ...state, modalContent: action.data }
    default:
      return state
  }
}
